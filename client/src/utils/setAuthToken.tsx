import axios from "axios";
import { isEmpty } from "src/validation/is-empty";

const setAuthToken = (token: string) => {
  if (!isEmpty(token)) {
    axios.defaults.headers.common.Authorization = token;
  } else {
    delete axios.defaults.headers.Authorization;
  }
};

export default setAuthToken;
