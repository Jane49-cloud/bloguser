import React from "react";
import Sidebar from "@/components/constants/sidebar";
import UserSettings from "@/components/UserSettings";

interface Props {}

const UserSettingsPage = (props: Props) => {
  return (
    <div className="row ">
      <div className="col-md-2  ">
        <Sidebar />
      </div>
      <div className="col">
        <UserSettings />
      </div>
    </div>
  );
};

export default UserSettingsPage;
