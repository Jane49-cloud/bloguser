import { useDispatch, useSelector } from "react-redux";
import reader from "../assets/read.jpg"
import { MdLibraryBooks } from "react-icons/md";
import { SiBookstack } from "react-icons/si";
import { IoBookSharp } from "react-icons/io5";
import { BsFillBookmarksFill } from "react-icons/bs";
import { fetchPosts, fetchTopPosts, fetchPopularPosts, fetchHousePosts } from "@/redux/blogsSlice";
import { AppDispatch } from "@/redux/store";
import { useEffect, useState } from "react";


const Dashboard = () => {

    const user = useSelector((state: any) => state.auth.user);
    const [totalPosts, settotalPosts] = useState(0)

    const { Posts, TopPosts, PopularPosts, HousePosts } = useSelector((state: any) => state.Blogs);
    useEffect(()=>{
      const total = Posts?.length + TopPosts?.length + PopularPosts?.length + HousePosts?.length 
      settotalPosts(total)
    },[totalPosts])

    // percentages
    const totalPercentage = (totalPosts / totalPosts) * 100;
    const Popular = (PopularPosts?.length / totalPosts) * 100;
    const top = (TopPosts?.length / totalPosts) * 100;
    const House = (HousePosts?.length / totalPosts) * 100;
    const Others = (Posts?.length / totalPosts) * 100;
    console.log(totalPercentage, Popular, top, House, Others)

    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(fetchPosts());
        dispatch(fetchTopPosts());
        dispatch(fetchPopularPosts());
        dispatch(fetchHousePosts());
    }, []);
    
    

  return (
    <div className="mt-10 bg-teal-50  h-[auto] w-full py-5 px-2">
    <div className="flex flex-col">
{/* upper */}
<div className="flex gap-3 flex-wrap">
{/* left */}
<div className="flex flex-col h-[170px] w-full lg:w-[40%]  gap-5 justify-between px-[10px] lg:px-5 py-1 bg-[white] shadow-md rounded-[8px] pr-7 relative">
    <div className="flex flex-col mt-4">
    <h1 className="capitalize text-[20px]">{`${user?.firstName} ${user?.lastName}`}</h1>
    <span className="text-sm text-gray-600">Writer/Author</span>
    </div>
    <div>
     <div className="flex gap-3 z-20 ">
     <div className="flex items-center justify-center gap-2">
        <h1 className="text-[20px] capitalize">40</h1>
        <span className="text-sm text-gray-600 capitalize">Total post</span>
     
      </div>
      <div className="flex items-center gap-2">
        <h1 className="text-[20px] capitalize">40</h1>
        <span className="text-sm text-gray-600 capitalize">comments</span>
      </div>
     </div>
    </div>

    <div className="absolute right-[1px]  top-1 lg:flex items-center ">
<img src={reader} alt="" className="h-[160px] w-[160px] object-cover" />
    </div>
</div>


{/* right
 */}


<div className="flex gap-2 flex-grow p-2 flex-wrap items-center justify-center lg:justify-normal">
<div className="flex h-[130px] lg:h-[160px] bg-white  lg:flex-col items-center justify-between py-3 px-5 rounded-[8px] shadow-md w-full lg:w-[auto]" >
  <div>
    <MdLibraryBooks size={32} className="text-teal-600"/>
  </div>
  <div className="flex flex-col ">
  <span className="text-sm text-gray-600">Top Pos.. </span>
  <h1 className="text-[20px] capitalize text-teal-600">40</h1>
  </div>
</div>
<div className="flex h-[130px] lg:h-[160px] bg-white  lg:flex-col items-center justify-between py-3 px-5 rounded-[8px] shadow-md w-full lg:w-[auto]" >
  <div>
    <SiBookstack size={32} className="text-teal-700"/>
  </div>
  <div className="flex flex-col ">
  <span className="text-sm text-gray-600">Popular</span>
  <h1 className="text-[20px] capitalize text-teal-700">40</h1>
  </div>
</div>
<div className="flex h-[130px] lg:h-[160px] bg-white  lg:flex-col items-center justify-between py-3 px-5 rounded-[8px] shadow-md w-full lg:w-[auto]" >
  <div>
    <IoBookSharp size={32} className="text-teal-800"/>
  </div>
  <div className="flex flex-col ">
  <span className="text-sm text-gray-600">House</span>
  <h1 className="text-[20px] capitalize text-teal-800">40</h1>
  </div>
</div>
<div className="flex h-[130px] lg:h-[160px] bg-white  lg:flex-col items-center justify-between py-3 px-5 rounded-[8px] shadow-md w-full lg:w-[auto]" >
  <div>
    < BsFillBookmarksFill size={32} className="text-teal-900"/>
  </div>
  <div className="flex flex-col ">
  <span className="text-sm text-gray-600">Others</span>
  <h1 className="text-[20px] capitalize text-teal-900">40</h1>
  </div>
</div>
 </div>
</div>

{/*lower  */}
<div className="flex flex-row flex-wrap gap-3 py-3 lg:flex-nowrap">
{/* left */}

<div className="w-full lg:w-[45%]  h-300 bg-white radius-[8px] shadow-md ">
                    <h1 className="text-center mt-2 text-[20px]">Blogs Statistics</h1>

                    <div className="flex flex-col mx-auto gap-6 max-w-xl px-20 pb-5 mt-5">
                        <div>
                            <span className="text-black">Total</span>
                            <div className="relative">
                                <div className="w-full bg-gray-200 rounded-sm   h-[10px]">
                                    <div
                                        className="bg-teal-800 h-full rounded-sm"
                                        style={{ width: `${totalPercentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <span className="text-black">Top</span>
                            <div className="relative">
                                <div className="w-full bg-gray-200 rounded-sm   h-[10px]">
                                    <div
                                        className="bg-green-500 h-full rounded-sm"
                                        style={{ width: `${top}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <span className="text-black">Popular</span>
                            <div className="relative">
                                <div className="w-full bg-gray-200 rounded-sm   h-[10px]">
                                    <div
                                        className="bg-orange-400  h-full rounded-sm"
                                        style={{ width: `${Popular}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <span className="text-black">House</span>
                            <div className="relative">
                                <div className="w-full bg-gray-200 rounded-sm   h-[10px]">
                                    <div
                                        className="bg-red-600  h-full rounded-sm"
                                        style={{ width: `${House}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <span className="text-black">Others</span>
                            <div className="relative">
                                <div className="w-full bg-gray-200 rounded-sm   h-[10px]">
                                    <div
                                        className=" bg-green-800 h-full rounded-sm"
                                        style={{ width: `${Others}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                

                {/* right */}
                <div className="w-full lg:w-1/2  h-300 bg-white radius-[8px] shadow-md ">
                   <div className="flex justify-around">
                   <h1 className="text-center mt-2 text-[20px]">Recent Blogs</h1>
                    <button className="text-center mt-2 text-[20px] text-teal-700 border-1 px-2 border-teal-300">New Blog</button>
                   </div>

                    <div className="flex flex-col mx-auto gap-2 max-w-xl  px-[20px] lg:px-20  mt-3">
                        <div>
                           
                            <div className="relative">
                            {Posts.map((post: any) => (
                        <div
                            key={post?.id}
                            className="mb-1 overflow-hidden flex h-[5rem] shadow-lg border"
                        >
                            <img
                                src={post?.image}
                                alt={`Post ${post?._id}`}
                                className="w-1/3 h-full object-cover object-center"
                            />
                            <div className="p-4">
                                <h2 className=" font-bold mb-2 line-clamp-2 text-[15px]">
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
                    <div className="flex flex-col mx-auto gap-2 max-w-xl  px-[20px] lg:px-20  mt-3">
                        <div>
                           
                            <div className="relative">
                            {PopularPosts.map((post: any) => (
                        <div
                            key={post?.id}
                            className="mb-1 overflow-hidden flex h-[5rem] shadow-lg border"
                        >
                            <img
                                src={post?.image}
                                alt={`Post ${post?._id}`}
                                className="w-1/3 h-full object-cover object-center"
                            />
                            <div className="p-4">
                                <h2 className="text-[15px] font-bold mb-2 line-clamp-2 ">
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
                    <div className="flex flex-col mx-auto gap-2 max-w-xl  px-[20px] lg:px-20  mt-3">
                        <div>
                           
                            <div className="relative ">
                            {TopPosts?.map((post: any) => (
                        <div
                            key={post?.id}
                            className="mb-1 overflow-hidden flex h-[5rem] shadow-lg border"
                        >
                            <img
                                src={post?.image}
                                alt={`Post ${post?._id}`}
                                className="w-1/3 h-full object-cover object-center"
                            />
                            <div className="p-4">
                                <h2 className="text-[15px] font-bold mb-2 line-clamp-2 ">
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
                    <div className="flex flex-col mx-auto gap-2 max-w-xl px-20 ">
                        <div>
                           
                            <div className="relative">
                            {HousePosts?.map((post: any) => (
                        <div
                            key={post?.id}
                            className="mb-1 overflow-hidden flex h-[5rem] shadow-lg border"
                        >
                            <img
                                src={post?.image}
                                alt={`Post ${post?._id}`}
                                className="w-1/3 h-full object-cover object-center"
                            />
                            <div className="p-4">
                                <h2 className="text-[15px] font-bold mb-2 line-clamp-2 ">
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
  )
}

export default Dashboard
