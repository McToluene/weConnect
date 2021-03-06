import validator from "validator";
import { isEmpty } from "./is-empty";

type IPost = {
  text: string;
};

export const validatePost = (data: IPost) => {
  let errors = {} as IPost;

  data.text = !isEmpty(data.text) ? data.text : "";

  if (!validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = "Post must be between 10 and 300 characters";
  }

  if (validator.isEmpty(data.text)) {
    errors.text = "Text field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
