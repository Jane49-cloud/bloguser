import { LibraryAdd, NotificationAddOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CustomPrimaryButton from "@/Custom/CustomButton";
import { getUser, useUserActions } from "../../hooks/user.actions";

const Navbar = () => {
  const [loggedUser, setLoggedUser] = useState<any>(getUser());

  const userActions = useUserActions();
  const user = getUser();

  // useEffect(() => {
  //   setLoggedUser(user);
  // }, [user, LoggedUser]);

  const handleLogout = () => {
    userActions.logout();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light d-flex align-items-center ">
      <div className="container-fluid">
        <Link className="navbar-brand text-primary " to="/">
          𝐁𝐋𝐎𝐆𝐇𝐔𝐁
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav mx-auto">
            {" "}
            {/* Modified: Added mx-auto class */}
            <Link className="nav-link active" to="/">
              Home
            </Link>
            <Link className="nav-link active" to="#">
              Topics
            </Link>
            <Link className="nav-link active d-flex " to="new_blog">
              <LibraryAdd /> <span className="">Add blog</span>
            </Link>
            <Link className="nav-link active" to="#">
              <NotificationAddOutlined />
            </Link>
          </div>
          {loggedUser ? (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="userMenu"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {loggedUser?.firstName} {loggedUser?.lastName} {""}
                </Link>
                <div
                  className="dropdown-menu dropdown-menu-right"
                  aria-labelledby="userMenu"
                >
                  <Link
                    className="dropdown-item"
                    to={`user_profile/${loggedUser.id}`}
                  >
                    My Profile
                  </Link>
                  <div className="dropdown-divider"></div>
                  <Link className="dropdown-item" to="#" onClick={handleLogout}>
                    Log out
                  </Link>
                </div>
              </li>
            </ul>
          ) : (
            <form className="form-inline">
              <CustomPrimaryButton>
                <Link to="login" className="nav-link text-white">
                  Log in
                </Link>
              </CustomPrimaryButton>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
