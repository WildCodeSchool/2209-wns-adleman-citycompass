import { DataSource } from "typeorm";
import City from "./entity/City";
import Category from "./entity/Category";
import Place from "./entity/Place";

export default new DataSource({
  type: "postgres",
  host:
    typeof process.env.DB_HOST === "undefined"
      ? "localhost"
      : process.env.DB_HOST,
  port: process.env.DB_PORT === null ? process.env.DB_PORT : 5432,
  username:
    typeof process.env.DB_USER === "undefined"
      ? "postgres"
      : process.env.DB_USER,
  password:
    typeof process.env.DB_PASS === "undefined"
      ? "postgres"
      : process.env.DB_PASS,
  database:
    typeof process.env.DB_NAME === "undefined"
      ? "postgres"
      : process.env.DB_NAME,
  synchronize: true,
  entities: [City, Category, Place],
  logging: ["query", "error"],
});
