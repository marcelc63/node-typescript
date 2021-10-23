import KoaRouter from "koa-router";
import { initAuthController } from "~/controllers/public/authentication";
import { initUserController } from "~/controllers/public/users";

export const router = new KoaRouter();

router.get("/", async (context) => {
  context.response.body = "Running!";
});

initAuthController(router);
initUserController(router);
