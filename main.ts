import dotenv from "dotenv";
dotenv.config();

import Koa from "koa";
import bodyParser from "koa-bodyparser";

import { router } from "~/controllers/v1";
import { initDB } from "~/server/database";
import { initModel } from "~/server/models";
import { initCron } from "~/server/cron";

const port = process.env.APP_PORT || 8000;

const main = async () => {
  await initDB();
  await initModel();
  await initCron();

  const app = new Koa();
  app.use(bodyParser());
  app.use(router.routes());

  app.listen(port);
  console.log(`Connected to port:${port}`);
};

main();
