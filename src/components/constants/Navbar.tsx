import { useEffect, useState } from "react";
import { AddBox, BookOnline, Close, Menu } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { getLoggedInUser } from "@/redux/auth";
import { useNavigate } from "react-router-dom";
import axiosService from "@/Helpers/axios";

const Header = () => {
  const Links = [
    { name: "HOME", link: "/" },
    { name: "TOPICS", link: "/topics" },
    { name: "TRENDING", link: "/trending" },
    { name: "CONTACT", link: "/contact" },
  ];

  const [open, setOpen] = useState(false);
  const location = useLocation();
  const user = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();
  const [toggle, settoggle] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getLoggedInUser());
  }, [user]);

  const getPost = async (id: any) => {
    const response = await axiosService.get(`/users/posts/${id}`);
    console.log(`this is my response`, response);
  };

  useEffect(() => {
    getPost(user?._id);
  }, []);
  return (
    <div className="fixed left-0 top-0 z-20 w-full shadow-md">
      <div className="items-center justify-between bg-white py-3 md:flex md:px-10 md:py-1">
        <div className="flex cursor-pointer items-center gap-1 text-2xl font-bold">
          <BookOnline className="h-7 w-7 text-teal-600" />
          <span>BLoGHub</span>
        </div>
        <div
          onClick={() => setOpen(!open)}
          className="absolute right-8 top-6 h-7 w-7 cursor-pointer md:hidden"
        >
          {open ? <Close /> : <Menu />}
        </div>
        <ul
          className={`absolute left-0 z-[-1] w-full bg-white pb-12 pl-9 transition-all duration-500 ease-in md:static md:z-auto md:flex md:w-auto md:items-center md:pb-0 md:pl-0 ${
            open ? "top-12" : "top-[-490px]"
          }`}
        >
          {Links.map((link) => (
            <li
              key={link.name}
              className="my-7 text-sm font-semibold md:my-0 md:ml-8"
            >
              <a
                href={link.link}
                className={`text-gray-800 duration-500 hover:text-teal-400 ${
                  location.pathname === link.link ? "text-teal-600" : ""
                }`}
              >
                {link.name}
              </a>
            </li>
          ))}
          <div className="mx-4">
            {user ? (
              <div className="relative flex items-center gap-3">
                <div className="flex">
                  <AddBox
                    className="text-teal-800"
                    onClick={() => navigate("/new_blog")}
                  />
                </div>
                <Avatar src={user.image} onClick={() => settoggle(!toggle)} />
                {toggle && (
                  <div className="absolute right-0 top-[100%] flex w-[200px] flex-col rounded-[8px]  bg-gray-300   px-2 py-4 shadow-sm">
                    <p>{`${user.firstName} ${user.lastName}`}</p>
                    <p>logout</p>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <button
                  className="rounded-[8px] bg-teal-700 px-3 py-2 font-bold text-white transition-colors duration-300 hover:bg-teal-800 "
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              </div>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Header;
