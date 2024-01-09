import React, { useEffect } from "react";
import BlogCard from "./BlogCard";
// import { toast } from 'react-toastify';
import { postProps } from "@/Interfaces/post";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/Custom/CustomLoader";
import {
  fetchPosts,
  fetchTopPosts,
  fetchPopularPosts,
  fetchHousePosts,
} from "@/redux/blogsSlice";
import { AppDispatch } from "@/redux/store";

const Blogs: React.FC<postProps> = () => {
  const { Posts, TopPosts, PopularPosts, HousePosts, isLoading } = useSelector(
    (state: any) => state.Blogs
  );

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTopPosts());
    dispatch(fetchPopularPosts());
    dispatch(fetchHousePosts());
  }, []);

  return (
    <div className="w-full">
      <div>
        {/* header */}
        <div>
          <section className="">
            {isLoading && <Loader />}

            <h3 className="font-weight-bold text-center">
              Explore all the posts
            </h3>
            {/* Posts */}
            <div>
              <div className="my-2 flex items-center justify-between px-[10px] lg:px-[50px] ">
                <h2 className="text-[20px] font-bold">Top Posts </h2>
                <a className="black-text font-weight-bold" href="#!">
                  Browse all Blogs
                </a>
              </div>
              <div className="flex flex-wrap gap-3" style={{ width: "98%" }}>
                {TopPosts?.slice(0, 3).map((blog: postProps) => (
                  <BlogCard key={blog?.id} blog={blog} />
                ))}
              </div>
            </div>
            {/* Top */}
            <div>
              <div className="my-2 flex items-center justify-between px-[10px] lg:px-[50px]">
                <h2 className="text-[20px] font-bold">Popular Posts </h2>
                <a className="black-text font-weight-bold" href="#!">
                  Browse all Blogs
                </a>
              </div>
              <div className="flex flex-wrap  gap-3" style={{ width: "98%" }}>
                {PopularPosts?.slice(0, 3).map((blog: postProps) => (
                  <BlogCard key={blog?.id} blog={blog} />
                ))}
              </div>
            </div>
            {/* Posts */}
            <div>
              <div className="my-2 flex items-center justify-between px-[10px] lg:px-[50px]">
                <h2 className="text-[20px] font-bold">House Posts </h2>
                <a className="black-text font-weight-bold" href="#!">
                  Browse all Blogs
                </a>
              </div>
              <div className="flex flex-wrap  gap-3" style={{ width: "98%" }}>
                {HousePosts?.slice(0, 3).map((blog: postProps) => (
                  <BlogCard key={blog?.id} blog={blog} />
                ))}
              </div>
            </div>
            {/* Posts */}
            <div>
              <div className="my-2 flex items-center justify-between px-[10px] lg:px-[50px]">
                <h2 className="text-[20px] font-bold">Other Posts </h2>
                <a className="black-text font-weight-bold" href="#!">
                  Browse all Blogs
                </a>
              </div>
              <div className="flex flex-wrap  gap-3" style={{ width: "98%" }}>
                {Posts?.slice(0, 3).map((blog: postProps) => (
                  <BlogCard key={blog?.id} blog={blog} />
                ))}
              </div>
            </div>
          </section>
        </div>
        {/* end pending posts */}
      </div>
    </div>
  );
};

export default Blogs;
