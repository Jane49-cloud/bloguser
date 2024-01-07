import { useDispatch, useSelector } from "react-redux";
import reader from "../assets/read.jpg";
import { MdLibraryBooks } from "react-icons/md";
import { SiBookstack } from "react-icons/si";
import { IoBookSharp } from "react-icons/io5";
import { BsFillBookmarksFill } from "react-icons/bs";
import {
  fetchPosts,
  fetchTopPosts,
  fetchPopularPosts,
  fetchHousePosts,
} from "@/redux/blogsSlice";
import { AppDispatch } from "@/redux/store";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const user = useSelector((state: any) => state.auth.user);
  const [totalPosts, setTotalPosts] = useState(0);

  const { Posts, TopPosts, PopularPosts, HousePosts } = useSelector(
    (state: any) => state.Blogs
  );

  useEffect(() => {
    const total =
      Posts?.length +
      TopPosts?.length +
      PopularPosts?.length +
      HousePosts?.length;
    setTotalPosts(total);
  }, [Posts, TopPosts, PopularPosts, HousePosts]); // Update dependencies to include individual post arrays

  // percentages
  const totalPercentage = totalPosts > 0 ? (totalPosts / totalPosts) * 100 : 0;
  const Popular =
    totalPosts > 0 ? (PopularPosts?.length / totalPosts) * 100 : 0;
  const top = totalPosts > 0 ? (TopPosts?.length / totalPosts) * 100 : 0;
  const House = totalPosts > 0 ? (HousePosts?.length / totalPosts) * 100 : 0;
  const Others = totalPosts > 0 ? (Posts?.length / totalPosts) * 100 : 0;

  console.log(totalPercentage, Popular, top, House, Others);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTopPosts());
    dispatch(fetchPopularPosts());
    dispatch(fetchHousePosts());
  }, []);

  return (
    <div className="mt-10 h-[auto]  w-full bg-teal-50 px-2 py-5">
      <div className="flex flex-col">
        {/* upper */}
        <div className="flex flex-wrap gap-3">
          {/* left */}
          <div className="relative flex h-[170px] w-full flex-col  justify-between gap-5 rounded-[8px] bg-[white] px-[10px] py-1 pr-7 shadow-md lg:w-[40%] lg:px-5">
            <div className="mt-4 flex flex-col">
              <h1 className="text-[20px] capitalize">{`${user?.firstName} ${user?.lastName}`}</h1>
              <span className="text-sm text-gray-600">Writer/Author</span>
            </div>
            <div>
              <div className="z-20 flex gap-3 ">
                <div className="flex items-center justify-center gap-2">
                  <h1 className="text-[20px] capitalize">40</h1>
                  <span className="text-sm capitalize text-gray-600">
                    Total post
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <h1 className="text-[20px] capitalize">40</h1>
                  <span className="text-sm capitalize text-gray-600">
                    comments
                  </span>
                </div>
              </div>
            </div>

            <div className="absolute right-[1px]  top-1 items-center lg:flex ">
              <img
                src={reader}
                alt=""
                className="h-[160px] w-[160px] object-cover"
              />
            </div>
          </div>

          {/* right
           */}

          <div className="flex flex-grow flex-wrap items-center justify-center gap-2 p-2 lg:justify-normal">
            <div className="flex h-[130px] w-full items-center  justify-between rounded-[8px] bg-white px-5 py-3 shadow-md lg:h-[160px] lg:w-[auto] lg:flex-col">
              <div>
                <MdLibraryBooks size={32} className="text-teal-600" />
              </div>
              <div className="flex flex-col ">
                <span className="text-sm text-gray-600">Top Pos.. </span>
                <h1 className="text-[20px] capitalize text-teal-600">
                  {TopPosts?.length}
                </h1>
              </div>
            </div>
            <div className="flex h-[130px] w-full items-center  justify-between rounded-[8px] bg-white px-5 py-3 shadow-md lg:h-[160px] lg:w-[auto] lg:flex-col">
              <div>
                <SiBookstack size={32} className="text-teal-700" />
              </div>
              <div className="flex flex-col ">
                <span className="text-sm text-gray-600">Popular</span>
                <h1 className="text-[20px] capitalize text-teal-700">
                  {PopularPosts?.length}
                </h1>
              </div>
            </div>
            <div className="flex h-[130px] w-full items-center  justify-between rounded-[8px] bg-white px-5 py-3 shadow-md lg:h-[160px] lg:w-[auto] lg:flex-col">
              <div>
                <IoBookSharp size={32} className="text-teal-800" />
              </div>
              <div className="flex flex-col ">
                <span className="text-sm text-gray-600">House</span>
                <h1 className="text-[20px] capitalize text-teal-800">
                  {HousePosts?.length}
                </h1>
              </div>
            </div>
            <div className="flex h-[130px] w-full items-center  justify-between rounded-[8px] bg-white px-5 py-3 shadow-md lg:h-[160px] lg:w-[auto] lg:flex-col">
              <div>
                <BsFillBookmarksFill size={32} className="text-teal-900" />
              </div>
              <div className="flex flex-col ">
                <span className="text-sm text-gray-600">Others</span>
                <h1 className="text-[20px] capitalize text-teal-900">
                  {Posts?.length}
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/*lower  */}
        <div className="flex flex-row flex-wrap gap-3 py-3 lg:flex-nowrap">
          {/* left */}

          <div className="radius-[8px] h-[400px]  w-full bg-white shadow-md lg:w-[45%] ">
            <h1 className="mt-2 text-center text-[20px]">Blogs Statistics</h1>

            <div className="mx-auto mt-5 flex max-w-xl flex-col gap-6 px-20 pb-5">
              <div>
                <span className="text-black">Total</span>
                <div className="relative">
                  <div className="h-[10px] w-full rounded-sm   bg-gray-200">
                    <div
                      className="h-full rounded-sm bg-teal-800"
                      style={{ width: `${totalPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-black">Top</span>
                <div className="relative">
                  <div className="h-[10px] w-full rounded-sm   bg-gray-200">
                    <div
                      className="h-full rounded-sm bg-green-500"
                      style={{ width: `${top}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-black">Popular</span>
                <div className="relative">
                  <div className="h-[10px] w-full rounded-sm   bg-gray-200">
                    <div
                      className="h-full  rounded-sm bg-orange-400"
                      style={{ width: `${Popular}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-black">House</span>
                <div className="relative">
                  <div className="h-[10px] w-full rounded-sm   bg-gray-200">
                    <div
                      className="h-full  rounded-sm bg-red-600"
                      style={{ width: `${House}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-black">Others</span>
                <div className="relative">
                  <div className="h-[10px] w-full rounded-sm   bg-gray-200">
                    <div
                      className=" h-full rounded-sm bg-green-800"
                      style={{ width: `${Others}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* right */}
          <div className="radius-[8px]  no-scrollbar  h-[400px] w-full overflow-y-auto  bg-white shadow-md lg:w-1/2">
            <div className="flex justify-around">
              <h1 className="mt-2 text-center text-[20px]">Recent Blogs</h1>
              <button className="border-1 mt-2 border-teal-300 px-2 text-center text-[20px] text-teal-700">
                New Blog
              </button>
            </div>

            <div className="mx-auto mt-3 flex max-w-xl flex-col  gap-2 px-[20px]  lg:px-20">
              <div>
                <div className="relative">
                  {Posts.map((post: any) => (
                    <div
                      key={post?.id}
                      className="mb-1 flex h-[6.5rem] overflow-hidden border shadow-lg"
                    >
                      <img
                        src={post?.image}
                        alt={`Post ${post?._id}`}
                        className="h-full w-1/3 object-cover object-center"
                      />
                      <div className="p-4">
                        <h2 className=" mb-2 line-clamp-2 text-[15px] font-bold">
                          {post?.description}
                        </h2>
                        <div className="flex items-center gap-2 text-gray-600">
                          <p>{new Date(post?.createdAt).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mx-auto mt-3 flex max-w-xl flex-col  gap-2 px-[20px]  lg:px-20">
              <div>
                <div className="relative">
                  {PopularPosts.map((post: any) => (
                    <div
                      key={post?.id}
                      className="mb-1 flex h-[6.5rem] overflow-hidden border shadow-lg"
                    >
                      <img
                        src={post?.image}
                        alt={`Post ${post?._id}`}
                        className="h-full w-1/3 object-cover object-center"
                      />
                      <div className="p-4">
                        <h2 className="mb-2 line-clamp-2 text-[15px] font-bold ">
                          {post?.description}
                        </h2>
                        <div className="flex items-center gap-2 text-gray-600">
                          <p>{new Date(post?.createdAt).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mx-auto mt-3 flex max-w-xl flex-col  gap-2 px-[20px]  lg:px-20">
              <div>
                <div className="relative ">
                  {TopPosts?.map((post: any) => (
                    <div
                      key={post?.id}
                      className="mb-1 flex h-[6.5rem] overflow-hidden border shadow-lg"
                    >
                      <img
                        src={post?.image}
                        alt={`Post ${post?._id}`}
                        className="h-full w-1/3 object-cover object-center"
                      />
                      <div className="p-4">
                        <h2 className="mb-2 line-clamp-2 text-[15px] font-bold ">
                          {post?.description}
                        </h2>
                        <div className="flex items-center gap-2 text-gray-600">
                          <p>{new Date(post?.createdAt).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mx-auto flex max-w-xl flex-col gap-2 px-20 ">
              <div>
                <div className="relative">
                  {HousePosts?.map((post: any) => (
                    <div
                      key={post?.id}
                      className="mb-1 flex h-[6.5rem] overflow-hidden border shadow-lg"
                    >
                      <img
                        src={post?.image}
                        alt={`Post ${post?._id}`}
                        className="h-full w-1/3 object-cover object-center"
                      />
                      <div className="p-4">
                        <h2 className="mb-2 line-clamp-2 text-[15px] font-bold ">
                          {post?.description}
                        </h2>
                        <div className="flex items-center gap-2 text-gray-600">
                          <p>{new Date(post?.createdAt).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
