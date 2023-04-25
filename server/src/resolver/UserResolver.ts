import { Arg, Mutation, Resolver, Query } from "type-graphql";
import User, { UserInput, UserUpdate } from "../entity/User";
import datasource from "../db";
import { existingUser } from "../helpers/dbCheckers";
import { hashPassword } from "../helpers/hashing";

@Resolver(User)
export class UserResolver {
  @Mutation(() => User)
  async createUser(@Arg("data") data: UserInput): Promise<User> {
    if (data === null)
      throw new Error("No data in query");
    // check if user email is already in database
    await existingUser(data);

    const hashedPassword = await hashPassword(data.password);
    return await datasource
      .getRepository(User)
      .save({ ...data, password: hashedPassword });
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
    if (userToUpdate === null)
      throw new Error("User not found");

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
      .find({ relations: { cities: true } });
  }

  @Query(() => User)
  async getOneUserbyMail(@Arg("email") email: string): Promise<User> {
    const userToFind = await datasource.getRepository(User).findOne({
      where: { email },
    });
    if (userToFind === null)
      throw new Error("user not found");

    return userToFind;
  }
}
