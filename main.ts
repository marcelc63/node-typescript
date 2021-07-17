import dotenv from "dotenv";
dotenv.config();

import Koa from "koa";
import bodyParser from "koa-bodyparser";

import { router } from "~/controllers/v1/root";
import { initDB } from "~/server/database";
import { initModel } from "~/server/models";

const port = process.env.APP_PORT || 8002;

const main = async () => {
  await initDB();
  await initModel();

  const app = new Koa();
  app.use(bodyParser());
  app.use(router.routes());

  app.listen(port);
  console.log(`Connected to port:${port}`);
};

main();
