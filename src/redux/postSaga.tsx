import { call, put, takeEvery } from "redux-saga/effects";
import {
  getPostsSuccess,
  getSinglePostSuccess,
  editPostSuccess,
  deletePostSuccess,
} from "./postState";
import { postProps } from "@/Interfaces/post";

// const base = "http://localhost:8000/api/v1";
const base = "https://bloghub-p25a.onrender.com/api/v1";

function* workGetsCatsFetch() {
  const posts: Response = yield call(() => fetch(`${base}/posts`));
  const allPosts: postProps[] = yield posts.json();
  yield put(getPostsSuccess(allPosts));
}

function* workGetSinglePostFetch(action: any) {
  const postId = action.payload;
  const post: Response = yield call(() => fetch(`${base}/posts/${postId}`));
  const singlePost: postProps = yield post.json();
  yield put(getSinglePostSuccess(singlePost));
}
function* workEditPostFetch(action: any) {
  try {
    const { postId, formData } = action.payload;
    const response: Response = yield call(() =>
      fetch(`${base}/posts/${postId}`, {
        method: "PATCH",
        body: formData,
      })
    );
    if (response.ok) {
      yield put(editPostSuccess());
    }
  } catch (error) {
    // Handle the error
  }
}

function* deletePostFetchWorker(action: any) {
  try {
    const postId = action.payload;
    const response: Response = yield call(() =>
      fetch(`${base}/posts/${postId}`, {
        method: "DELETE",
      })
    );

    if (response.ok) {
      yield put(deletePostSuccess());
    } else {
      // Handle delete failure
    }
  } catch (error) {
    // Handle the error
  }
}

function* postSaga() {
  yield takeEvery("posts/getPostsFetch", workGetsCatsFetch);
  yield takeEvery("posts/getSinglePostFetch", workGetSinglePostFetch);
  yield takeEvery("posts/editPostFetch", workEditPostFetch);
  yield takeEvery("posts/deletePostFetch", deletePostFetchWorker);
}

export default postSaga;
