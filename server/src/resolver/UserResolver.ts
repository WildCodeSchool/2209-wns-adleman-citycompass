import {
  Arg,
  Mutation,
  Resolver,
  Query,
  Authorized,
  Ctx,
  Int,
} from "type-graphql";
import User, {
  UserInput,
  UserUpdate,
  UserLogin,
  UserRoleUpdate,
  UserManagedCityUpdate,
  UserRoles,
} from "../entity/User";
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
import City from "../entity/City";

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
    const { firstname, lastname, picture, password, email } = data;
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

    if (email !== userToUpdate.email) {
      await existingUser(data);
    }

    if (email !== undefined) {
      userToUpdate.email = email;
    }

    if (password !== undefined) {
      userToUpdate.password = password;
    }
    if (picture !== undefined) {
      userToUpdate.picture = picture;
    }

    await datasource.getRepository(User).save(userToUpdate);

    return userToUpdate;
  }

  @Authorized(["superadmin", "admin"])
  @Mutation(() => User)
  async updateUserRole(
    @Arg("data") data: UserRoleUpdate,
    @Arg("id", () => Int) id: number,
    @Ctx() ctx: ContextType
  ): Promise<User> {
    const { role } = data;
    const currentUser = ctx.currentUser;

    // check datas sent
    if (role !== undefined && !UserRoles.includes(role))
      throw new Error("this is not an existing role");
    if (currentUser === undefined) throw new Error("unauthorized operation");

    // check if currentUser is authorized to update role
    // only superadmins can give superadmin & admin role to an user
    if (
      currentUser.role !== "superadmin" &&
      (role === "superadmin" || role === "admin")
    )
      throw new Error("Only superadmin can give this role");

    // get and check user to update
    const userToUpdate = await datasource.getRepository(User).findOne({
      where: { id },
    });
    if (userToUpdate === null) throw new Error("User not found");
    if (currentUser.id === userToUpdate.id)
      throw new Error("User cannot change his own role");

    // update user role
    if (role !== undefined) userToUpdate.role = role;
    await datasource.getRepository(User).save(userToUpdate);

    return userToUpdate;
  }

  @Authorized(["superadmin", "admin"])
  @Mutation(() => User)
  async updateManagedCities(
    @Arg("data") data: UserManagedCityUpdate,
    @Arg("userId", () => Int) id: number,
    @Ctx() ctx: ContextType
  ): Promise<User> {
    const currentUserId = ctx.jwtPayload.userID;
    const { managedCitiesNames } = data;

    if (managedCitiesNames === undefined)
      throw new Error("Managed cities in data are undefined");

    const uniqueManagedCityId = [...new Set(managedCitiesNames)];

    const currentUser = await datasource.getRepository(User).findOne({
      where: { id: currentUserId },
    });
    if (currentUser === null) throw new Error("current user not found");

    const userToUpdate = await datasource.getRepository(User).findOne({
      where: { id },
      relations: { managedCities: true },
    });
    if (userToUpdate === null) throw new Error("User to update not found");

    if (userToUpdate.id === currentUser.id && currentUser.role === "admin")
      throw new Error("You are not allowed to modify your own managed cities");

    const managedCities: City[] = [];

    uniqueManagedCityId.map(async (name) => {
      const cityFound = await datasource
        .getRepository(City)
        .findOne({ where: { name } });
      if (cityFound !== null) managedCities.push(cityFound);
    });

    if (managedCities !== undefined) userToUpdate.managedCities = managedCities;

    await datasource.getRepository(User).save(userToUpdate);

    return userToUpdate;
  }

  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return await datasource
      .getRepository(User)
      .find({ relations: { managedCities: true, managedPlaces: true } });
  }

  @Query(() => User)
  async getUserManagedCities(@Arg("userId") id: number): Promise<User> {
    const userToFind = await datasource
      .getRepository(User)
      .findOne({ relations: { managedCities: true }, where: { id } });
    if (userToFind === null) throw new Error("user not found");

    return userToFind;
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
