import Router from "@koa/router";
import { login, register } from "../services/auth";
import { RequestBody } from "../types/index";

const auth_router = new Router();

auth_router
  .post("/login", async (ctx) => {
    ctx.response.body = await login(ctx.request.body as RequestBody);
  })
  .post("/register", async (ctx) => {
    ctx.response.body = await register(ctx.request.body as RequestBody);
  });

export default auth_router;
