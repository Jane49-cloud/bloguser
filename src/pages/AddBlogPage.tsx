import Sidebar from "@/components/constants/sidebar";
import AddBlog from "@/components/Blogs/createBlog";

const AddBlogPage = () => {
  return (
    <div className=" flex gap-2 ">
      <div className=" fixed  lg:relative my-sidebar z-10 lg-z-0">
        <Sidebar />
      </div>
      <div className="flex  my-body ">
        <AddBlog      />
      </div>
    </div>
  );
};

export default AddBlogPage;
