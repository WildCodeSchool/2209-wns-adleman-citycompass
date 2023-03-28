"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const City_1 = __importDefault(require("./entity/City"));
const Category_1 = __importDefault(require("./entity/Category"));
const Place_1 = __importDefault(require("./entity/Place"));
exports.default = new typeorm_1.DataSource({
    type: "postgres",
    host: typeof process.env.DB_HOST === "undefined"
        ? "localhost"
        : process.env.DB_HOST,
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    synchronize: true,
    entities: [City_1.default, Category_1.default, Place_1.default],
    logging: ["query", "error"],
});
