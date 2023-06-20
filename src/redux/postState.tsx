import { createSlice } from "@reduxjs/toolkit";

interface PostsState {
  posts: [];
  isLoading: boolean;
  singlePost: {};
  selectedPostId: string;
  editPost: {
    postId: string;
    formData: FormData;
    isLoading: boolean;
    error: string | null;
  };
  deletePost: {
    postId: string;
    isLoading: boolean;
    error: string | null;
  };
}

const initialState: PostsState = {
  posts: [],
  isLoading: false,
  singlePost: {},
  selectedPostId: "",
  editPost: {
    postId: "",
    formData: new FormData(),
    isLoading: false,
    error: null,
  },
  deletePost: {
    postId: "",
    isLoading: false,
    error: null,
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    getPostsFetch: (state) => {
      state.isLoading = true;
    },
    getPostsSuccess: (state, action) => {
      state.posts = action.payload;
      state.isLoading = false;
    },
    getPostsFailure: (state) => {
      state.isLoading = false;
    },
    getSinglePostFetch: (state, action) => {
      state.isLoading = true;
      state.singlePost = {};
      state.selectedPostId = action.payload; // Add selected post id to state
    },
    getSinglePostSuccess: (state, action) => {
      state.singlePost = action.payload;
      state.isLoading = false;
    },
    getSinglePostFailure: (state) => {
      state.isLoading = false;
    },
    editPostFetch: (state, action) => {
      state.editPost.isLoading = true;
      state.editPost.error = null;
      state.editPost.postId = action.payload.postId;
      state.editPost.formData = action.payload.formData;
    },
    editPostSuccess: (state) => {
      state.editPost.isLoading = false;
    },
    editPostFailure: (state, action) => {
      state.editPost.isLoading = false;
      state.editPost.error = action.payload;
    },
    deletePostFetch: (state, action) => {
      state.deletePost.isLoading = true;
      state.deletePost.error = null;
      state.deletePost.postId = action.payload;
    },
    deletePostSuccess: (state) => {
      state.deletePost.isLoading = false;
    },
    deletePostFailure: (state, action) => {
      state.deletePost.isLoading = false;
      state.deletePost.error = action.payload;
    },
  },
});

export const {
  getPostsFetch,
  getPostsSuccess,
  getPostsFailure,
  getSinglePostFetch,
  getSinglePostSuccess,
  getSinglePostFailure,
  editPostFetch,
  editPostSuccess,
  editPostFailure,
  deletePostFetch,
  deletePostSuccess,
  deletePostFailure,
} = postsSlice.actions;

export default postsSlice.reducer;
