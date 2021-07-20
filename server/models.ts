import { User } from "~/models/user";

const option = { alter: true };

export const initModel = async () => {
  await User.sync(option);
};
