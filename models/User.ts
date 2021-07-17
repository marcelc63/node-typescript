import { Sequelize, DataTypes, Model } from "sequelize";
import { db } from "~/server/database";
const sequelize = db.sequelize as Sequelize;

export class User extends Model {}

User.init(
  {
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);
