import { Arg, Mutation, Resolver, Query } from "type-graphql";
import { ApolloError } from "apollo-server-errors";
import City, { CityInput } from "../entity/City";
import datasource from "../db";

@Resolver(City)
export class CityResolver {
  @Mutation(() => City)
  async createCity(@Arg("data") data: CityInput): Promise<City> {
    const { raw: id } = await datasource.getRepository(City).insert(data);
    console.log({ id, ...data });
    return { id, ...data };
  }

  @Query(() => [City])
  async getCities(): Promise<City[]> {
    return await datasource.getRepository(City).find();
    // console.log(cities);
  }

  @Mutation(() => City)
  async updateCity(
    @Arg("id") id: string,
    @Arg("data") data: CityInput
  ): Promise<City | undefined> {
    try {
      const { name, description, picture, latitude, longitude } = data;
      const cityToUpdate = await datasource.getRepository(City).findOne({
        where: { id: parseInt(id, 10) },
      });

      if (cityToUpdate === null)
        throw new ApolloError("City not found", "NOT_FOUND");

      cityToUpdate.name = name;
      cityToUpdate.description = description;
      cityToUpdate.picture = picture;
      cityToUpdate.latitude = latitude;
      cityToUpdate.longitude = longitude;

      await datasource.getRepository(City).save(cityToUpdate);

      return cityToUpdate;
    } catch (err) {
      console.error(err);
    }
  }
}
