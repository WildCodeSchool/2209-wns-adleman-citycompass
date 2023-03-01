import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from 'typeorm-extension';
import City from "./entity/City";
import Category from "./entity/Category";
import Place from "./entity/Place";

const options: DataSourceOptions & SeederOptions = {
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
  entities: [City, Category, Place],
  logging: ["query", "error"],
  seeds: ['src/database/seeds/**/*{.ts,.js}'],
};

const dataSource = new DataSource(options);

export default dataSource

// export default new DataSource({
//   type: "postgres",
//   host:
//     typeof process.env.DB_HOST === "undefined"
//       ? "localhost"
//       : process.env.DB_HOST,
//   port: 5432,
//   username: "postgres",
//   password: "postgres",
//   database: "postgres",
//   synchronize: true,
//   entities: [City, Category, Place],
//   logging: ["query", "error"],
// });
