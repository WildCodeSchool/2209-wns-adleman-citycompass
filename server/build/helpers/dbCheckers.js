"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.existingPlaceCoordinates = exports.existingPlace = exports.existingCoordinates = exports.existingCity = void 0;
const db_1 = __importDefault(require("../db"));
const apollo_server_errors_1 = require("apollo-server-errors");
const City_1 = __importDefault(require("../entity/City"));
const Place_1 = __importDefault(require("../entity/Place"));
/**
 * Thoses helpers are meant to avoid double entries in database
 */
const existingCity = async (data, id) => {
    const nameExists = await db_1.default
        .getRepository(City_1.default)
        .findOne({ where: { name: data.name } });
    if (id !== undefined) {
        // test for modification
        if (nameExists !== null && nameExists.id !== parseInt(id, 10))
            throw new apollo_server_errors_1.ApolloError("City name already found in database (modification)", "BAD_USER_INPUT");
    }
    else {
        // test for creation
        if (nameExists !== null)
            throw new apollo_server_errors_1.ApolloError("City name already found in database (creation)", "BAD_USER_INPUT");
    }
};
exports.existingCity = existingCity;
const existingCoordinates = async (data) => {
    const coordo = await db_1.default.getRepository(City_1.default).findOne({
        where: { latitude: data.latitude, longitude: data.longitude },
    });
    if (coordo !== null)
        throw new apollo_server_errors_1.ApolloError("City coordinates found in database", "BAD_USER_INPUT");
};
exports.existingCoordinates = existingCoordinates;
const existingPlace = async (data, id) => {
    const nameExists = await db_1.default
        .getRepository(Place_1.default)
        .findOne({ where: { name: data.name } });
    if (id !== undefined) {
        // test for modification
        if (nameExists !== null && nameExists.id !== parseInt(id, 10))
            throw new apollo_server_errors_1.ApolloError("Place name already found in database (modification)", "BAD_USER_INPUT");
    }
    else {
        // test for creation
        if (nameExists !== null)
            throw new apollo_server_errors_1.ApolloError("Place name already found in database (creation)", "BAD_USER_INPUT");
    }
};
exports.existingPlace = existingPlace;
const existingPlaceCoordinates = async (data) => {
    const coordo = await db_1.default.getRepository(Place_1.default).findOne({
        where: { latitude: data.latitude, longitude: data.longitude },
    });
    if (coordo !== null)
        throw new apollo_server_errors_1.ApolloError("Place coordinates found in database", "BAD_USER_INPUT");
};
exports.existingPlaceCoordinates = existingPlaceCoordinates;
