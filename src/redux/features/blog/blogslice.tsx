import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getBlog from "./blog";
import { postProps } from "../../../Interfaces/post";

// Initial State
interface BlogState {
  blog: postProps | null;
  isLoading: boolean;
  isError: boolean;
  error: string;
}

// Async thunk
export const fetchBlog = createAsyncThunk(
  "blog/fetchBlog",
  async (id: string) => {
    const blog = await getBlog(id);
    return blog;
  }
);

// Create slice
const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blog: null,
    isLoading: false,
    isError: false,
    error: "",
  } as BlogState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlog.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blog = action.payload;
      })
      .addCase(fetchBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.blog = null;
        state.isError = true;
        state.error = action.error.message || "An error occurred.";
      });
  },
});

export default blogSlice.reducer;
