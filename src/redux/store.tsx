import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./features/blog/blogslice";

//configure  store

const store = configureStore({
  reducer: {
    blog: blogReducer,
  },
});

export default store;
