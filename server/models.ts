import { User } from "~/models/User";

export const initModel = async () => {
  await User.sync({ alter: true });
};
