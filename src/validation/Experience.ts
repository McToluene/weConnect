import validator from "validator";
import { isEmpty } from "./is-empty";

type IExperience = {
  title: string;
  company: string;
  location?: string;
  from: string;
  to?: string;
  current?: string;
  description?: string;
};

export const validateExperience = (data: IExperience) => {
  let errors = {} as IExperience;

  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (validator.isEmpty(data.title)) {
    errors.title = "Job title field is required";
  }

  if (validator.isEmpty(data.company)) {
    errors.company = "Company field is required";
  }

  if (validator.isEmpty(data.from)) {
    errors.from = "From date field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
