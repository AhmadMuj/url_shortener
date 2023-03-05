import createHttpError from "http-errors";
import Validator from "validatorjs";
import { RequestBody } from "../types";

export const validate_body = (
  body: RequestBody,
  validationSchema: Validator.Rules
): { [key: string]: any } => {
  let validation = new Validator(body, validationSchema);
  if (validation.fails()) {
    let errors: string[] = [];
    const errorsObject = validation.errors.errors;
    Object.keys(errorsObject).forEach((item) => {
      errors.push(errorsObject[item][0].slice(0, -1));
    });
    throw new createHttpError.BadRequest(errors.join(", "));
  }
  let validated: RequestBody = {};
  Object.keys(validationSchema).forEach((item) => {
    if (body[item] !== undefined) {
      validated[item] = body[item];
    }
  });
  return validated;
};

export const login_validation = (body: RequestBody) => {
  return validate_body(body, {
    username: "required|string",
    password: "required|string",
  });
};

export const register_validation = (body: RequestBody) => {
  return validate_body(body, {
    username: "required|string",
    password: "required|string|min:5",
  });
};

export const shorten_validation = (body: RequestBody) => {
  return validate_body(body, {
    url: "required|url",
    id: "string|not_in:api,auth,urls,visits,redirect",
  });
};

export const shorten_update_validation = (body: RequestBody) => {
  return validate_body(body, {
    url: "required|url",
  });
};
