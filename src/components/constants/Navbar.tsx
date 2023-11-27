import { LibraryAdd, MenuOpen, NotificationAddOutlined } from '@mui/icons-material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import CustomPrimaryButton from '@/Custom/CustomButton';

import { getUser, useUserActions } from '../../hooks/user.actions';
import { IconButton } from '@mui/material';

const Navbar = () => {
    const [loggedUser] = useState<any>(getUser());

    const userActions = useUserActions();

    const handleLogout = () => {
        userActions.logout();
    };

    return (
        <nav
            className="navbar navbar-expand-lg w-full"
            style={{ zIndex: '100', position: 'fixed', backgroundColor: 'white' }}
        >
            <div className="flex w-full items-center justify-between  px-[20px] ">
                <Link className="navbar-brand text-primary " to="/">
                    𝐁𝐋𝐎𝐆𝐇𝐔𝐁
                </Link>
                <IconButton className="navbar-toggler">
                    {' '}
                    <MenuOpen />{' '}
                </IconButton>

                <div className="flex">
                    <div className="navbar-nav mx-auto">
                        {' '}
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
                </div>

                <div>
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
                                    {loggedUser?.firstName} {loggedUser?.lastName}
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
