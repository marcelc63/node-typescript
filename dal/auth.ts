import bcrypt from "bcrypt";
import { User } from "~/models/user";
import { JWT } from "~/coordinators/jwt";

export class AuthDAL {
  async login(email: string, password: string) {
    const user: any = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password as string))) {
      return [false, null];
    }
    const jwt = await JWT.generate(user.id as any);
    return [jwt, user];
  }
}
