import Loader from "@/Custom/CustomLoader";
import BlogCard from "@/components/Blogs/BlogCard";
import BlogTable from "@/components/Blogs/BlogTable";
import Sidebar from "@/components/constants/sidebar";
import { fetchTopPosts } from "@/redux/blogsSlice";
import { AppDispatch } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { MdOutlineMenu } from "react-icons/md";
import { FaList } from "react-icons/fa";

const TopBlogs = () => {
  const { TopPosts, isLoading } = useSelector((state: any) => state.Blogs);
  const [toggle, setToggle] = useState(false); // Corrected the state variable name

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchTopPosts());
  }, [dispatch]); // Added dispatch as a dependency to useEffect

  return (
    <div className="flex w-[100%] gap-2">
      <div className="my-sidebar lg-z-0 fixed z-10 lg:sticky">
        <Sidebar />
      </div>
      <div className=" flex w-[100%] flex-col px-[10px]">
        {isLoading && <Loader />}
        <div className="mt-10 flex justify-between px-[20px] text-center text-teal-400">
          <h2>Top Blogs</h2>
          {toggle ? (
            <MdOutlineMenu size={32} onClick={() => setToggle(!toggle)} />
          ) : (
            <FaList size={32} onClick={() => setToggle(!toggle)} />
          )}
        </div>

        {toggle ? (
          <div>
            <BlogTable blogs={TopPosts} />
          </div>
        ) : (
          <div>
            <div
              className="flex flex-wrap justify-center gap-3 lg:justify-normal"
              style={{ width: "98%" }}
            >
              {TopPosts?.map((blog: any) => (
                <BlogCard key={blog?.id} blog={blog} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBlogs;
