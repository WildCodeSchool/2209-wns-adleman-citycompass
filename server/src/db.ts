import { DataSource } from "typeorm";
import City from "./entity/City";

export default new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  synchronize: true,
  entities: [City],
  logging: ["query", "error"],
});
