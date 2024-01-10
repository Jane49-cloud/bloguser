import { useState } from "react";
import {
  MdOutlineDashboard,
  MdAccountCircle,
  MdAnalytics,
  MdOutlineSettings,
  MdLogout,
} from "react-icons/md";
import {
  BsChevronDown,
  BsChatLeftText,
  BsCalendarCheck,
  BsFiles,
  BsServer,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Menus = [
  { title: "Dashboard", src: "/dashboard", icon: <MdOutlineDashboard /> },
  { title: "Comments", src: "/comments", icon: <BsChatLeftText /> },
  { title: "Accounts", src: "/accounts", gap: true, icon: <MdAccountCircle /> },
  { title: "Schedule ", src: "/calender", icon: <BsCalendarCheck /> },
  {
    title: "Blogs",
    src: "/",
    icon: <BsServer />,
    subMenus: [
      {
        title: "Popular",
        src: "/blogs/popular",

        cName: "sub-nav",
      },
      {
        title: "Top",
        src: "/blogs/top",

        cName: "sub-nav",
      },
      {
        title: "House",
        src: "/blogs/house",
      },
      {
        title: "Others",
        src: "/blogs/others",
      },
    ],
  },
  { title: "Analytics", src: "Chart", icon: <MdAnalytics /> },
  { title: "Files ", src: "Folder", gap: true, icon: <BsFiles /> },
  { title: "Setting", src: "Setting", icon: <MdOutlineSettings /> },
  { title: "Logout", src: "Logout", icon: <MdLogout /> },
];

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSidebar = () => {
    setOpen(!open);
  };
  const navigate = useNavigate();
  return (
    <div className=" ml-1 flex h-screen lg:mt-10 ">
      <button
        className="z-90 fixed bottom-10 right-8 flex h-10 w-10 items-center justify-center rounded-full bg-teal-800 text-4xl text-white drop-shadow-lg duration-300 hover:bg-teal-800   lg:hidden"
        onClick={toggleSidebar}
      >
        <span className="text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="m-auto w-6"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"
            />
          </svg>
        </span>
      </button>

      <div
        className={` ${
          open ? "no-scrollbar   w-48 overflow-y-auto px-2" : "w-0 "
        } sticky left-0 top-0 hidden h-[80%] max-h-[80%] rounded-r-[2px] bg-teal-800 duration-500 lg:flex  lg:w-72  `}
      >
        <div className=" mt-3 justify-center">
          <h1
            className={`text-center  text-2xl font-medium text-white duration-200 ${
              !open && "invisible"
            }`}
          ></h1>
        </div>
        <ul className="hidden pt-6 lg:block">
          {Menus.map((Menu, index) => (
            <>
              <li
                key={index}
                className={`flex  cursor-pointer items-center gap-x-4 rounded-md p-2 text-sm text-white hover:bg-teal-400 
              ${Menu.gap ? "mt-9" : "mt-2"}  `}
                onClick={() => navigate(Menu.src)}
              >
                {Menu.icon ? Menu.icon : <MdOutlineDashboard />}
                <span className="flex-1">{Menu.title}</span>
                {Menu.subMenus && (
                  <BsChevronDown
                    onClick={() => setSubMenuOpen(!subMenuOpen)}
                    className={`${subMenuOpen && "rotate-180"}`}
                  />
                )}
              </li>
              {Menu.subMenus && subMenuOpen && open && (
                <ul>
                  {Menu.subMenus.map((subMenuItem, idx) => (
                    <li
                      key={idx}
                      className="flex cursor-pointer px-3 py-1 text-center text-sm text-gray-200"
                      onClick={() => navigate(subMenuItem.src)}
                    >
                      {subMenuItem.title}
                    </li>
                  ))}
                </ul>
              )}
            </>
          ))}
        </ul>
      </div>
      {/* small screens */}

      {open && (
        <div
          className={` ${
            open ? "w-48 px-2 " : "w-0 "
          } relative h-screen bg-teal-800   duration-500 lg:hidden lg:w-72`}
        >
          <div className=" mt-3 justify-center">
            <h1
              className={`text-center  text-2xl font-medium text-white duration-200 ${
                !open && "invisible"
              }`}
            ></h1>
          </div>
          <ul className="pt-6 ">
            {Menus.map((Menu, index) => (
              <>
                <li
                  key={index}
                  className={`flex  cursor-pointer items-center gap-x-4 rounded-md p-2 text-sm text-white hover:bg-teal-400 
                  ${Menu.gap ? "mt-9" : "mt-2"}  `}
                  onClick={() => navigate(Menu.src)}
                >
                  {Menu.icon ? Menu.icon : <MdOutlineDashboard />}
                  <span className="flex-1">{Menu.title}</span>
                  {Menu.subMenus && (
                    <BsChevronDown
                      onClick={() => setSubMenuOpen(!subMenuOpen)}
                      className={`${subMenuOpen && "rotate-180"}`}
                    />
                  )}
                </li>
                {Menu.subMenus && subMenuOpen && open && (
                  <ul>
                    {Menu.subMenus.map((subMenuItem, idx) => (
                      <li
                        key={idx}
                        className="flex cursor-pointer px-3 py-1 text-center text-sm text-gray-200"
                        onClick={() => navigate(subMenuItem.src)}
                      >
                        {subMenuItem.title}
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
