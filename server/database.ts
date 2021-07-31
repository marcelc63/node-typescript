import { DB_DATABASE, DB_HOST, DB_PASS, DB_USER, APP_ENV } from "~/config";
import { Sequelize } from "sequelize";

export const db: { sequelize: Sequelize } = {
  sequelize: new Sequelize(DB_DATABASE, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: "mysql",
    logging: ((): boolean => {
      return APP_ENV === "local";
    })(),
  }),
};

export const initDB = async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (err) {
    console.log(`Unable to connect to the database: ${err}`);
  }
};
