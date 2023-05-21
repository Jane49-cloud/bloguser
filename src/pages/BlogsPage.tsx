import React from "react";
import Sidebar from "@/components/constants/sidebar";
import Blogs from "@/components/Blogs/Blogs";

interface Props {}

const BlogsPage = (props: Props) => {
  return (
    <div className="row ">
      <div className="col-md-2  ">
        <Sidebar />
      </div>
      <div className="col">
        <Blogs />
      </div>
    </div>
  );
};

export default BlogsPage;
