import React from "react";
import Sidebar from "@/components/constants/sidebar";
import UserPosts from "@/components/Blogs/UserPosts";

interface Props {}

const UserPostsPage = (props: Props) => {
  return (
    <div className="row ">
      <div className="col-md-2  ">
        <Sidebar />
      </div>
      <div className="col">
        <UserPosts />
      </div>
    </div>
  );
};

export default UserPostsPage;
