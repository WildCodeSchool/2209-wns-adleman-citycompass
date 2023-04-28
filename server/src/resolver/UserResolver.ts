import { Arg, Mutation, Resolver, Query, Authorized, Ctx } from "type-graphql";
import User, { UserInput, UserUpdate, UserLogin } from "../entity/User";
import datasource from "../db";
import { existingUser } from "../helpers/dbCheckers";
import {
  hashPassword,
  verifyPassword,
  getSafeAttributes,
} from "../helpers/hashing";
import jwt from "jsonwebtoken";
import { env } from "../env";
import { ContextType } from "../index";

@Resolver(User)
export class UserResolver {
  @Mutation(() => User)
  async createUser(@Arg("data") data: UserInput): Promise<User> {
    if (data === null) throw new Error("No data in query");
    // check if user email is already in database
    await existingUser(data);

    const hashedPassword = await hashPassword(data.password);
    return await datasource
      .getRepository(User)
      .save({ ...data, hashedPassword });
  }

  @Mutation(() => String)
  async login(
    @Arg("data") data: UserLogin,
    @Ctx() ctx: ContextType
  ): Promise<String> {
    const user = await datasource
      .getRepository(User)
      .findOne({ where: { email: data.email } });

    if (
      user === null ||
      !(await verifyPassword(data.password, user.hashedPassword))
    )
      throw new Error("Invalid credentials");

    const token = jwt.sign({ userID: user.id }, env.JWT_PRIVATE_KEY);

    ctx.res.cookie("token", token, {
      secure: env.NODE_ENV === "production",
      domain: env.SERVER_HOST,
      httpOnly: true,
    });

    return token;
  }

  @Mutation(() => String)
  async logout(@Ctx() ctx: ContextType): Promise<string> {
    ctx.res.clearCookie("token");
    return "OK";
  }

  @Mutation(() => User)
  async updateUser(
    @Arg("email") emailFind: string,
    @Arg("data") data: UserUpdate
  ): Promise<User> {
    const { firstname, lastname, picture, password, role } = data;

    const userToUpdate = await datasource.getRepository(User).findOne({
      where: { email: emailFind },
    });
    if (userToUpdate === null) throw new Error("User not found");

    if (lastname !== undefined) {
      userToUpdate.lastname = lastname;
    }
    if (firstname !== undefined) {
      userToUpdate.firstname = firstname;
    }
    if (password !== undefined) {
      userToUpdate.hashedPassword = password;
    }
    if (picture !== undefined) {
      userToUpdate.picture = picture;
    }
    if (role !== undefined) {
      userToUpdate.role = role;
    }

    await datasource.getRepository(User).save(userToUpdate);

    return userToUpdate;
  }

  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return await datasource
      .getRepository(User)
      .find({ relations: { cities: true } });
  }

  @Query(() => User)
  async getOneUserbyMail(@Arg("email") email: string): Promise<User> {
    const userToFind = await datasource.getRepository(User).findOne({
      where: { email },
    });
    if (userToFind === null) throw new Error("user not found");

    return userToFind;
  }

  @Authorized()
  @Query(() => User)
  async profile(@Ctx() ctx: ContextType): Promise<User> {
    return getSafeAttributes(ctx.currentUser as User);
  }
}
