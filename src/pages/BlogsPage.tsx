import Sidebar from "@/components/constants/sidebar";
import Blogs from "@/components/Blogs/Blogs";

const BlogsPage = () => {

  
  return (
    <div className=" flex gap-2 ">
      <div className=" fixed  lg:relative my-sidebar z-10 lg-z-0">
        <Sidebar />
      </div>
      <div className="flex my-body">
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
          likes={[]}
          userId={""}
          userPicturePath={""}
          createdAt={""} image={undefined} writer={undefined}        />
      </div>
    </div>
  );
};

export default BlogsPage;
