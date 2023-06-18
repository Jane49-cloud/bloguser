import Sidebar from "@/components/constants/sidebar";
import AddBlog from "@/components/Blogs/createBlog";

const AddBlogPage = () => {
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
