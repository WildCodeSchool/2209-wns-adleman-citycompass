import datasource from "../db";
import City, { CityInput, CityUpdate } from "../entity/City";
import Place, { PlaceInput } from "../entity/Place";
import User, { UserInput, UserUpdate } from "../entity/User";

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
      throw new Error(
        "City name already found in database (modification)"
      );
  } else {
    // test for creation
    if (nameExists !== null)
      throw new Error(
        "City name already found in database (creation)"
      );
  }
};

export const existingUser = async (
  data: UserInput | UserUpdate
): Promise<void> => {
  const emailExist = await datasource
    .getRepository(User)
    .findOne({ where: { email: data.email } });

  // test for creation
  if (emailExist !== null)
    throw new Error(
      "User email already found in database"
    );
};

export const existingCoordinates = async (
  data: CityInput | CityUpdate
): Promise<void> => {
  const coordo = await datasource.getRepository(City).findOne({
    where: { latitude: data.latitude, longitude: data.longitude },
  });

  if (coordo !== null)
    throw new Error(
      "City coordinates found in database"
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
      throw new Error(
        "Place name already found in database (modification)"
      );
  } else {
    // test for creation
    if (nameExists !== null)
      throw new Error(
        "Place name already found in database (creation)"
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
    throw new Error(
      "Place coordinates found in database"
    );
};
