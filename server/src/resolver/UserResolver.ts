import {
  Arg,
  Mutation,
  Resolver,
  Query,
  Authorized,
  Ctx,
  Int,
} from "type-graphql";
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

    const password = await hashPassword(data.password);
    return await datasource.getRepository(User).save({ ...data, password });
  }

  @Mutation(() => String)
  async login(
    @Arg("data") data: UserLogin,
    @Ctx() ctx: ContextType
  ): Promise<String> {
    const user = await datasource
      .getRepository(User)
      .findOne({ where: { email: data.email } });

    if (user === null || !(await verifyPassword(data.password, user.password)))
      throw new Error("Invalid credentials");

    const token = jwt.sign({ userID: user.id }, env.JWT_PRIVATE_KEY);

    ctx.res.cookie("token", token, {
      secure: env.NODE_ENV === "production",
      domain: env.SERVER_HOST,
      httpOnly: true,
    });

    return token;
  }

  @Authorized()
  @Mutation(() => String)
  async logout(@Ctx() ctx: ContextType): Promise<string> {
    ctx.res.clearCookie("token");
    return "OK";
  }

  @Authorized()
  @Mutation(() => User)
  async updateUser(
    @Arg("id", () => Int) id: number,
    @Arg("data") data: UserUpdate,
    @Ctx() ctx: ContextType
  ): Promise<User> {
    const { firstname, lastname, picture, password, role } = data;
    // get id of connected user from context, using JWT token
    const currentUserId = ctx.jwtPayload.userID;

    if (currentUserId !== id) {
      throw new Error("Update another user is not allowed");
    }

    const userToUpdate = await datasource.getRepository(User).findOne({
      where: { id },
    });
    if (userToUpdate === null) throw new Error("User not found");

    if (lastname !== undefined) {
      userToUpdate.lastname = lastname;
    }
    if (firstname !== undefined) {
      userToUpdate.firstname = firstname;
    }
    if (password !== undefined) {
      userToUpdate.password = password;
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
      .find({ relations: { managedCities: true } });
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
