// api.ts
import axiosService from "@/Helpers/axios";

import axios from "axios";

// Example API endpoints
const API_BASE_URL = "https://example-api.com";

export const getPostAPI = (id: string) => {
  return axiosService.get(`/posts/${id}`);
};

export const getPostsAPI = () => {
  return axiosService.get(`/posts`);
};

export const getUserPostsAPI = (userId: string) => {
  return axios.get(`${API_BASE_URL}/users/${userId}/posts`);
};

export const editPostAPI = (postId: string, updatedPost: any) => {
  return axios.put(`${API_BASE_URL}/posts/${postId}`, updatedPost);
};

export const deletePostAPI = (postId: string) => {
  return axios.delete(`${API_BASE_URL}/posts/${postId}`);
};
