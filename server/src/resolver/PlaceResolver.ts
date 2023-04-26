import { Arg, Mutation, Query, Resolver } from "type-graphql";
import datasource from "../db";
import Place, { PlaceInput } from "../entity/Place";
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

    if (placeToFind === null)
      throw new Error("Place not found");

    return placeToFind;
  }

  @Query(() => Place)
  async getOnePlacebyName(@Arg("name") name: string): Promise<Place> {
    const placeToFind = await datasource.getRepository(Place).findOne({
      where: { name },
      relations: { city: true, category: true },
    });

    if (placeToFind === null)
      throw new Error("Place not found");

    return placeToFind;
  }

  @Mutation(() => Place)
  async createPlace(@Arg("data") data: PlaceInput): Promise<Place> {
    if (data === null)
      throw new Error("No data in query");

    // check if place name & coordinates are already in database
    await existingPlace(data);
    await existingPlaceCoordinates(data);

    return await datasource.getRepository(Place).save(data);
  }

  @Mutation(() => Place)
  async updatePlace(
    @Arg("id") id: string,
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
      .findOne({ where: { id: parseInt(id, 10) } });

    if (placeToUpdate === null)
      throw new Error("Place not found");

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
