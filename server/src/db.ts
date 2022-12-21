import { DataSource } from "typeorm";
import Category from "./entity/Category";

export default new DataSource({
	type: "postgres",
	host: "db",
	port: 5432,
	username: "postgres",
	password: "postgres",
	database: "postgres",
	synchronize: true,
	entities: [Category],
	logging: ["query", "error"],
});
