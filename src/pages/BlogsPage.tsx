import Sidebar from "@/components/constants/sidebar";
import Blogs from "@/components/Blogs/Blogs";

const BlogsPage = () => {
  return (
    <div className=" flex gap-2 ">
      <div className=" my-sidebar  lg-z-0 fixed z-10 lg:sticky">
        <Sidebar />
      </div>
      <div className="my-body flex">
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
          createdAt={""}
          image={undefined}
          writer={undefined}
        />
      </div>
    </div>
  );
};

export default BlogsPage;
