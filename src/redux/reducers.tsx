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

export const postsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ActionTypes.GET_POST:
      // Handle fetching a single post and update the state
      return getPostAPI(action.payload.postId)
        .then((response) => {
          const post = response.data;
          return {
            ...state,
            post: post,
          };
        })
        .catch((error) => {
          // Handle error
          console.log(error);
          return state;
        });

    case ActionTypes.GET_POSTS:
      // Handle fetching all posts and update the state
      getPostsAPI()
        .then((response) => {
          const posts = response.data;
          return {
            ...state,
            posts: posts,
          };
        })
        .catch((error) => {
          // Handle error
          console.log(error);
          return state;
        });

    case ActionTypes.GET_USER_POSTS:
      // Handle fetching posts for a specific user and update the state
      const { userId } = action.payload || {};
      if (!userId) {
        return state;
      }
      getUserPostsAPI(userId)
        .then((response) => {
          const userPosts = response.data;
          return {
            ...state,
            userPosts: userPosts,
          };
        })
        .catch((error) => {
          // Handle error
          console.log(error);
          return state;
        });

    case ActionTypes.EDIT_POST:
      // Handle editing a post and update the state
      const { postId: editPostId, updatedPost } = action.payload || {};
      if (!editPostId || !updatedPost) {
        return state;
      }
      editPostAPI(editPostId, updatedPost)
        .then((response) => {
          const editedPost = response.data;
          return {
            ...state,
            post: editedPost,
          };
        })
        .catch((error) => {
          // Handle error
          console.log(error);
          return state;
        });

    case ActionTypes.DELETE_POST:
      // Handle deleting a post and update the state
      const { postId: deletePostId } = action.payload || {};
      if (!deletePostId) {
        return state;
      }
      deletePostAPI(deletePostId)
        .then(() => {
          const updatedPosts = state.posts.filter(
            (post) => post.id !== deletePostId
          );
          return {
            ...state,
            posts: updatedPosts,
          };
        })
        .catch((error) => {
          // Handle error
          console.log(error);
          return state;
        });

    default:
      return state;
  }
};
