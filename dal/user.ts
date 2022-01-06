import { User as Model, IUser as IModel } from "~/models/user";

export class UserDAL {
  async create(values: IModel): Promise<[any | undefined, any | undefined]> {
    try {
      const payload = {
        name: values.name,
      };
      const res = await Model.create(payload);
      return [res, undefined];
    } catch (err) {
      return [undefined, err];
    }
  }

  async getAll(
    options: object = {}
  ): Promise<[any | undefined, any | undefined]> {
    try {
      const res = await Model.findOne(options);
      return [res, undefined];
    } catch (err) {
      return [undefined, err];
    }
  }

  async get(id: number): Promise<[any | undefined, any | undefined]> {
    try {
      const res = await Model.findOne({
        where: { id },
      });
      return [res, undefined];
    } catch (err) {
      return [undefined, err];
    }
  }

  async getWithOptions(
    options: object = {}
  ): Promise<[any | undefined, any | undefined]> {
    try {
      const res = await Model.findOne(options);
      return [res, undefined];
    } catch (err) {
      return [undefined, err];
    }
  }

  async update(
    id: number,
    values: IModel
  ): Promise<[any | undefined, any | undefined]> {
    try {
      const payload = {
        name: values.name,
      };
      const res = await Model.update(payload, {
        where: {
          id,
        },
      });
      return [res, undefined];
    } catch (err) {
      return [undefined, err];
    }
  }

  async delete(id: number): Promise<[any | undefined, any | undefined]> {
    try {
      const res = await Model.destroy({
        where: { id },
      });
      return [res, undefined];
    } catch (err) {
      return [undefined, err];
    }
  }
}
