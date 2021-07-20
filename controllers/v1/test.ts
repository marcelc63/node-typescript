import KoaRouter from "koa-router";
import { isObject, isString } from "validata";
import { body, Statuses, validate } from "validata-koa";

import { UserDAL } from "~/dal/user";
import { IUser } from "~/models/user";
const userDAL = new UserDAL();

import { TestClient } from "~/clients/test/api";
const testClient = new TestClient();

const Create = isObject<{
  name: string;
}>({
  name: isString(),
});
const create = async (ctx: any) => {
  const { name } = body(ctx, Create);

  const params: IUser = {
    name,
  };
  let [user, _] = await userDAL.create(params);

  let [resTest, _resErrTest] = await testClient.test({
    keyword: "essential oil",
  });

  if (user) {
    ctx.response.status = Statuses.OK;
  } else {
    ctx.response.status = Statuses.BAD_REQUEST;
  }
};

// Inject Router
export const initTestController = async (router: KoaRouter) => {
  router.post("/v1/tracker", validate(), create);
};
