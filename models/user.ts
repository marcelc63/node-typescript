import { Sequelize, DataTypes, Model } from "sequelize";
import { db } from "~/server/database";
const sequelize: Sequelize = db.sequelize;
import bcrypt from "bcrypt";

export interface IUser {
  name: string;
  email: string;
  phone: string;
  password: string;
  group: string;
}

export class User extends Model {
  static async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(8);
    return bcrypt.hash(password, salt);
  }
}

User.init(
  {
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    group: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    paranoid: true,
    modelName: "User",
    indexes: [{ unique: true, fields: ["email"] }],
  }
);
