import { Example, IExample } from "~/models/example";

export class ExampleDAL {
  async create(values: IExample): Promise<[any | undefined, any | undefined]> {
    try {
      const res = await Example.create(values);
      return [res, undefined];
    } catch (err) {
      return [undefined, err];
    }
  }

  async getAll(
    options: object = {}
  ): Promise<[any | undefined, any | undefined]> {
    try {
      const res = await Example.findAll(options);
      return [res, undefined];
    } catch (err) {
      return [undefined, err];
    }
  }

  async get(id: number): Promise<[any | undefined, any | undefined]> {
    try {
      const res = await Example.findOne({
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
      const res = await Example.findOne(options);
      return [res, undefined];
    } catch (err) {
      return [undefined, err];
    }
  }

  async update(
    id: number,
    values: IExample
  ): Promise<[any | undefined, any | undefined]> {
    try {
      await Example.update(values, {
        where: {
          id,
        },
      });
      const [res, _] = await this.get(id);
      return [res, undefined];
    } catch (err) {
      return [undefined, err];
    }
  }

  async delete(id: number): Promise<[any | undefined, any | undefined]> {
    try {
      const [res, _] = await this.get(id);
      await Example.destroy({
        where: { id },
      });
      return [res, undefined];
    } catch (err) {
      return [undefined, err];
    }
  }
}
