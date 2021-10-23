import { Sequelize, DataTypes, Model } from "sequelize";
import { db } from "~/server/database";
const sequelize: Sequelize = db.sequelize;

export interface IExample {
  name: string;
  slug: string;
}

export class Example extends Model {}

Example.init(
  {
    name: {
      type: DataTypes.STRING,
    },
    slug: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    paranoid: true,
    modelName: "Example",
    indexes: [{ unique: true, fields: ["slug"] }],
  }
);
