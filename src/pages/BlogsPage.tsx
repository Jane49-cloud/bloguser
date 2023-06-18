import Sidebar from "@/components/constants/sidebar";
import Blogs from "@/components/Blogs/Blogs";

const BlogsPage = () => {
  return (
    <div className="row ">
      <div className="col-md-2  ">
        <Sidebar />
      </div>
      <div className="col">
        <Blogs
          id={0}
          title={""}
          content={""}
          author={""}
          firstName={""}
          lastName={""}
          picturePath={""}
          description={""}
          comments={[]}
        />
      </div>
    </div>
  );
};

export default BlogsPage;
