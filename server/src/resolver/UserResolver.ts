import { Arg, Mutation, Resolver, Query } from "type-graphql";
import { ApolloError } from "apollo-server-errors";
import User, { UserInput, UserUpdate, UserLogin } from "../entity/User";
import datasource from "../db";
import { existingUser } from "../helpers/dbCheckers";
import { hashPassword, verifyPassword } from "../helpers/hashing";
import jwt from "jsonwebtoken";

@Resolver(User)
export class UserResolver {
  @Mutation(() => User)
  async createUser(@Arg("data") data: UserInput): Promise<User> {
    if (data === null)
      throw new ApolloError("No data in query", "BAD_USER_INPUT");
    // check if user email is already in database
    await existingUser(data);

    const hashedPassword = await hashPassword(data.password);
    return await datasource
      .getRepository(User)
      .save({ ...data, password: hashedPassword });
  }

  @Mutation(() => String)
  async login(@Arg("data") data: UserLogin): Promise<String> {
    const user = await datasource
      .getRepository(User)
      .findOne({ where: { email: data.email } });

    if (user === null || !(await verifyPassword(data.password, user.password)))
      throw new ApolloError("Invalid credentials", "NOT_FOUND");

    // Changer la clé secrète avec la variable d'environnement
    const token = jwt.sign({ userID: user.id }, "mysupersecretkey");
    // Reste à faire -> voir son histoire de contexte pour vérifier le jwt (vidéo 2, 0:50)

    return token;
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
      throw new ApolloError("User not found", "NOT_FOUND");

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
      throw new ApolloError("user not found", "NOT_FOUND");

    return userToFind;
  }
}
