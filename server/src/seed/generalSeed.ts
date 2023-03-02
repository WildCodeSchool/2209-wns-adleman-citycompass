import Category from "../entity/Category";
import datasource from "../db";
import City from "../entity/City";
import Place from "../entity/Place";
import createCategory from "./categorySeed";


async function reset(): Promise<void> {
  await datasource.initialize();
  await datasource.getRepository(City).delete({});
  await datasource.getRepository(Place).delete({});
  await datasource.getRepository(Category).delete({});
  await createCategory()
  await datasource.destroy();
  console.log("done !");
}

reset().catch(console.error);