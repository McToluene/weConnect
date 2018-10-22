import { any } from "prop-types";
import { AnyAction } from "redux";
import { TypeKeys } from "src/actions/types";

const initialState = {
  loading: false,
  profile: null,
  profiles: null
};

const myAction: AnyAction = {
  payload: any,
  type: TypeKeys
};

export default function profileReducer(
  state = initialState,
  action = myAction
) {
  switch (action.type) {
    case TypeKeys.PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };

    case TypeKeys.GET_PROFILES:
      return {
        ...state,
        loading: false,
        profiles: action.payload
      };

    case TypeKeys.GET_PROFILE:
      return {
        ...state,
        loading: false,
        profile: action.payload
      };

    case TypeKeys.CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };

    default:
      return state;
  }
}
