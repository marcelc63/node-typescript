import KoaRouter from "koa-router";

export const router = new KoaRouter();

router
  .get("/", async (context) => {
    context.response.body = "Running!";
  });
