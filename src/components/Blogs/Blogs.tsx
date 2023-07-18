import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { toast } from "react-toastify";
import { postProps } from "@/Interfaces/post";
import { useDispatch } from "react-redux";
import { setLoader } from "@/redux/LoaderSlice";

import { getPosts } from "@/hooks/post.actions";

const Blogs: React.FC<postProps> = () => {
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState([]);

  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response: any = await getPosts();
      dispatch(setLoader(false));
      if (response.success) {
        toast.success("Posts fetched successfully");

        setBlogs(response.data);
        console.log(response.data);
      } else {
        toast.error("Error fetching posts");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
