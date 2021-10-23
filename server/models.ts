import { User } from "~/models/user";
import { Example } from "~/models/example";

const option = { alter: true };

export const initModel = async () => {
  await User.sync(option);
  await Example.sync(option);
};
