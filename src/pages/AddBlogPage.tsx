import React from "react";
import Sidebar from "@/components/constants/sidebar";
import AddBlog from "@/components/Blogs/createBlog";

interface Props {}

const AddBlogPage = (props: Props) => {
  return (
    <div className="row ">
      <div className="col-md-2  ">
        <Sidebar />
      </div>
      <div className="col">
        <AddBlog />
      </div>
    </div>
  );
};

export default AddBlogPage;
