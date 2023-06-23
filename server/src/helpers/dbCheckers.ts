import datasource from "../db";
import Category, { CategoryInput, CategoryUpdate } from "../entity/Category";
import City, { CityInput, CityUpdate } from "../entity/City";
import Place, { PlaceInput, PlaceUpdate } from "../entity/Place";
import User, { UserInput, UserUpdate } from "../entity/User";

/**
 * Thoses helpers are meant to avoid double entries in database
 */

export const existingCity = async (
  data: CityInput | CityUpdate,
  id?: number | undefined
): Promise<void> => {
  const nameExists = await datasource
    .getRepository(City)
    .findOne({ where: { name: data.name } });

  if (id !== undefined) {
    // test for modification
    if (nameExists !== null && nameExists.id !== id)
      throw new Error("City name already found in database (modification)");
  } else {
    // test for creation
    if (nameExists !== null)
      throw new Error("City name already found in database (creation)");
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
    throw new Error("User email already found in database");
};

export const existingCoordinates = async (
  data: CityInput | CityUpdate,
  id?: number | undefined
): Promise<void> => {
  const coordo = await datasource.getRepository(City).findOne({
    where: { latitude: data.latitude, longitude: data.longitude },
  });
  if (id !== undefined) {
    // test for modification
    if (coordo !== null && coordo.id !== id)
      throw new Error("City coordinates found in another city");
  } else {
    if (coordo !== null) throw new Error("City coordinates found in database");
    // Vérifier si les coordonnées existent déjà pour une autre ville
  }
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
    if (nameExists !== null && nameExists.id !== id)
      throw new Error("Place name already found in database (modification)");
  } else {
    // test for creation
    if (nameExists !== null)
      throw new Error("Place name already found in database (creation)");
  }
};

export const existingCategory = async (
  data: CategoryInput | CategoryUpdate,
  id?: number | undefined
): Promise<void> => {
  const nameExists = await datasource
    .getRepository(Category)
    .findOne({ where: { name: data.name } });

  if (id !== undefined) {
    // test for modification
    if (nameExists !== null && nameExists.id !== id)
      throw new Error("Category name already found in database (modification)");
  } else {
    // test for creation
    if (nameExists !== null)
      throw new Error("Category name already found in database (creation)");
  }
};

export const existingPlaceCoordinates = async (
  data: PlaceInput | PlaceUpdate,
  id?: number
): Promise<void> => {
  const coordo = await datasource.getRepository(Place).findOne({
    where: { latitude: data.latitude, longitude: data.longitude },
  });

  if (id !== undefined) {
    // test for modification
    if (coordo !== null && coordo.id !== id)
      throw new Error(
        "Place coordinates already found in database (modification)"
      );
  } else {
    // test for creation
    if (coordo !== null)
      throw new Error("Place coordinates already found in database (creation)");
  }
};
