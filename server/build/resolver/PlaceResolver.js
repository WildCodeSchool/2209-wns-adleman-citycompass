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
exports.PlaceResolver = void 0;
const apollo_server_errors_1 = require("apollo-server-errors");
const type_graphql_1 = require("type-graphql");
const db_1 = __importDefault(require("../db"));
const Place_1 = __importStar(require("../entity/Place"));
const dbCheckers_1 = require("../helpers/dbCheckers");
let PlaceResolver = class PlaceResolver {
    async getPlaces() {
        return await db_1.default
            .getRepository(Place_1.default)
            .find({ relations: { city: true, category: true } });
    }
    async getOnePlacebyId(id) {
        const placeToFind = await db_1.default.getRepository(Place_1.default).findOne({
            where: { id: parseInt(id, 10) },
            relations: { city: true, category: true },
        });
        if (placeToFind === null)
            throw new apollo_server_errors_1.ApolloError("Place not found", "NOT_FOUND");
        return placeToFind;
    }
    async getOnePlacebyName(name) {
        const placeToFind = await db_1.default.getRepository(Place_1.default).findOne({
            where: { name },
            relations: { city: true, category: true },
        });
        if (placeToFind === null)
            throw new apollo_server_errors_1.ApolloError("Place not found", "NOT_FOUND");
        return placeToFind;
    }
    async createPlace(data) {
        if (data === null)
            throw new apollo_server_errors_1.ApolloError("No data in query", "BAD_USER_INPUT");
        // check if place name & coordinates are already in database
        await (0, dbCheckers_1.existingPlace)(data);
        await (0, dbCheckers_1.existingPlaceCoordinates)(data);
        return await db_1.default.getRepository(Place_1.default).save(data);
    }
    async updatePlace(id, data) {
        const { name, description, picture, latitude, longitude, categoryId, cityId, adress, website, } = data;
        const placeToUpdate = await db_1.default
            .getRepository(Place_1.default)
            .findOne({ where: { id: parseInt(id, 10) } });
        if (placeToUpdate === null)
            throw new apollo_server_errors_1.ApolloError("Place not found", "NOT_FOUND");
        // check if city name & coordinates are already in database
        await (0, dbCheckers_1.existingPlace)(data, id);
        await (0, dbCheckers_1.existingPlaceCoordinates)(data);
        placeToUpdate.adress = adress;
        placeToUpdate.categoryId = categoryId;
        placeToUpdate.cityId = cityId;
        placeToUpdate.description = description;
        placeToUpdate.latitude = latitude;
        placeToUpdate.longitude = longitude;
        placeToUpdate.name = name;
        placeToUpdate.picture = picture;
        placeToUpdate.website = website;
        await db_1.default.getRepository(Place_1.default).save(placeToUpdate);
        return placeToUpdate;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Place_1.default]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PlaceResolver.prototype, "getPlaces", null);
__decorate([
    (0, type_graphql_1.Query)(() => Place_1.default),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlaceResolver.prototype, "getOnePlacebyId", null);
__decorate([
    (0, type_graphql_1.Query)(() => Place_1.default),
    __param(0, (0, type_graphql_1.Arg)("name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlaceResolver.prototype, "getOnePlacebyName", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Place_1.default),
    __param(0, (0, type_graphql_1.Arg)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Place_1.PlaceInput]),
    __metadata("design:returntype", Promise)
], PlaceResolver.prototype, "createPlace", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Place_1.default),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Place_1.PlaceInput]),
    __metadata("design:returntype", Promise)
], PlaceResolver.prototype, "updatePlace", null);
PlaceResolver = __decorate([
    (0, type_graphql_1.Resolver)(Place_1.default)
], PlaceResolver);
exports.PlaceResolver = PlaceResolver;
