import jwt from "jsonwebtoken";
import { JWT_SECRET } from "~/config";

export async function generate(id: any) {
  const payload = {
    id,
  };
  return await jwt.sign(payload, JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: 60000,
  });
}

export const JWT = {
  generate,
};
