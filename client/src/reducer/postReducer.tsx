import { any } from "prop-types";
import { AnyAction } from "redux";
import { TypeKeys } from "src/actions/types";

const initialState = {
  loading: false,
  post: {},
  posts: []
};

const myAction: AnyAction = {
  payload: any,
  type: TypeKeys
};

export default function postReducer(state = initialState, action = myAction) {
  switch (action.type) {
    case TypeKeys.POST_LOADING:
      return {
        ...state,
        loading: true
      };
    case TypeKeys.GET_POSTS:
      return {
        ...state,
        loading: false,
        posts: action.payload
      };

    case TypeKeys.GET_POST:
      return {
        ...state,
        loading: false,
        post: action.payload
      };
    case TypeKeys.ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    case TypeKeys.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post: any) => post._id !== action.payload)
      };
    default:
      return state;
  }
}
