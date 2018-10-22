import validator from "validator";
import { isEmpty } from "./is-empty";

type ILogin = {
  email: string;
  password: string;
};

export const validateLogin = (data: ILogin) => {
  let errors = {} as ILogin;

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
