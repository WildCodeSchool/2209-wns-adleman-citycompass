import { argon2id, hash, verify } from "argon2";
import User from "../entity/User";

const hashingOptions = {
  memoryCost: 2 ** 16,
  timeCost: 5,
  type: argon2id,
};

export const hashPassword = async (plainPassword: string): Promise<string> =>
  // eslint-disable-next-line @typescript-eslint/return-await
  await hash(plainPassword, hashingOptions);

export const verifyPassword = async (
  plainPassword: string,
  password: string
): Promise<boolean> =>
  // eslint-disable-next-line @typescript-eslint/return-await
  await verify(password, plainPassword, hashingOptions);

export const getSafeAttributes = (user: User): User => ({
  ...user,
  password: "",
});
