import axios from "axios";
import { Dispatch } from "redux";
import { TypeKeys } from "./types";

// Add Post
export const addPost = (postData: any) => (dispatch: Dispatch) => {
  dispatch(clearErrors());
  axios
    .post("/api/posts", postData)
    .then(res =>
      dispatch({
        payload: res.data,
        type: TypeKeys.ADD_POST
      })
    )
    .catch(err =>
      dispatch({
        payload: err.response.data,
        type: TypeKeys.GET_ERRORS
      })
    );
};

// Get Posts
export const getPosts: any = () => (dispatch: Dispatch) => {
  dispatch(setPostLoading());
  axios
    .get("/api/posts")
    .then(res =>
      dispatch({
        payload: res.data,
        type: TypeKeys.GET_POSTS
      })
    )
    .catch(err =>
      dispatch({
        payload: null,
        type: TypeKeys.GET_POSTS
      })
    );
};

// Like Post
export const addLike = (id: number) => (dispatch: Dispatch) => {
  axios
    .post(`/api/posts/like/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err =>
      dispatch({
        payload: err.response.data,
        type: TypeKeys.GET_ERRORS
      })
    );
};

// Remove Like
export const removeLike = (id: number) => (dispatch: Dispatch) => {
  axios
    .post(`/api/posts/unlike/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err =>
      dispatch({
        payload: err.response.data,
        type: TypeKeys.GET_ERRORS
      })
    );
};

// Delete Post
export const deletePost = (id: number) => (dispatch: Dispatch) => {
  axios
    .delete(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        payload: id,
        type: TypeKeys.DELETE_POST
      })
    )
    .catch(err =>
      dispatch({
        payload: err.response.data,
        type: TypeKeys.GET_ERRORS
      })
    );
};

// Get post
export const getPost: any = (id: number) => (dispatch: Dispatch) => {
  dispatch(setPostLoading());
  axios
    .get(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        payload: res.data,
        type: TypeKeys.GET_POST
      })
    )
    .catch(err =>
      dispatch({
        payload: null,
        type: TypeKeys.GET_POST
      })
    );
};

// Add Comment
export const addComment = (postId: number, commentData: any) => (
  dispatch: Dispatch
) => {
  dispatch(clearErrors());
  axios
    .post(`/api/posts/comment/${postId}`, commentData)
    .then(res =>
      dispatch({
        payload: res.data,
        type: TypeKeys.GET_POST
      })
    )
    .catch(err =>
      dispatch({
        payload: err.response.data,
        type: TypeKeys.GET_ERRORS
      })
    );
};

// delete Comment
export const deleteComment = (postId: number, commentId: number) => (
  dispatch: Dispatch
) => {
  axios
    .delete(`/api/posts/comment/${postId}/${commentId}`)
    .then(res =>
      dispatch({
        payload: res.data,
        type: TypeKeys.GET_POST
      })
    )
    .catch(err =>
      dispatch({
        payload: err.response.data,
        type: TypeKeys.GET_ERRORS
      })
    );
};

// Set loading state
export const setPostLoading = () => {
  return {
    type: TypeKeys.POST_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: TypeKeys.CLEAR_ERRORS
  };
};
