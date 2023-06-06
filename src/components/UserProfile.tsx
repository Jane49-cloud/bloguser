import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/Blogs/BlogCard";
import Loader from "../components/constants/Loader";
import { getUser } from "@/hooks/user.actions";

interface Props {
  blog: Blog;
}

interface Blog {
  id: number;
  userId: string;
  title: string;
  content: string;
  author: string;
  firstName: string;
  lastName: string;
  picturePath: string;
  description: string;
  comments: [];

  // Add any other properties here
}

const userProfile: React.FC<Props> = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loggedUser, setLoggedUser] = useState<any>(getUser());
  const id = loggedUser.id;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/posts/${id}/posts`
        );
        const data = response.data;
        setBlogs(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  console.log(blogs);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className=" m-0  mx-auto">
      <div>
        {/* header */}

        <div className="">
          <section>
            <h3 className="font-weight-bold container mb-2 text-left">
              Explore all the posts
            </h3>

            <div
              className="d-flex justify-content-around flex-wrap "
              style={{ width: "98%" }}
            >
              {blogs?.map((blog: Blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          </section>
        </div>

        {/* end pending posts */}
      </div>
    </main>
  );
};

export default userProfile;
