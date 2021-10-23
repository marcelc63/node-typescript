import Koa from "koa";
import bodyParser from "koa-bodyparser";
import cors from "koa-cors";
import jwt from "koa-jwt";
import { JWT_SECRET, BASE_FRONTEND_URL } from "~/config";
import { router as publicRouter } from "~/controllers/public";
import { router as protectedRouter } from "~/controllers/v1";

export const initRouter = async (app: Koa) => {
  app.use(
    cors({
      origin: BASE_FRONTEND_URL,
      credentials: true,
      methods: ["GET", "POST", "PATCH", "DELETE"],
    })
  );
  app.use(bodyParser());
  app.use(publicRouter.routes());
  app.use(publicRouter.allowedMethods());
  // Custom 401 handling if you don't want to expose koa-jwt errors to users
  app.use(async (ctx, next) => {
    return next().catch((err) => {
      if (401 == err.status) {
        ctx.status = 401;
        ctx.body =
          "Protected resource, use Authorization header to get access\n";
      } else {
        throw err;
      }
    });
  });
  app.use(jwt({ secret: JWT_SECRET, cookie: "token" }));
  app.use(protectedRouter.routes());
  app.use(protectedRouter.allowedMethods());
  app.on("error", (err) => {
    console.log("ERROR", err);
  });
};
