import React from "react";
import Sidebar from "@/components/constants/sidebar";
import Dashboard from "@/components/Dashboard";

interface Props {}

const DashBoardPage = (props: Props) => {
  return (
    <div className="row ">
      <div className="col-md-2  ">
        <Sidebar />
      </div>
      <div className="col">
        <Dashboard />
      </div>
    </div>
  );
};

export default DashBoardPage;
