import { Example as Model, IExample as IModel } from "~/models/example";

export class ExampleDAL {
  async create(values: IModel): Promise<[any | undefined, any | undefined]> {
    try {
      const res = await Model.create(values);
      return [res, undefined];
    } catch (err) {
      return [undefined, err];
    }
  }

  async getAll(
    options: object = {}
  ): Promise<[any | undefined, any | undefined]> {
    try {
      const res = await Model.findAll(options);
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
      await Model.update(values, {
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
      await Model.destroy({
        where: { id },
      });
      return [res, undefined];
    } catch (err) {
      return [undefined, err];
    }
  }
}
