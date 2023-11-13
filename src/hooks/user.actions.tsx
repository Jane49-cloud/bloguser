import { useNavigate } from "react-router-dom";
import axiosService from "@/Helpers/axios";
import axios from "axios";

function useUserActions() {
  const navigate = useNavigate();
  const baseURL = "http://localhost:8000/api/v1";

  return {
    login,
    register,
    logout,
    edit,
  };

  // Login the user
  function login(data: any) {
    return axios.post(`${baseURL}/users/login`, data).then((res) => {
      // Registering the account and tokens in the store
      setUserData(res.data);
      navigate("/home");
    });
  }

  // Register the user
  function register(data: any) {
    return axios.post(`${baseURL}/users/register`, data).then((res) => {
      // Registering the account and tokens in the store
      setUserData(res.data);
      navigate("/");
    });
  }

  // Edit the user
  function edit(data: any, userId: string) {
    return axiosService
      .patch(`${baseURL}/user/${userId}/`, data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res: { data: any }) => {
        // Registering the account in the store
        localStorage.setItem(
          "auth",
          JSON.stringify({
            access: getAccessToken(),
            refresh: getRefreshToken(),
            user: res.data,
          })
        );
      });
  }

  // Logout the user
  function logout() {
    return axiosService
      .post(`${baseURL}/users/logout/`, { refresh: getRefreshToken() })
      .then(() => {
        localStorage.removeItem("auth");
        navigate("/login");
      });
  }
}

// Get the user
function getUser() {
  try {
    const auth = JSON.parse(localStorage.getItem("auth") || "{}");
    if (auth && auth.user) {
      return auth.user;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error retrieving user:", error);
    return null;
  }
}

// Get the access token
function getAccessToken() {
  const auth = JSON.parse(localStorage.getItem("auth") || "{}");
  return auth.access;
}

// Get the refresh token
function getRefreshToken() {
  const auth = JSON.parse(localStorage.getItem("auth") || "{}");
  return auth.refresh || "";
}

// Set the access, token and user property
function setUserData(data: any) {
  localStorage.setItem(
    "auth",
    JSON.stringify({
      access: data.access,
      refresh: data.refresh,
      user: data.user,
    })
  );
}

export {
  useUserActions,
  getUser,
  getAccessToken,
  getRefreshToken,
  setUserData,
};
