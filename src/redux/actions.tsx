// actions.ts
import { ActionTypes } from "./ActionTypes";

export const getPost = (postId: string) => ({
  type: ActionTypes.GET_POST,
  payload: { postId },
});

export const getPosts = () => ({
  type: ActionTypes.GET_POSTS,
});

export const getUserPosts = (userId: string) => ({
  type: ActionTypes.GET_USER_POSTS,
  payload: { userId },
});

export const editPost = (postId: string, updatedPost: any) => ({
  type: ActionTypes.EDIT_POST,
  payload: { postId, updatedPost },
});

export const deletePost = (postId: string) => ({
  type: ActionTypes.DELETE_POST,
  payload: { postId },
});
