import { Routes, Route } from 'react-router-dom';
import BlogsPage from '@/pages/BlogsPage';
import UserPostsPage from '@/pages/UserPostsPage';
import UserSettingsPage from '@/pages/UserSettingsPage';
import DashBoardPage from '@/pages/DashBoardPage';
import AddBlogPage from '@/pages/AddBlogPage';
import LoginPage from '@/pages/Login';
import RegisterPage from '@/pages/Register';
import NotFoundPage from '@/pages/404';
import HomePage from '@/pages/HomePage';
import SingleBlogPage from '@/pages/SingleBlogPage';
import UserProfilePage from '@/pages/UserProfilePage';

import { getUser } from '@/hooks/user.actions';
import { useState } from 'react';

const index = () => {
    const [loggedUser] = useState<any>(getUser());

    return (
        <div>
            <Routes>
                <Route path="/" element={loggedUser ? <BlogsPage /> : <HomePage />} />
                <Route path="/home" element={<BlogsPage />} />
                <Route path="/my-posts" element={<UserPostsPage />} />
                <Route path="/dashboard" element={<DashBoardPage />} />
                <Route path="/settings" element={<UserSettingsPage />} />
                <Route path="/new_blog" element={<AddBlogPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/blog/:id" element={<SingleBlogPage />} />
                <Route path="/user_profile/:id" element={<UserProfilePage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    );
};

export default index;
