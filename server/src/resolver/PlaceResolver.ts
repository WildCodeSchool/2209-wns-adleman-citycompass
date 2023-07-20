import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import datasource from "../db";
import Place, { PlaceInput, PlaceUpdate } from "../entity/Place";
import User from "../entity/User";
import { existingPlace, existingPlaceCoordinates } from "../helpers/dbCheckers";
import Category from "../entity/Category";
import City from "../entity/City";
import { ContextType } from "..";

@Resolver(Place)
export class PlaceResolver {
  @Query(() => [Place])
  async getPlaces(): Promise<Place[]> {
    return await datasource
      .getRepository(Place)
      .find({ relations: { city: true, category: true } });
  }

  @Query(() => Place)
  async getOnePlacebyId(@Arg("id") id: string): Promise<Place> {
    const placeToFind = await datasource.getRepository(Place).findOne({
      where: { id: parseInt(id, 10) },
      relations: { city: true, category: true },
    });

    if (placeToFind === null) throw new Error("Place not found");

    return placeToFind;
  }

  @Query(() => Place)
  async getOnePlacebyName(@Arg("name") name: string): Promise<Place> {
    const placeToFind = await datasource.getRepository(Place).findOne({
      where: { name },
      relations: { city: true, category: true },
    });

    if (placeToFind === null) throw new Error("Place not found");

    return placeToFind;
  }

  @Authorized(["superadmin", "admin", "contributor"])
  @Mutation(() => Place)
  async createPlace(
    @Arg("data") data: PlaceInput,
    @Ctx() ctx: ContextType
  ): Promise<Place> {
    if (data === null) throw new Error("No data in query");

    const placeCity = await datasource
      .getRepository(City)
      .findOne({ where: { id: data.cityId } });
    if (placeCity === null) throw new Error("City not found in database");
    const currentUserId = ctx.jwtPayload.userID;
    const currentUser = await datasource
      .getRepository(User)
      .findOne({ where: { id: currentUserId } });
    if (currentUser === null) throw new Error("User not found in database");

    const placeCategory = await datasource
      .getRepository(Category)
      .findOne({ where: { id: data.categoryId } });
    if (placeCategory === null)
      throw new Error("Category not found in database");

    const newPlace = {
      ...data,
      category: placeCategory,
      city: placeCity,
      author: currentUser,
    };

    // check if place name & coordinates are already in database
    await existingPlace(newPlace);
    await existingPlaceCoordinates(newPlace);

    return await datasource.getRepository(Place).save(newPlace);
  }

  @Authorized(["superadmin", "admin", "contributor"])
  @Mutation(() => Place)
  async updatePlace(
    @Ctx() ctx: ContextType,
    @Arg("id") id: number,
    @Arg("data") data: PlaceUpdate
  ): Promise<Place> {
    const {
      name,
      description,
      picture,
      latitude,
      longitude,
      adress,
      website,
      cityId,
      categoryId,
    } = data;

    const placeToUpdate = await datasource
      .getRepository(Place)
      .findOne({ where: { id }, relations: { city: true, category: true } });

    if (placeToUpdate === null) throw new Error("Place not found");

    const userID = ctx.jwtPayload.userID;

    const user = await datasource.getRepository(User).findOne({
      where: { id: userID },
      relations: { managedCities: true, managedPlaces: true },
    });

    if (user === null) throw new Error("User doesn't exist");

    // check if city name & coordinates are already in database
    if (name !== placeToUpdate.name) await existingPlace(data, id);
    if (
      latitude !== placeToUpdate.latitude &&
      longitude !== placeToUpdate.longitude
    )
      await existingPlaceCoordinates(data, id);

    // if the user is a contributor, check if he's the author of the place
    if (
      user.role === "contributor" &&
      placeToUpdate.author !== undefined &&
      placeToUpdate.author !== null &&
      user.id !== placeToUpdate.author.id
    )
      throw new Error("This place doesn't belong to you");

    // If the user is a contributor, can't modify the city.
    if (
      user.role === "contributor" &&
      placeToUpdate.city.id !== undefined &&
      placeToUpdate.city.id !== null &&
      cityId !== placeToUpdate.city.id
    )
      throw new Error("You can not modify this place city");

    // if the user is a admin, check if he's the admin of the city linked to the place
    if (user.role === "admin") {
      const cityID = placeToUpdate.city.id;
      let boolean = false;
      if (user.managedCities?.length === 0)
        throw new Error("You don't have any city assigned to your profile");
      if (user.managedCities !== undefined) {
        for (let i = 0; i < user.managedCities?.length; i++) {
          if (user.managedCities[i].id === cityID) boolean = true;
        }
      }
      if (!boolean) throw new Error("You don't manage this city");
    }

    if (adress !== undefined) placeToUpdate.adress = adress;
    if (description !== undefined) placeToUpdate.description = description;
    if (latitude !== undefined) placeToUpdate.latitude = latitude;
    if (longitude !== undefined) placeToUpdate.longitude = longitude;
    if (name !== undefined) placeToUpdate.name = name;
    if (picture !== undefined) placeToUpdate.picture = picture;
    if (website !== undefined) placeToUpdate.website = website;
    if (cityId !== undefined) placeToUpdate.city.id = cityId;
    if (categoryId !== undefined) placeToUpdate.category.id = categoryId;

    await datasource.getRepository(Place).save(placeToUpdate);

    return placeToUpdate;
  }
}
