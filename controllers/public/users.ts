import KoaRouter from "koa-router";
import { isObject, isString } from "validata";
import { body, Statuses, validate } from "validata-koa";

import { UserDAL } from "~/dal/user";
import { IUser } from "~/models/user";
const userDAL = new UserDAL();

const Create = isObject<{
  name: string;
  email: string;
  phone: string;
  password: string;
}>({
  name: isString(),
  email: isString(),
  phone: isString(),
  password: isString(),
});
const create = async (ctx: any) => {
  const { name, email, phone, password } = body(ctx, Create);

  const params: IUser = {
    name,
    email,
    phone,
    password,
    group: "member",
  };
  let [user, _] = await userDAL.create(params);

  if (user) {
    ctx.response.status = Statuses.OK;
  } else {
    ctx.response.status = Statuses.BAD_REQUEST;
  }
};

// Inject Router
export const initUserController = async (router: KoaRouter) => {
  router.post("/api/public/users", validate(), create);
};
