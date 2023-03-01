import datasource from "../db";
import { ApolloError } from "apollo-server-errors";
import City, { CityInput, CityUpdate } from "../entity/City";
import Place, { PlaceInput } from "../entity/Place";

/**
 * Thoses helpers are meant to avoid double entries in database
 */

export const existingCity = async (
	data: CityInput | CityUpdate,
	id?: string | undefined
): Promise<void> => {
	const nameExists = await datasource
		.getRepository(City)
		.findOne({ where: { name: data.name } });

	if (id !== undefined) {
		// test for modification
		if (nameExists !== null && nameExists.id !== parseInt(id, 10))
			throw new ApolloError(
				"City name already found in database (modification)",
				"BAD_USER_INPUT"
			);
	} else {
		// test for creation
		if (nameExists !== null)
			throw new ApolloError(
				"City name already found in database (creation)",
				"BAD_USER_INPUT"
			);
	}
};

export const existingCoordinates = async (
	data: CityInput | CityUpdate
): Promise<void> => {
	const coordo = await datasource.getRepository(City).findOne({
		where: { latitude: data.latitude, longitude: data.longitude },
	});

	if (coordo !== null)
		throw new ApolloError(
			"City coordinates found in database",
			"BAD_USER_INPUT"
		);
};

export const existingPlace = async (
	data: PlaceInput,
	id?: string | undefined
): Promise<void> => {
	const nameExists = await datasource
		.getRepository(Place)
		.findOne({ where: { name: data.name } });

	if (id !== undefined) {
		// test for modification
		if (nameExists !== null && nameExists.id !== parseInt(id, 10))
			throw new ApolloError(
				"Place name already found in database (modification)",
				"BAD_USER_INPUT"
			);
	} else {
		// test for creation
		if (nameExists !== null)
			throw new ApolloError(
				"Place name already found in database (creation)",
				"BAD_USER_INPUT"
			);
	}
};

export const existingPlaceCoordinates = async (
	data: PlaceInput
): Promise<void> => {
	const coordo = await datasource.getRepository(Place).findOne({
		where: { latitude: data.latitude, longitude: data.longitude },
	});

	if (coordo !== null)
		throw new ApolloError(
			"Place coordinates found in database",
			"BAD_USER_INPUT"
		);
};
