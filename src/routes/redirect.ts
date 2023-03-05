import Router from "@koa/router";
import { resolve_url } from "../services/urls";

const redirect_router = new Router();

redirect_router.get("/:id", async (ctx) => {
  ctx.redirect(await resolve_url(ctx.params.id, ctx.request.ip));
});

export default redirect_router;
