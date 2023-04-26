import { DataSource } from "typeorm";
import { env } from './env';
import City from "./entity/City";
import Category from "./entity/Category";
import Place from "./entity/Place";
import User from "./entity/User";

export default new DataSource({
  type: "postgres",
  host:
    typeof env.DB_HOST === "undefined"
      ? "localhost"
      : env.DB_HOST,
  port: env.DB_PORT === null ? 5432 : env.DB_PORT,
  username:
    typeof env.DB_USER === "undefined"
      ? "postgres"
      : env.DB_USER,
  password:
    typeof env.DB_PASS === "undefined"
      ? "postgres"
      : env.DB_PASS,
  database:
    typeof env.DB_NAME === "undefined"
      ? "postgres"
      : env.DB_NAME,
  synchronize: true,
  entities: [City, Category, Place, User],
  logging: ["query", "error"],
});
