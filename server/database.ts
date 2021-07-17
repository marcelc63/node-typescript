import { Sequelize } from "sequelize";

export const db: { sequelize: Sequelize } = {
  sequelize: new Sequelize("datapinter_tracker", "root", "", {
    host: "localhost",
    dialect: "mysql",
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
