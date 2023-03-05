import "dotenv/config";
import Koa from "koa";
import cors from "@koa/cors";
import helmet from "koa-helmet";
import bodyParser from "koa-bodyparser";
import createHttpError from "http-errors";
import router from "./routes";
import { onDatabaseConnect } from "./helpers/knex";

const app = new Koa();

app.use(cors());
app.use(helmet());
app.use(bodyParser());
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (e: any) {
    // This is an exception that I didn't throw in the application
    if (!createHttpError.isHttpError(e)) {
      console.log(e);
    }
    ctx.response.status = e.status || 500;
    ctx.response.body = {
      message: e.message || "Internal Server Error",
    };
  }
});

app.use(router.routes()).use(router.allowedMethods());

onDatabaseConnect().then(async () => {
  app.listen({ port: process.env.PORT }, () =>
    console.log(`Listening to port ${process.env.PORT}`)
  );
});
