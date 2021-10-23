import { User, IUser } from "~/models/user";

export class UserDAL {
  async create(values: IUser): Promise<[any | undefined, any | undefined]> {
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

  async getAll(
    options: object = {}
  ): Promise<[any | undefined, any | undefined]> {
    try {
      const res = await User.findOne(options);
      return [res, undefined];
    } catch (err) {
      return [undefined, err];
    }
  }

  async get(id: number): Promise<[any | undefined, any | undefined]> {
    try {
      const res = await User.findOne({
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
      const res = await User.findOne(options);
      return [res, undefined];
    } catch (err) {
      return [undefined, err];
    }
  }

  async update(
    id: number,
    values: IUser
  ): Promise<[any | undefined, any | undefined]> {
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

  async delete(id: number): Promise<[any | undefined, any | undefined]> {
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
