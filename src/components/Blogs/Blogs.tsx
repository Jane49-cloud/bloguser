import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
// import { toast } from 'react-toastify';
import { postProps } from "@/Interfaces/post";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "@/redux/LoaderSlice";

import { getPosts } from "@/hooks/post.actions";
import Loader from "@/Custom/CustomLoader";

const Blogs: React.FC<postProps> = () => {
  const { Posts, TopPosts, PopularPosts, HousePosts, isLoading } = useSelector(
    (state: any) => state.Blogs
  );

  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState([]);

  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response: any = await getPosts();
      dispatch(setLoader(false));
      if (response.success) {
        // toast.success('Posts fetched successfully');

        setBlogs(response.posts);
        console.log(response.posts);
      } else {
        // toast.error('Error fetching posts');
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <main className="">
      <div>
        {/* header */}
        <div>
          <section className="">
            <h3 className="font-weight-bold container mb-2 text-left">
              Explore all the posts
            </h3>
            <div
              className="d-flex flex-wrap gap-3"
              style={{ width: "98%", padding: "30px" }}
            >
              {isLoading && <Loader />}
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
