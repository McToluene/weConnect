import axios from "axios";
import { History } from "history";
import { Dispatch } from "redux";
import { TypeKeys } from "./types";

// GET current profile
export const getCurrentProfile = () => (dispatch: Dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(res =>
      dispatch({
        payload: res.data,
        type: TypeKeys.GET_PROFILE
      })
    )
    .catch(err =>
      dispatch({
        payload: {},
        type: TypeKeys.GET_PROFILE
      })
    );
};

// GET profile by handle
export const getProfileByHandle = (handle: string) => (dispatch: Dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(res =>
      dispatch({
        payload: res.data,
        type: TypeKeys.GET_PROFILE
      })
    )
    .catch(err => {
      dispatch({
        payload: null,
        type: TypeKeys.GET_PROFILE
      });
      // tslint:disable-next-line:no-console
      console.log(err);
    });
};

// create profile
export const createProfile = (profileData: any, history: History) => (
  dispatch: Dispatch
) => {
  axios
    .post("/api/profile", profileData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        payload: err.response.data,
        type: TypeKeys.GET_ERRORS
      })
    );
};

// Add experience
export const addExperience = (expData: any, history: History) => (
  dispatch: Dispatch
) => {
  axios
    .post("/api/profile/experience", expData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        payload: err.response.data,
        type: TypeKeys.GET_ERRORS
      })
    );
};

// Add education
export const addEducation = (eduData: any, history: History) => (
  dispatch: Dispatch
) => {
  axios
    .post("/api/profile/education", eduData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        payload: err.response.data,
        type: TypeKeys.GET_ERRORS
      })
    );
};

// Delete Experience
export const deleteExperience = (id: number) => (dispatch: Dispatch) => {
  axios
    .delete(`/api/profile/experience/${id}`)
    .then(res =>
      dispatch({
        payload: res.data,
        type: TypeKeys.GET_PROFILE
      })
    )
    .catch(err =>
      dispatch({
        payload: err.response.data,
        type: TypeKeys.GET_ERRORS
      })
    );
};

// Delete Eductaion
export const deleteEducation = (id: number) => (dispatch: Dispatch) => {
  axios
    .delete(`/api/profile/Education/${id}`)
    .then(res =>
      dispatch({
        payload: res.data,
        type: TypeKeys.GET_PROFILE
      })
    )
    .catch(err =>
      dispatch({
        payload: err.response.data,
        type: TypeKeys.GET_ERRORS
      })
    );
};

// Delete account & profile
export const deleteAccount = () => (dispatch: Dispatch) => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    axios
      .delete("/api/profile")
      .then(res =>
        dispatch({
          payload: {},
          type: TypeKeys.SET_CURRENT_USER
        })
      )
      .catch(err =>
        dispatch({
          payload: err.response.data,
          type: TypeKeys.GET_ERRORS
        })
      );
  }
};

// Get all profiles
export const getProfiles = () => (dispatch: Dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get("api/profile/all")
    .then(res =>
      dispatch({
        payload: res.data,
        type: TypeKeys.GET_PROFILES
      })
    )
    .catch(err =>
      dispatch({
        payload: null,
        type: TypeKeys.GET_PROFILES
      })
    );
};

export const setProfileLoading = () => {
  return {
    type: TypeKeys.PROFILE_LOADING
  };
};

export const clearProfile = () => {
  return {
    type: TypeKeys.CLEAR_CURRENT_PROFILE
  };
};
