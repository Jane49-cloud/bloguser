import { useSelector } from "react-redux";
import reader from "../assets/read.jpg"
import { MdLibraryBooks } from "react-icons/md";
import { SiBookstack } from "react-icons/si";
import { IoBookSharp } from "react-icons/io5";
import { BsFillBookmarksFill } from "react-icons/bs";


const Dashboard = () => {

    const user = useSelector((state: any) => state.auth.user);
  return (
    <div className="mt-10 bg-teal-50 h-screen w-full py-5 px-2">
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
<div className="flex">

  
</div>
    </div>
    </div>
  )
}

export default Dashboard
