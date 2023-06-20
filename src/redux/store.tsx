import createSagaMiddleware from "redux-saga";

import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./postState";
import postSaga from "./postSaga";

const saga = createSagaMiddleware();
const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
  middleware: [saga],
});
saga.run(postSaga);

export default store;
