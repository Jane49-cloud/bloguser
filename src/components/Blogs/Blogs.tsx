import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "./BlogCard";
import Loader from "../constants/Loader";
import { postProps } from "@/Interfaces/post";

const Blogs: React.FC<postProps> = () => {
  const [blogs, setBlogs] = useState<postProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/posts/");
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
    <main className="m-0 mx-auto">
      <div>
        {/* header */}
        <div>
          <section>
            <h3 className="font-weight-bold container mb-2 text-left">
              Explore all the posts
            </h3>
            <div
              className="d-flex justify-content-around flex-wrap"
              style={{ width: "98%" }}
            >
              {blogs?.map((blog: postProps) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
            <div className="mb-5 mt-4 text-center">
              <a className="black-text font-weight-bold" href="#!">
                Browse all articles
              </a>
            </div>
          </section>
        </div>
        {/* end pending posts */}
      </div>
    </main>
  );
};

export default Blogs;
