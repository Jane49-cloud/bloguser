import Sidebar from "@/components/constants/sidebar";
import UserPosts from "@/components/Blogs/UserPosts";

const UserPostsPage = () => {
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
