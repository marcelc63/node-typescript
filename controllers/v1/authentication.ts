import KoaRouter from "koa-router";
import { Statuses } from "validata-koa";
import { UserDAL } from "~/dal/user";

const userDAL = new UserDAL();

const logout = async (ctx: any) => {
  ctx.response.status = Statuses.OK;
  ctx.response.body = { msg: "Successfully Logged Out" };
  ctx.cookies.set("token", "");
};

const check = async (ctx: any) => {
  const user: any = await userDAL.get(ctx.state.user.id);
  if (user) {
    ctx.response.status = Statuses.OK;
    ctx.response.body = {
      msg: "You're authenticated",
      user: {
        createdAt: user.createdAt,
        id: user.id,
        name: user.name,
      },
    };
    return;
  }

  return Statuses.NOT_FOUND;
};

//Inject Routes
export function initAuthController(router: KoaRouter) {
  router.post("/api/v1/logout", logout).get("/api/v1/check", check);
}
