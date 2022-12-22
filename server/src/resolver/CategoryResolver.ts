import { ApolloError } from "apollo-server-core";
import { Resolver, Mutation, Query, Arg, Int } from "type-graphql";
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
		const categoryToCreate = await datasource
			.getRepository(Category)
			.findOne({ where: { name: data.name } });
		if (categoryToCreate !== null)
			throw new ApolloError("Category already exit", "NOT_FOUND");

		return await datasource.getRepository(Category).save(data);
	}

	@Mutation(() => Category)
	async updateCategory(
		@Arg("id", () => Int) id: number,
		@Arg("data") data: CategoryInput
	): Promise<Category> {
		const { name, picto } = data;
		const categoryToUpdate = await datasource
			.getRepository(Category)
			.findOne({ where: { id } });
		if (categoryToUpdate === null)
			throw new ApolloError("Category not found", "NOT_FOUND");

		categoryToUpdate.name = name;
		categoryToUpdate.picto = picto;

		await datasource.getRepository(Category).save(categoryToUpdate);

		return categoryToUpdate;
	}
}
