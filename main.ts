import Koa from "koa";
const app = new Koa();
import { router } from "~/controllers/v1/root";

app.use(router.routes());

app.listen(3000);
console.log("his");
