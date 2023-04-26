import { Arg, Mutation, Resolver, Query } from "type-graphql";
import City, { CityInput, CityUpdate } from "../entity/City";
import datasource from "../db";
import { existingCity, existingCoordinates } from "../helpers/dbCheckers";

@Resolver(City)
export class CityResolver {
  @Mutation(() => City)
  async createCity(@Arg("data") data: CityInput): Promise<City> {
    if (data === null)
      throw new Error("No data in query");

    // delete blank spaces before and after city name
    data.name = data.name.trim();
    // change city name first letter to Uppercase
    data.name = data.name.charAt(0).toUpperCase() + data.name.slice(1);

    // check if city name & coordinates are already in database
    await existingCity(data);
    await existingCoordinates(data);

    return await datasource.getRepository(City).save(data);
  }

  @Query(() => [City])
  async getCities(): Promise<City[]> {
    return await datasource.getRepository(City).find();
  }

  @Mutation(() => City)
  async updateCity(
    @Arg("id") id: string,
    @Arg("data") data: CityUpdate
  ): Promise<City> {
    const { name, description, picture, latitude, longitude } = data;

    const cityToUpdate = await datasource.getRepository(City).findOne({
      where: { id: parseInt(id, 10) },
    });

    if (cityToUpdate === null)
      throw new Error("City not found");

    // check if city name & coordinates are already in database
    if (name !== undefined) {
      await existingCity(data, id);
    }
    if (latitude !== undefined || longitude !== undefined) {
      await existingCoordinates(data);
    }

    if (name !== undefined) {
      cityToUpdate.name = name;
    }
    if (description !== undefined) {
      cityToUpdate.description = description;
    }
    if (picture !== undefined) {
      cityToUpdate.picture = picture;
    }
    if (latitude !== undefined) {
      cityToUpdate.latitude = latitude;
    }
    if (longitude !== undefined) {
      cityToUpdate.longitude = longitude;
    }

    await datasource.getRepository(City).save(cityToUpdate);

    return cityToUpdate;
  }

  @Query(() => City)
  async getOneCitybyId(@Arg("id") id: string): Promise<City> {
    const cityToFind = await datasource.getRepository(City).findOne({
      where: { id: parseInt(id, 10) },
      relations: { places: { category: true } },
    });

    if (cityToFind === null)
      throw new Error("City not found");

    return cityToFind;
  }

  @Query(() => City)
  async getOneCitybyName(@Arg("name") name: string): Promise<City> {
    const cityToFind = await datasource.getRepository(City).findOne({
      where: { name },
      relations: { places: { category: true } },
    });

    if (cityToFind === null)
      throw new Error("city not found");

    return cityToFind;
  }
}
