import { User, IUser } from "~/models/user";

export class UserDAL {
  async create(values: IUser) {
    try {
      const payload = {
        name: values.name,
      };
      const res = await User.create(payload);
      return [res, undefined];
    } catch (err) {
      return [undefined, err];
    }
  }

  async getAll(options: object = {}) {
    try {
      const res = await User.findOne(options);
      return [res, undefined];
    } catch (err) {
      return [undefined, err];
    }
  }

  async get(id: number) {
    try {
      const res = await User.findOne({
        where: { id },
      });
      return [res, undefined];
    } catch (err) {
      return [undefined, err];
    }
  }

  async getWithOptions(options: object = {}) {
    try {
      const res = await User.findOne(options);
      return [res, undefined];
    } catch (err) {
      return [undefined, err];
    }
  }

  async update(id: number, values: IUser) {
    try {
      const payload = {
        name: values.name,
      };
      const res = await User.update(payload, {
        where: {
          id,
        },
      });
      return [res, undefined];
    } catch (err) {
      return [undefined, err];
    }
  }

  async delete(id: number) {
    try {
      const res = await User.destroy({
        where: { id },
      });
      return [res, undefined];
    } catch (err) {
      return [undefined, err];
    }
  }
}
