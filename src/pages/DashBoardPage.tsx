import React from "react";
import Sidebar from "@/components/constants/sidebar";
import Dashboard from "@/components/Dashboard";

const DashBoardPage: React.FC = () => {
  const post = {
    id: 1,
    title: "Sample Post",
    content: "This is a sample post.",
    author: "",
    date: "",
  };

  return (
    <div className="row">
      <div className="col-md-2">
        <Sidebar />
      </div>
      <div className="col">
        <Dashboard post={post} />
      </div>
    </div>
  );
};

export default DashBoardPage;
