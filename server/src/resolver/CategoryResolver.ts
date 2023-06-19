import { Resolver, Mutation, Query, Arg, Int, Authorized } from "type-graphql";
import datasource from "../db";
import Category, { CategoryInput, CategoryUpdate } from "../entity/Category";
import { existingCategory } from "../helpers/dbCheckers";

@Resolver(Category)
export class CategoryResolver {
  @Query(() => [Category])
  async getCategories(): Promise<Category[]> {
    return await datasource
      .getRepository(Category)
      .find({ order: { id: "DESC" } });
  }

  @Authorized(["superadmin"])
  @Mutation(() => Category)
  async createCategory(@Arg("data") data: CategoryInput): Promise<Category> {
    // delete blank spaces before and after category name
    data.name = data.name.trim();
    // change category name first letter to Uppercase
    data.name = data.name.charAt(0).toUpperCase() + data.name.slice(1);

    const categoryToCreate = await datasource
      .getRepository(Category)
      .findOne({ where: { name: data.name } });
    if (categoryToCreate !== null) throw new Error("Category already exist");

    return await datasource.getRepository(Category).save(data);
  }

  // @Authorized(["superadmin"])
  @Mutation(() => Category)
  async updateCategory(
    @Arg("id", () => Int) id: number,
    @Arg("data") data: CategoryUpdate
  ): Promise<Category> {
    if (data === null) throw new Error("No data found");
    if (data.name !== undefined) {
      // delete blank spaces before and after category name
      data.name = data.name.trim();
      // change category name first letter to Uppercase
      data.name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    }

    const categoryToUpdate = await datasource
      .getRepository(Category)
      .findOne({ where: { id } });

    if (categoryToUpdate === null) throw new Error("Category not found");

    if (data.name !== undefined) {
      await existingCategory(data, id);
    }

    if (data.name !== undefined) {
      categoryToUpdate.name = data.name;
    }

    if (data.picto !== undefined) {
      categoryToUpdate.picto = data.picto;
    }

    await datasource.getRepository(Category).save(categoryToUpdate);

    return categoryToUpdate;
  }
}
