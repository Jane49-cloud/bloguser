import HeroPage from "@/components/constants/Hero";
import Blogs from "@/components/Blogs/Blogs";

const HomePage = () => {
  return (
    <div>
      <HeroPage />
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
      />
    </div>
  );
};

export default HomePage;
