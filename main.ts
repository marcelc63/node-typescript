import dotenv from "dotenv";

import Koa from "koa";
import bodyParser from "koa-bodyparser";

import { router } from "~/controllers/v1/root";
import { initDB } from "~/server/database";
import { initModel } from "~/server/models";

dotenv.config();
const app = new Koa();

const port = process.env.APP_PORT || 8002;

const main = async () => {
  await initDB();
  await initModel();

  app.use(bodyParser());
  app.use(router.routes());

  app.listen(port);
  console.log(`Connected to port:${port}`);
};

main();
