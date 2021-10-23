import KoaRouter from "koa-router";
import { isObject, isString } from "validata";
import { body, params, Statuses, validate } from "validata-koa";
import { slugify } from "~/lib/common";

import { ExampleDAL } from "~/dal/example";
import { IExample } from "~/models/example";
const exampleDAL = new ExampleDAL();

const Create = isObject<{
  name: string;
}>({
  name: isString(),
});
const create = async (ctx: any) => {
  const { name } = body(ctx, Create);

  const params: IExample = {
    name,
    slug: slugify(name),
  };
  let [res, _] = await exampleDAL.create(params);

  if (res) {
    ctx.response.status = Statuses.OK;
    ctx.response.body = res;
  } else {
    ctx.response.status = Statuses.BAD_REQUEST;
  }
};

const getAll = async (ctx: any) => {
  let [res, _] = await exampleDAL.getAll();

  if (res) {
    ctx.response.status = Statuses.OK;
    ctx.response.body = res;
  } else {
    ctx.response.status = Statuses.BAD_REQUEST;
  }
};

const Get = isObject<{
  example_id: string;
}>({
  example_id: isString(),
});
const get = async (ctx: any) => {
  const { example_id: id } = params(ctx, Get);

  let [res, _] = await exampleDAL.get(parseInt(id));

  if (res) {
    ctx.response.status = Statuses.OK;
    ctx.response.body = res;
  } else {
    ctx.response.status = Statuses.BAD_REQUEST;
  }
};

const Update = isObject<{
  name: string;
}>({
  name: isString(),
});
const UpdateParams = isObject<{
  example_id: string;
}>({
  example_id: isString(),
});
const update = async (ctx: any) => {
  const { name } = body(ctx, Update);
  const { example_id: id } = params(ctx, UpdateParams);

  const payload: IExample = {
    name,
    slug: slugify(name),
  };
  let [res, _] = await exampleDAL.update(parseInt(id), payload);

  if (res) {
    ctx.response.status = Statuses.OK;
    ctx.response.body = res;
  } else {
    ctx.response.status = Statuses.BAD_REQUEST;
  }
};

const Remove = isObject<{
  example_id: string;
}>({
  example_id: isString(),
});
const remove = async (ctx: any) => {
  const { example_id: id } = params(ctx, Remove);

  let [res, _] = await exampleDAL.delete(parseInt(id));

  if (res) {
    ctx.response.status = Statuses.OK;
    ctx.response.body = res;
  } else {
    ctx.response.status = Statuses.BAD_REQUEST;
  }
};

// Inject Router
export const initExampleController = async (router: KoaRouter) => {
  router
    .post("/api/v1/example", validate(), create)
    .get("/api/v1/example", validate(), getAll)
    .get("/api/v1/example/:example_id", validate(), get)
    .patch("/api/v1/example/:example_id", validate(), update)
    .delete("/api/v1/example/:example_id", validate(), remove);
};
