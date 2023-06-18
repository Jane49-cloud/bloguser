import { ActionTypes } from "./ActionTypes";
import {
  getPostAPI,
  getPostsAPI,
  getUserPostsAPI,
  editPostAPI,
  deletePostAPI,
} from "./api";

export interface Post {
  id: string;
  title: string;
  content: string;
}

export interface PostsState {
  post: Post | null;
  posts: Post[];
  userPosts: Post[];
}

const initialState: PostsState = {
  post: null,
  posts: [],
  userPosts: [],
};

export const postsReducer = async (state = initialState, action: any) => {
  switch (action.type) {
    case ActionTypes.GET_POST:
      try {
        const response = await getPostAPI(action.payload.postId);
        const post = response.data;
        return {
          ...state,
          post: post,
        };
      } catch (error) {
        console.log(error);
        return state;
      }

    case ActionTypes.GET_POSTS:
      try {
        const response = await getPostsAPI();
        const posts = response.data;
        return {
          ...state,
          posts: posts,
        };
      } catch (error) {
        console.log(error);
        return state;
      }

    case ActionTypes.GET_USER_POSTS:
      const { userId } = action.payload || {};
      if (!userId) {
        return state;
      }
      try {
        const response = await getUserPostsAPI(userId);
        const userPosts = response.data;
        return {
          ...state,
          userPosts: userPosts,
        };
      } catch (error) {
        console.log(error);
        return state;
      }

    case ActionTypes.EDIT_POST:
      const { postId: editPostId, updatedPost } = action.payload || {};
      if (!editPostId || !updatedPost) {
        return state;
      }
      try {
        const response = await editPostAPI(editPostId, updatedPost);
        const editedPost = response.data;
        return {
          ...state,
          post: editedPost,
        };
      } catch (error) {
        console.log(error);
        return state;
      }

    case ActionTypes.DELETE_POST:
      const { postId: deletePostId } = action.payload || {};
      if (!deletePostId) {
        return state;
      }
      try {
        await deletePostAPI(deletePostId);
        const updatedPosts = state.posts.filter(
          (post) => post.id !== deletePostId
        );
        return {
          ...state,
          posts: updatedPosts,
        };
      } catch (error) {
        console.log(error);
        return state;
      }

    default:
      return state;
  }
};
