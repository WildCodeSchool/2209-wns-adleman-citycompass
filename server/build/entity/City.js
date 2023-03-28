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
exports.CityUpdate = exports.CityInput = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const class_validator_1 = require("class-validator");
const Place_1 = __importDefault(require("./Place"));
const customValidators_1 = require("../helpers/customValidators");
let City = class City {
    id;
    name;
    picture;
    description;
    latitude;
    longitude;
    places;
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], City.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], City.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ length: 2083, type: "varchar" }),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], City.prototype, "picture", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], City.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ length: 12, type: "varchar" }),
    (0, class_validator_1.IsLatitude)()
    // custom Validations
    ,
    (0, class_validator_1.Validate)(customValidators_1.IsDotInString),
    __metadata("design:type", String)
], City.prototype, "latitude", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ length: 13, type: "varchar" }),
    (0, class_validator_1.IsLongitude)()
    // custom validations
    ,
    (0, class_validator_1.Validate)(customValidators_1.IsDotInString),
    __metadata("design:type", String)
], City.prototype, "longitude", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Place_1.default]),
    (0, typeorm_1.OneToMany)(() => Place_1.default, (place) => place.city),
    __metadata("design:type", Array)
], City.prototype, "places", void 0);
City = __decorate([
    (0, typeorm_1.Entity)(),
    (0, type_graphql_1.ObjectType)()
], City);
let CityInput = class CityInput {
    name;
    picture;
    description;
    latitude;
    longitude;
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, class_validator_1.MaxLength)(50),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], CityInput.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, class_validator_1.MaxLength)(2083),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CityInput.prototype, "picture", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, class_validator_1.MinLength)(10),
    __metadata("design:type", String)
], CityInput.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, class_validator_1.IsLatitude)()
    // custom Validation
    ,
    (0, class_validator_1.Validate)(customValidators_1.IsDotInString),
    __metadata("design:type", String)
], CityInput.prototype, "latitude", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, class_validator_1.IsLongitude)()
    // custom validations
    ,
    (0, class_validator_1.Validate)(customValidators_1.IsDotInString),
    __metadata("design:type", String)
], CityInput.prototype, "longitude", void 0);
CityInput = __decorate([
    (0, type_graphql_1.InputType)()
], CityInput);
exports.CityInput = CityInput;
let CityUpdate = class CityUpdate {
    name;
    picture;
    description;
    latitude;
    longitude;
};
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.MaxLength)(50),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], CityUpdate.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.MaxLength)(2083),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CityUpdate.prototype, "picture", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.MinLength)(10),
    __metadata("design:type", String)
], CityUpdate.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsLatitude)()
    // custom Validation
    ,
    (0, class_validator_1.Validate)(customValidators_1.IsDotInString),
    __metadata("design:type", String)
], CityUpdate.prototype, "latitude", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsLongitude)()
    // custom validations
    ,
    (0, class_validator_1.Validate)(customValidators_1.IsDotInString),
    __metadata("design:type", String)
], CityUpdate.prototype, "longitude", void 0);
CityUpdate = __decorate([
    (0, type_graphql_1.InputType)()
], CityUpdate);
exports.CityUpdate = CityUpdate;
exports.default = City;
