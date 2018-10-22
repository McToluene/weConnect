import { any } from "prop-types";
import { AnyAction } from "redux";
import { TypeKeys } from "src/actions/types";

const initialState = {
  errors: {}
};

const myAction: AnyAction = {
  payload: any,
  type: TypeKeys
};

export default function errorReducer(state = initialState, action = myAction) {
  switch (action.type) {
    case TypeKeys.GET_ERRORS:
      return action.payload;
    case TypeKeys.CLEAR_ERRORS:
      return {};
    default:
      return state;
  }
}
