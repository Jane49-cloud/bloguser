import { useState, useEffect } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Favorite, LibraryBooks, Settings } from "@mui/icons-material";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

interface Props {}

const sidebar = (props: Props) => {
  const [user, setUSer] = useState(true);
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
      {user && (
        <aside
          id="sidebarMenu"
          className={user ? "aside" : "no-aside sidebar bg-white"}
        >
          <div className="position-sticky">
            <div className="list-group list-group-flush mx-3 mt-4">
              <Link
                to="/dashboard"
                className="list-group-item list-group-item-action ripple py-2"
              >
                <DashboardIcon className="me-3" />
                <span>dashboard</span>
              </Link>
              <Link to="/my-posts" className="list-group-item  `py-2 ripple ">
                <LibraryBooks className="me-3" />
                <span>My Blogs</span>
              </Link>
              <Link to="/" className="list-group-item  `py-2 ripple ">
                <LibraryBooks className="me-3" />
                <span>All Posts</span>
              </Link>
              <Link
                to="#"
                className="list-group-item list-group-item-action ripple py-2"
              >
                <Favorite className="me-3" />
                <span>Liked Posts</span>
              </Link>
              <Link
                to="#"
                className="list-group-item list-group-item-action ripple py-2"
              >
                <TrendingUpIcon className="me-3" />
                <span>Analytics</span>
              </Link>
              <Link
                to="settings"
                className="list-group-item list-group-item-action ripple py-2"
              >
                <Settings className="me-3" />
                <span>Settings</span>
              </Link>

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
      )}
    </>
  );
};

export default sidebar;
