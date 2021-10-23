import KoaRouter from "koa-router";
import { initAuthController } from "~/controllers/v1/authentication";
import { initImagesController } from "~/controllers/v1/images";

export const router = new KoaRouter();

initAuthController(router);
initImagesController(router);
