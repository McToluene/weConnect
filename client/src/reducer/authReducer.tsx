import { any } from "prop-types";
import { AnyAction } from "redux";
import { TypeKeys } from "src/actions/types";
import { isEmpty } from "src/validation/is-empty";

const initialState = {
  isAuthenticated: false,
  user: {}
};

const myAction: AnyAction = {
  payload: any,
  type: TypeKeys
};

export default function authReducer(state = initialState, action = myAction) {
  switch (action.type) {
    case TypeKeys.SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
}
