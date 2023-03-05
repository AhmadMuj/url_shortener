import Router from "@koa/router";
import { get_last_visits, get_visit_stats_by_url } from "../services/visits";

const visits_router = new Router();

visits_router
  .get("/", async (ctx) => {
    ctx.response.body = await get_last_visits(
      ctx.state.user_id,
      Number(ctx.request.query.limit),
      Number(ctx.request.query.offset)
    );
  })
  .get("/:id", async (ctx) => {
    ctx.response.body = await get_visit_stats_by_url(
      ctx.params.id,
      ctx.state.user_id,
      Number(ctx.request.query.limit),
      Number(ctx.request.query.offset)
    );
  });

export default visits_router;
