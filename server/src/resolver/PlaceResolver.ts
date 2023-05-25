import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import datasource from "../db";
import Place, { PlaceInput } from "../entity/Place";
import User from "../entity/User";
import { existingPlace, existingPlaceCoordinates } from "../helpers/dbCheckers";

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
  async createPlace(@Arg("data") data: PlaceInput): Promise<Place> {
    if (data === null) throw new Error("No data in query");

    // check if place name & coordinates are already in database
    await existingPlace(data);
    await existingPlaceCoordinates(data);

    return await datasource.getRepository(Place).save(data);
  }

  @Authorized(["superadmin", "admin", "contributor"])
  @Mutation(() => Place)
  async updatePlace(
    @Arg("userID") userID: number,
    @Arg("id") id: number,
    @Arg("data") data: PlaceInput
  ): Promise<Place> {
    const {
      name,
      description,
      picture,
      latitude,
      longitude,
      categoryId,
      cityId,
      adress,
      website,
    } = data;
    const placeToUpdate = await datasource
      .getRepository(Place)
      .findOne({ where: { id } });

    if (placeToUpdate === null) throw new Error("Place not found");

    const user = await datasource
      .getRepository(User)
      .findOne({ where: { id: userID } });

    if (user === null) throw new Error("User doesn't exist");

    // if the user is a contributor, check if he's the author of the place
    if (
      user !== null &&
      user.role === "contributor" &&
      user.id !== placeToUpdate.author.id
    )
      throw new Error("This place doesn't belong to you");

    // if the user is a admin, check if he's the admin of the city linked to the place
    if (user !== null && user.role === "admin") {
      const cityID = placeToUpdate.city.id;
      let boolean = false;
      if (user.managedCities !== undefined) {
        for (let i = 0; i < user.managedCities?.length; i++) {
          if (user.managedCities[i].id === cityID) boolean = true;
        }
      }
      if (!boolean) throw new Error("You don't manage this city");
    }

    // check if city name & coordinates are already in database
    await existingPlace(data, id);
    await existingPlaceCoordinates(data);

    placeToUpdate.adress = adress;
    placeToUpdate.categoryId = categoryId;
    placeToUpdate.cityId = cityId;
    placeToUpdate.description = description;
    placeToUpdate.latitude = latitude;
    placeToUpdate.longitude = longitude;
    placeToUpdate.name = name;
    placeToUpdate.picture = picture;
    placeToUpdate.website = website;

    await datasource.getRepository(Place).save(placeToUpdate);

    return placeToUpdate;
  }
}
// const city = await datasource
//   .getRepository(City)
//   .findOne({ where: { id: cityID } });
// if (city !== null) {
//   const managers = city.managers;
//   for (let i = 0; i < managers.length; i++) {
//     if (managers[i].id === userID) return managers[i];
//   }
// }
