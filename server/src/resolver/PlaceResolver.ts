import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import datasource from "../db";
import Place, { PlaceInput, PlaceUpdate } from "../entity/Place";
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
    @Arg("data") data: PlaceUpdate
  ): Promise<Place> {
    const { name, description, picture, latitude, longitude, adress, website } =
      data;
    const placeToUpdate = await datasource
      .getRepository(Place)
      .findOne({ where: { id } });

    if (placeToUpdate === null) throw new Error("Place not found");

    const user = await datasource.getRepository(User).findOne({
      where: { id: userID },
      relations: { managedCities: true, managedPlaces: true },
    });

    if (user === null) throw new Error("User doesn't exist");

    // check if city name & coordinates are already in database
    if (name !== placeToUpdate.name) {
      await existingPlace(data, id);
    }

    if (
      latitude !== placeToUpdate.latitude &&
      longitude !== placeToUpdate.longitude
    ) {
      await existingPlaceCoordinates(data);
    }
    if (name !== placeToUpdate.name) await existingPlace(data, id);
    if (
      latitude !== placeToUpdate.latitude &&
      longitude !== placeToUpdate.longitude
    )
      await existingPlaceCoordinates(data, id);

    placeToUpdate.adress = adress;
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
