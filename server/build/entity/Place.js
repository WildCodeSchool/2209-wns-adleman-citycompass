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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceInput = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const class_validator_1 = require("class-validator");
const City_1 = __importDefault(require("./City"));
const Category_1 = __importDefault(require("./Category"));
let Place = class Place {
    id;
    name;
    latitude;
    longitude;
    adress;
    website;
    picture;
    description;
    cityId;
    city;
    categoryId;
    category;
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Place.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Place.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ length: 12, type: "varchar" }),
    __metadata("design:type", String)
], Place.prototype, "latitude", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ length: 13, type: "varchar" }),
    __metadata("design:type", String)
], Place.prototype, "longitude", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ length: 255, type: "varchar" }),
    __metadata("design:type", String)
], Place.prototype, "adress", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ length: 2083, type: "varchar" }),
    __metadata("design:type", String)
], Place.prototype, "website", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ length: 2083, type: "varchar" }),
    __metadata("design:type", String)
], Place.prototype, "picture", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Place.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Place.prototype, "cityId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => City_1.default),
    (0, typeorm_1.ManyToOne)(() => City_1.default, (city) => city.places, { onDelete: "CASCADE" }),
    __metadata("design:type", City_1.default)
], Place.prototype, "city", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Place.prototype, "categoryId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Category_1.default),
    (0, typeorm_1.ManyToOne)(() => Category_1.default, (category) => category.places, { onDelete: "CASCADE" }),
    __metadata("design:type", Category_1.default)
], Place.prototype, "category", void 0);
Place = __decorate([
    (0, typeorm_1.Entity)(),
    (0, type_graphql_1.ObjectType)()
], Place);
let PlaceInput = class PlaceInput {
    name;
    latitude;
    longitude;
    adress;
    website;
    picture;
    description;
    cityId;
    categoryId;
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, class_validator_1.MaxLength)(50),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], PlaceInput.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, class_validator_1.MaxLength)(12),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], PlaceInput.prototype, "latitude", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, class_validator_1.MaxLength)(13),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], PlaceInput.prototype, "longitude", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, class_validator_1.MaxLength)(255),
    (0, class_validator_1.MinLength)(10),
    __metadata("design:type", String)
], PlaceInput.prototype, "adress", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.MaxLength)(2083),
    __metadata("design:type", String)
], PlaceInput.prototype, "website", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, class_validator_1.MaxLength)(2083),
    (0, class_validator_1.MinLength)(21),
    __metadata("design:type", String)
], PlaceInput.prototype, "picture", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, class_validator_1.MinLength)(10),
    __metadata("design:type", String)
], PlaceInput.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], PlaceInput.prototype, "cityId", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], PlaceInput.prototype, "categoryId", void 0);
PlaceInput = __decorate([
    (0, type_graphql_1.InputType)()
], PlaceInput);
exports.PlaceInput = PlaceInput;
exports.default = Place;
