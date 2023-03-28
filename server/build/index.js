"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const apollo_server_1 = require("apollo-server");
const apollo_server_core_1 = require("apollo-server-core");
const type_graphql_1 = require("type-graphql");
const db_1 = __importDefault(require("./db"));
const CityResolver_1 = require("./resolver/CityResolver");
const CategoryResolver_1 = require("./resolver/CategoryResolver");
const PlaceResolver_1 = require("./resolver/PlaceResolver");
const SearchResolver_1 = require("./resolver/SearchResolver");
const start = async () => {
    await db_1.default.initialize();
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: [CategoryResolver_1.CategoryResolver, CityResolver_1.CityResolver, PlaceResolver_1.PlaceResolver, SearchResolver_1.SearchResolver],
    });
    const server = new apollo_server_1.ApolloServer({
        schema,
        csrfPrevention: true,
        cache: "bounded",
        plugins: [(0, apollo_server_core_1.ApolloServerPluginLandingPageLocalDefault)({ embed: true })],
    });
    await server.listen().then(({ url }) => {
        console.log(`🚀  Server ready at ${url}`);
    });
};
void start();
