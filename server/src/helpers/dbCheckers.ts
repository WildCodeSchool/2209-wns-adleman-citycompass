import datasource from "../db";
import { ApolloError } from "apollo-server-errors";
import City, { CityInput } from "../entity/City";

/**
 * Thoses helpers are meant to avoid double entries in database
 */

export const existingCity = async (
  data: CityInput,
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

export const existingCoordinates = async (data: CityInput): Promise<void> => {
  const coordo = await datasource.getRepository(City).findOne({
    where: { latitude: data.latitude, longitude: data.longitude },
  });

  if (coordo !== null)
    throw new ApolloError(
      "City coordinates found in database",
      "BAD_USER_INPUT"
    );
};
