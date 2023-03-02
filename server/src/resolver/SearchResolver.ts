import { Resolver, Query, ObjectType, Field, Arg } from "type-graphql";
import City from "../entity/City";
import Place from "../entity/Place";
import datasource from "../db";
import { ILike } from "typeorm";

@ObjectType()
class SearchResult {
  @Field(() => [City])
  cities: City[];

  @Field(() => [Place])
  placesByName: Place[];

  @Field(() => [Place])
  placesByAddress: Place[];
}

@Resolver()
export class SearchResolver {
  @Query(() => SearchResult)
  async Search(@Arg("searchInput") searchInput: string): Promise<SearchResult> {
    const cities = await datasource.getRepository(City).find({
      where: { name: ILike(`%${searchInput}%`) },
    });
    const placesByName = await datasource.getRepository(Place).find({
      where: { name: ILike(`%${searchInput}%`) },
    });
    const placesByAddress = await datasource.getRepository(Place).find({
      where: { adress: ILike(`%${searchInput}%`) },
    });

    return { cities, placesByName, placesByAddress };
  }
}
