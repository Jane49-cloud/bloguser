import { configureStore } from "@reduxjs/toolkit";
import { LoaderSlice } from "./LoaderSlice";
import { UserSlice } from "./UserSlice";
import authReducer from './auth'; 

const store = configureStore({
  reducer: {
    loaders: LoaderSlice.reducer,
    users: UserSlice.reducer,
    auth:authReducer
  },
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware()
});

export default store;
