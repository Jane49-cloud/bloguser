import Sidebar from "@/components/constants/sidebar";
import UserSettings from "@/components/UserSettings";

const UserSettingsPage = () => {
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
