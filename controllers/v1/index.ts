import KoaRouter from "koa-router";
import { initTestController } from "~/controllers/v1/test";

export const router = new KoaRouter();

router.get("/", async (context) => {
  context.response.body = "Running!";
});

initTestController(router);
