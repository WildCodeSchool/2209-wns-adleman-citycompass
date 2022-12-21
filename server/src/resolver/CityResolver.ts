import { Arg, Mutation, Resolver, Query } from "type-graphql";
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
    const cities = await datasource.getRepository(City).find();
    console.log(cities);
    return cities;
  }
}
