import Koa from "koa";
import bodyParser from "koa-bodyparser";

import { router as publicRouter } from "~/controllers/v1";

export const initRouter = async (app: Koa) => {
  app.use(bodyParser());
  app.use(publicRouter.routes());
};
