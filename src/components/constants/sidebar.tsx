import { useState, useEffect } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Avatar from '../../assets/avatar.png';

import {
    DynamicFeed,
    Favorite,
    HighlightOff,
    LibraryBooks,
    MenuOpen,
    Settings,
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

import { getUser } from '@/hooks/user.actions';
import CustomIconButton from '@/Custom/iconButton';

const Sidebar = () => {
    const [loggedUser] = useState<any>(getUser());
    const [] = useState(true);
    const [showSidebar, setShowSidebar] = useState<boolean>(true);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    console.log(loggedUser);

    const handleToggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            setShowSidebar(window.innerWidth > 800);
        };

        window.addEventListener('resize', handleResize);

        // Call the handleResize initially
        handleResize();

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const location = useLocation();

    return (
        <>
            {loggedUser && (
                <>
                    {windowWidth <= 800 && (
                        <div className="toggle-sidebar" onClick={handleToggleSidebar}>
                            <CustomIconButton>
                                {showSidebar ? <HighlightOff /> : <MenuOpen />}
                            </CustomIconButton>
                        </div>
                    )}
                    {showSidebar && (
                        <aside id="sidebarMenu" className="aside px-2">
                            <div className="position-sticky">
                                <div className="list-group-flush " style={{ width: '100%' }}>
                                    <Link
                                        to="/dashboard"
                                        className={`list-group-item list-group-item-action ripple py-2 ${
                                            location.pathname === '/dashboard' ? 'active' : ''
                                        }`}
                                        style={{
                                            backgroundColor:
                                                location.pathname === '/dashboard' ? '#1e3a8a' : '',
                                        }}
                                    >
                                        <DashboardIcon
                                            className="me-3"
                                            style={{
                                                color:
                                                    location.pathname === '/dashboard'
                                                        ? 'white'
                                                        : '#1e293b',
                                            }}
                                        />
                                        <span
                                            style={{
                                                color:
                                                    location.pathname === '/dashboard'
                                                        ? 'white'
                                                        : '#1e293b',
                                            }}
                                        >
                                            Dashboard
                                        </span>
                                    </Link>
                                    <Link
                                        to="/my-posts"
                                        className={`list-group-item ripple py-2 ${
                                            location.pathname === '/my-posts' ? 'active' : ''
                                        }`}
                                        style={{
                                            backgroundColor:
                                                location.pathname === '/my-posts' ? '#1e3a8a' : '',
                                        }}
                                    >
                                        <LibraryBooks
                                            className="me-3"
                                            style={{
                                                color:
                                                    location.pathname === '/my-posts'
                                                        ? 'white'
                                                        : '#1e293b',
                                            }}
                                        />
                                        <span
                                            style={{
                                                color:
                                                    location.pathname === '/my-posts'
                                                        ? 'white'
                                                        : '#1e293b',
                                            }}
                                        >
                                            My Blogs
                                        </span>
                                    </Link>
                                    <Link
                                        to="/"
                                        className={`list-group-item ripple py-2 ${
                                            location.pathname === '/' ? 'active' : ''
                                        }`}
                                        style={{
                                            backgroundColor:
                                                location.pathname === '/' ? '#1e3a8a' : '',
                                        }}
                                    >
                                        <DynamicFeed
                                            className="me-3"
                                            style={{
                                                color:
                                                    location.pathname === '/' ? 'white' : '#1e293b',
                                            }}
                                        />
                                        <span
                                            style={{
                                                color:
                                                    location.pathname === '/' ? 'white' : '#1e293b',
                                            }}
                                        >
                                            All Posts
                                        </span>
                                    </Link>
                                    <Link
                                        to="#"
                                        className={`list-group-item list-group-item-action ripple py-2 ${
                                            location.pathname === '#' ? 'active' : ''
                                        }`}
                                        style={{
                                            backgroundColor:
                                                location.pathname === '#' ? '#1e3a8a' : '',
                                        }}
                                    >
                                        <Favorite
                                            className="me-3"
                                            style={{
                                                color:
                                                    location.pathname === '#' ? 'white' : '#1e293b',
                                            }}
                                        />
                                        <span
                                            style={{
                                                color:
                                                    location.pathname === '#' ? 'white' : '#1e293b',
                                            }}
                                        >
                                            Liked Posts
                                        </span>
                                    </Link>
                                    <Link
                                        to="#"
                                        className={`list-group-item list-group-item-action ripple py-2 ${
                                            location.pathname === '#' ? 'active' : ''
                                        }`}
                                        style={{
                                            backgroundColor:
                                                location.pathname === '#' ? '#1e3a8a' : '',
                                        }}
                                    >
                                        <TrendingUpIcon
                                            className="me-3"
                                            style={{
                                                color:
                                                    location.pathname === '#' ? 'white' : '#1e293b',
                                            }}
                                        />
                                        <span
                                            style={{
                                                color:
                                                    location.pathname === '#' ? 'white' : '#1e293b',
                                            }}
                                        >
                                            Analytics
                                        </span>
                                    </Link>
                                    <Link
                                        to="/settings"
                                        className={`list-group-item list-group-item-action ripple py-2 ${
                                            location.pathname === 'settings' ? 'active' : ''
                                        }`}
                                        style={{
                                            backgroundColor:
                                                location.pathname === 'settings' ? '#1e3a8a' : '',
                                        }}
                                    >
                                        <Settings
                                            className="me-3"
                                            style={{
                                                color:
                                                    location.pathname === 'settings'
                                                        ? 'white'
                                                        : '#1e293b',
                                            }}
                                        />
                                        <span
                                            style={{
                                                color:
                                                    location.pathname === 'settings'
                                                        ? 'white'
                                                        : '#1e293b',
                                            }}
                                        >
                                            Settings
                                        </span>
                                    </Link>
                                    <a
                                        href="#"
                                        className={`list-group-item list-group-item-action ripple py-2 ${
                                            location.pathname === '#' ? 'active' : ''
                                        }`}
                                        style={{
                                            backgroundColor:
                                                location.pathname === '#' ? '#1e3a8a' : '',
                                        }}
                                    >
                                        <CalendarTodayIcon
                                            className="me-3"
                                            style={{
                                                color:
                                                    location.pathname === '#' ? 'white' : '#1e293b',
                                            }}
                                        />
                                        <span
                                            style={{
                                                color:
                                                    location.pathname === '#' ? 'white' : '#1e293b',
                                            }}
                                        >
                                            Calendar
                                        </span>
                                    </a>
                                </div>
                            </div>
                            <div className="footer">
                                <hr />
                                <img
                                    src={
                                        loggedUser?.profilePicture
                                            ? loggedUser.profilePicture
                                            : Avatar
                                    }
                                    alt="writer"
                                    className="h-[120px] w-[120px] rounded-full object-cover object-top p-2"
                                />
                                <br />
                                <p className="text-dark">
                                    {loggedUser?.firstName} {loggedUser?.lastName}
                                </p>
                            </div>
                        </aside>
                    )}
                </>
            )}
        </>
    );
};

export default Sidebar;
