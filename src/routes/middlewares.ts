import { RouterContext } from "@koa/router";
import createHttpError from "http-errors";
import { Next } from "koa";
import { validateJWT } from "../config/jwt";

export const requireAuthHandler = async (ctx: RouterContext, next: Next) => {
  const current_token = ctx.request.headers.authorization;
  if (!current_token) {
    throw new createHttpError.Unauthorized("Please provide a token");
  }
  const jwt_content: any = await validateJWT(current_token.split(" ")[1]);
  if (!jwt_content.id) {
    throw new createHttpError.Unauthorized("Invalid User Token");
  }
  ctx.state.user_id = jwt_content.id;
  await next();
};
