import createHttpError from "http-errors";
import { comparePassword, hashPassword } from "../config/encryption";
import knex from "../config/knex";
import { User } from "../types";
import { generateUserToken } from "../config/jwt";
import { RequestBody } from "../types/index";
import { register_validation, login_validation } from "./validations";

export const get_user = async (username: string) =>
  knex("users").whereRaw(`LOWER(username) = LOWER(?)`, [username]).first();

export const register = async (body: RequestBody) => {
  const { username, password } = register_validation(body);
  // Check if username already exists
  let user: Partial<User> | undefined = await get_user(username);
  if (user) {
    throw new createHttpError.BadRequest("Username already exists");
  }
  user = (
    await knex("users").insert(
      { username, password: await hashPassword(password) },
      ["id", "username"]
    )
  )[0];
  const token = await generateUserToken({
    id: user?.id,
  });
  return {
    user,
    token,
  };
};

export const login = async (body: RequestBody) => {
  const { username, password } = login_validation(body);

  if (!username || !password) {
    throw new createHttpError.BadRequest("Missing username or password");
  }
  let user: User | undefined = await get_user(username);

  if (!user) {
    throw new createHttpError.Unauthorized(
      "username or password are incorrect"
    );
  }
  const passwordMatch = await comparePassword(password, user.password);
  if (!passwordMatch) {
    throw new createHttpError.Unauthorized(
      "username or password are incorrect"
    );
  }
  const token = await generateUserToken({
    id: user.id,
  });
  return {
    user: {
      id: user.id,
      username: user.username,
    },
    token,
  };
};
