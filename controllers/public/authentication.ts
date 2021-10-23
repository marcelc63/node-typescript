import KoaRouter from "koa-router";
import { isObject, isString } from "validata";
import { body, Statuses, validate } from "validata-koa";
import { AuthDAL } from "~/dal/auth";

const authDAL = new AuthDAL();

const Login = isObject<{
  email: string;
  password: string;
}>({
  email: isString(),
  password: isString(),
});
const login = async (ctx: any) => {
  const { email, password } = body(ctx, Login);

  const [jwt, user] = await authDAL.login(email, password);
  if (!jwt) {
    ctx.response.status = Statuses.BAD_REQUEST;
    ctx.response.body = { msg: "Email atau Password salah" };
    return;
  }

  delete (user as any).password;

  ctx.response.status = Statuses.OK;
  ctx.response.body = {
    msg: "Berhasil Login",
    user,
  };
  ctx.cookies.set("token", jwt as string);
};

//Inject Routes
export function initAuthController(router: KoaRouter) {
  router.post("/api/public/login", validate(), login);
}
