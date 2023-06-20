import React, { useEffect } from "react";
import BlogCard from "./BlogCard";
import { postProps } from "@/Interfaces/post";
import { useDispatch, useSelector } from "react-redux";
import CustomLoader from "../../Custom/CustomLoader";
import { getPostsFetch } from "@/redux/postState";

const Blogs: React.FC<postProps> = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state: any) => state.posts.posts);
  const isLoading = useSelector((state: any) => state.posts.isLoading);

  useEffect(() => {
    dispatch(getPostsFetch());
  }, [dispatch]);

  console.log(blogs);

  if (isLoading) {
    return <CustomLoader />;
  }

  return (
    <main className="m-0 mx-auto">
      <div>
        {/* header */}
        <div>
          <section>
            <h3 className="font-weight-bold container mb-2 text-left">
              Explore all the posts
            </h3>
            <div
              className="d-flex justify-content-around flex-wrap"
              style={{ width: "98%" }}
            >
              {blogs?.map((blog: postProps) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
            <div className="mb-5 mt-4 text-center">
              <a className="black-text font-weight-bold" href="#!">
                Browse all articles
              </a>
            </div>
          </section>
        </div>
        {/* end pending posts */}
      </div>
    </main>
  );
};

export default Blogs;
