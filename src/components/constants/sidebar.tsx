import React, { useState, useEffect } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PeopleIcon from "@mui/icons-material/People";
import {
  Favorite,
  LibraryBooks,
  Settings,
  TopicSharp,
} from "@mui/icons-material";
// import { Link } from "react-router-dom";

interface Props {}

const sidebar = (props: Props) => {
  const [showSidebar, setShowSidebar] = useState<boolean>(true);

  useEffect(() => {
    const handleResize = () => {
      setShowSidebar(window.innerWidth > 400);
    };

    window.addEventListener("resize", handleResize);

    // Call the handleResize initially
    handleResize();

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <aside id="sidebarMenu" className=" sidebar bg-white">
        <div className="position-sticky">
          <div className="list-group list-group-flush mx-3 mt-4">
            <a
              href="/admin"
              className="list-group-item list-group-item-action ripple py-2"
              aria-current="true"
            >
              <DashboardIcon className="me-3" />
              <span>dashboard</span>
            </a>
            <a href="/admin/blogs" className="list-group-item  `py-2 ripple ">
              <LibraryBooks className="me-3" />
              <span>My Blogs</span>
            </a>
            <a href="/admin/blogs" className="list-group-item  `py-2 ripple ">
              <LibraryBooks className="me-3" />
              <span>All Posts</span>
            </a>
            <a
              href="/admin/hrefpics"
              className="list-group-item list-group-item-action ripple py-2"
            >
              <Favorite className="me-3" />
              <span>Liked Posts</span>
            </a>
            <a
              href="#"
              className="list-group-item list-group-item-action ripple py-2"
            >
              <TrendingUpIcon className="me-3" />
              <span>Analytics</span>
            </a>
            <a
              href="#"
              className="list-group-item list-group-item-action ripple py-2"
            >
              <Settings className="me-3" />
              <span>Settings</span>
            </a>

            <a
              href="#"
              className="list-group-item list-group-item-action ripple py-2"
            >
              <CalendarTodayIcon className="me-3" />
              <span>Calendar</span>
            </a>
          </div>
        </div>
      </aside>
    </>
  );
};

export default sidebar;
