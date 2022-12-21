import { Resolver, Mutation, Query, Arg } from "type-graphql";
import datasource from "../db";
import Category, { CategoryInput } from "../entity/Category";

@Resolver(Category)
export class CategoryResolver {
	@Query(() => [Category])
	async categories(): Promise<Category[]> {
		return await datasource.getRepository(Category).find();
	}

	@Mutation(() => Category)
	async createCategory(@Arg("data") data: CategoryInput): Promise<Category> {
		return await datasource.getRepository(Category).save(data);
	}
}
