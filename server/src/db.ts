import { DataSource } from "typeorm";
import City from "./entity/City";
import Category from "./entity/Category";
import Place from "./entity/Place";

export default new DataSource({
	type: "postgres",
	host: "db",
	port: 5432,
	username: "postgres",
	password: "postgres",
	database: "postgres",
	synchronize: true,
	entities: [City, Category, Place],
	logging: ["query", "error"],
});
