import { Routes, Route } from "react-router-dom";
import BlogsPage from "@/pages/BlogsPage";
import UserPostsPage from "@/pages/UserPostsPage";
import UserSettingsPage from "@/pages/UserSettingsPage";
import DashBoardPage from "@/pages/DashBoardPage";
import AddBlogPage from "@/pages/AddBlogPage";
import LoginPage from "@/pages/Login";
import RegisterPage from "@/pages/Register";
import NotFoundPage from "@/pages/404";
import HomePage from "@/pages/HomePage";

import { getUser } from "@/hooks/user.actions";
import { useEffect, useState } from "react";

interface Props {}

const index = (props: Props) => {
  const [loggedUser, setLoggedUser] = useState<any>(getUser());

  return (
    <div>
      <Routes>
        <Route path="/" element={loggedUser ? <BlogsPage /> : <HomePage />} />
        <Route path="/dashboard" element={<DashBoardPage />} />
        <Route path="/my-posts" element={<UserPostsPage />} />
        <Route path="/settings" element={<UserSettingsPage />} />
        <Route path="/new_blog" element={<AddBlogPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default index;
