"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.SearchResolver = void 0;
const type_graphql_1 = require("type-graphql");
const City_1 = __importDefault(require("../entity/City"));
const Place_1 = __importDefault(require("../entity/Place"));
const db_1 = __importDefault(require("../db"));
const typeorm_1 = require("typeorm");
// A class which is an object to contain the search result
let SearchResult = class SearchResult {
    cities;
    placesByName;
    placesByAddress;
};
__decorate([
    (0, type_graphql_1.Field)(() => [City_1.default]),
    __metadata("design:type", Array)
], SearchResult.prototype, "cities", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Place_1.default]),
    __metadata("design:type", Array)
], SearchResult.prototype, "placesByName", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Place_1.default]),
    __metadata("design:type", Array)
], SearchResult.prototype, "placesByAddress", void 0);
SearchResult = __decorate([
    (0, type_graphql_1.ObjectType)()
], SearchResult);
let SearchResolver = class SearchResolver {
    async Search(searchInput) {
        const cities = await db_1.default.getRepository(City_1.default).find({
            where: { name: (0, typeorm_1.ILike)(`%${searchInput}%`) },
        });
        const placesByName = await db_1.default.getRepository(Place_1.default).find({
            where: { name: (0, typeorm_1.ILike)(`%${searchInput}%`) },
            relations: { city: true },
        });
        const placesByAddress = await db_1.default.getRepository(Place_1.default).find({
            where: { adress: (0, typeorm_1.ILike)(`%${searchInput}%`) },
            relations: { city: true },
        });
        return { cities, placesByName, placesByAddress };
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => SearchResult),
    __param(0, (0, type_graphql_1.Arg)("searchInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SearchResolver.prototype, "Search", null);
SearchResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], SearchResolver);
exports.SearchResolver = SearchResolver;
