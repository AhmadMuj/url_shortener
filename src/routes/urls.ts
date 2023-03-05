import Router from "@koa/router";
import {
  resolve_url,
  shorten,
  update_url,
  delete_url,
  get_urls,
} from "../services/urls";
import { requireAuthHandler } from "./middlewares";
import { RequestBody } from "../types/index";

const urls_router = new Router();

urls_router
  .get("/", async (ctx) => {
    ctx.response.body = await get_urls(ctx.state.user_id);
  })
  .post("/", async (ctx) => {
    ctx.response.body = await shorten(
      ctx.request.body as RequestBody,
      ctx.state.user_id
    );
  })
  .put("/:id", async (ctx) => {
    ctx.response.body = await update_url(
      ctx.params.id,
      ctx.state.user_id,
      ctx.request.body
    );
  })
  .delete("/:id", async (ctx) => {
    ctx.response.body = await delete_url(ctx.params.id, ctx.state.user_id);
  });

export default urls_router;
