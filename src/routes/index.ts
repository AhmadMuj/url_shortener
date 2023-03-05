import Router from "@koa/router";
import auth_router from "./auth";
import urls_router from "./urls";
import visits_router from "./visits";
import { requireAuthHandler } from "./middlewares";
import redirect_router from "./redirect";

const router = new Router();

router.use("/auth", auth_router.routes(), auth_router.allowedMethods());

router.use(
  "/urls",
  requireAuthHandler,
  urls_router.routes(),
  urls_router.allowedMethods()
);

router.use(
  "/visits",
  requireAuthHandler,
  visits_router.routes(),
  visits_router.allowedMethods()
);

router.use(redirect_router.routes(), redirect_router.allowedMethods());

export default router;
