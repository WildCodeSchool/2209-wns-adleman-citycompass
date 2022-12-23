import { DataSource } from "typeorm";
import City from "./entity/City";
import Category from "./entity/Category";

export default new DataSource({
  type: "postgres",
  host:
    typeof process.env.DB_HOST === "undefined"
      ? "localhost"
      : process.env.DB_HOST,
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  synchronize: true,
  entities: [City, Category],
  logging: ["error"],
});
