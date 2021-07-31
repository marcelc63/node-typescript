import dotenv from "dotenv";
dotenv.config();

import Koa from "koa";
import { initRouter } from "~/controllers";
import { initDB } from "~/server/database";
import { initModel } from "~/server/models";
import { initCron } from "~/server/cron";

const port = process.env.APP_PORT || 8000;

const main = async () => {
  await initDB();
  await initModel();
  await initCron();

  const app = new Koa();
  await initRouter(app);

  app.listen(port);
  console.log(`Connected to port:${port}`);
};

main();
