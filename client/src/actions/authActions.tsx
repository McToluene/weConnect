import axios from "axios";
import { History } from "history";
import * as jwt_decode from "jwt-decode";
import { Dispatch } from "redux";
import { ILogin } from "src/components/auth/Login";
import { IRegister } from "src/components/auth/Register";
import setAuthToken from "src/utils/setAuthToken";
import { TypeKeys } from "./types";

export const registerUser = (userData: IRegister, history: History) => (
  dispatch: Dispatch
) => {
  axios
    .post("/api/users/register", userData)
    .then(result => history.push("/login"))
    .catch(err =>
      dispatch({
        payload: err.response.data,
        type: TypeKeys.GET_ERRORS
      })
    );
};

export const loginUser = (userData: ILogin) => (dispatch: Dispatch) => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // save to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        payload: err.response.data,
        type: TypeKeys.GET_ERRORS
      })
    );
};

export const setCurrentUser = (decode: any) => {
  return {
    payload: decode,
    type: TypeKeys.SET_CURRENT_USER
  };
};

export const logoutUser = () => (dispatch: Dispatch) => {
  // remove token from local storage
  localStorage.removeItem("jwtToken");

  // remove auth header for future requests
  const token: string = "";
  setAuthToken(token);

  // set current user to empty object
  dispatch(setCurrentUser({}));
};
