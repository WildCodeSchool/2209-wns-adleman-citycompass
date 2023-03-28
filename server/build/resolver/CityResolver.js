"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityResolver = void 0;
const type_graphql_1 = require("type-graphql");
const apollo_server_errors_1 = require("apollo-server-errors");
const City_1 = __importStar(require("../entity/City"));
const db_1 = __importDefault(require("../db"));
const dbCheckers_1 = require("../helpers/dbCheckers");
let CityResolver = class CityResolver {
    async createCity(data) {
        if (data === null)
            throw new apollo_server_errors_1.ApolloError("No data in query", "BAD_USER_INPUT");
        // delete blank spaces before and after city name
        data.name = data.name.trim();
        // change city name first letter to Uppercase
        data.name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        // check if city name & coordinates are already in database
        await (0, dbCheckers_1.existingCity)(data);
        await (0, dbCheckers_1.existingCoordinates)(data);
        return await db_1.default.getRepository(City_1.default).save(data);
    }
    async getCities() {
        return await db_1.default.getRepository(City_1.default).find();
    }
    async updateCity(id, data) {
        const { name, description, picture, latitude, longitude } = data;
        const cityToUpdate = await db_1.default.getRepository(City_1.default).findOne({
            where: { id: parseInt(id, 10) },
        });
        if (cityToUpdate === null)
            throw new apollo_server_errors_1.ApolloError("City not found", "NOT_FOUND");
        // check if city name & coordinates are already in database
        if (name !== undefined) {
            await (0, dbCheckers_1.existingCity)(data, id);
        }
        if (latitude !== undefined || longitude !== undefined) {
            await (0, dbCheckers_1.existingCoordinates)(data);
        }
        if (name !== undefined) {
            cityToUpdate.name = name;
        }
        if (description !== undefined) {
            cityToUpdate.description = description;
        }
        if (picture !== undefined) {
            cityToUpdate.picture = picture;
        }
        if (latitude !== undefined) {
            cityToUpdate.latitude = latitude;
        }
        if (longitude !== undefined) {
            cityToUpdate.longitude = longitude;
        }
        await db_1.default.getRepository(City_1.default).save(cityToUpdate);
        return cityToUpdate;
    }
    async getOneCitybyId(id) {
        const cityToFind = await db_1.default.getRepository(City_1.default).findOne({
            where: { id: parseInt(id, 10) },
            relations: { places: { category: true } },
        });
        if (cityToFind === null)
            throw new apollo_server_errors_1.ApolloError("City not found", "NOT_FOUND");
        return cityToFind;
    }
    async getOneCitybyName(name) {
        const cityToFind = await db_1.default.getRepository(City_1.default).findOne({
            where: { name },
            relations: { places: { category: true } },
        });
        if (cityToFind === null)
            throw new apollo_server_errors_1.ApolloError("city not found", "NOT_FOUND");
        return cityToFind;
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => City_1.default),
    __param(0, (0, type_graphql_1.Arg)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [City_1.CityInput]),
    __metadata("design:returntype", Promise)
], CityResolver.prototype, "createCity", null);
__decorate([
    (0, type_graphql_1.Query)(() => [City_1.default]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CityResolver.prototype, "getCities", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => City_1.default),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, City_1.CityUpdate]),
    __metadata("design:returntype", Promise)
], CityResolver.prototype, "updateCity", null);
__decorate([
    (0, type_graphql_1.Query)(() => City_1.default),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CityResolver.prototype, "getOneCitybyId", null);
__decorate([
    (0, type_graphql_1.Query)(() => City_1.default),
    __param(0, (0, type_graphql_1.Arg)("name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CityResolver.prototype, "getOneCitybyName", null);
CityResolver = __decorate([
    (0, type_graphql_1.Resolver)(City_1.default)
], CityResolver);
exports.CityResolver = CityResolver;
