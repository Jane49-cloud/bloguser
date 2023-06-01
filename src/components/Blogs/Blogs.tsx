import React from "react";

import { blogs } from "@/Data";
import BlogCard from "./BlogCard";

interface Props {
  blog: Blog;
}

interface Blog {
  id: number;
  title: string;
  content: string;
  author: string;

  // Add any other properties here
}

const Blogs: React.FC<Props> = () => {
  return (
    <main>
      <div>
        {/* header */}
        <div className=" d-flex justify-content-between m-2"></div>
        {/* end header */}
        {/* start pending posts */}

        <div className="container">
          <section className="">
            <h3 className="font-weight-bold mb-2 text-left">
              {" "}
              Explore all the posts
            </h3>

            <div className="row d-flex justify-between gap-3">
              {blogs.map((blog: Blog) => (
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
