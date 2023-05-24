/* eslint-disable no-sequences */
import { useState } from "react";
import add_icon from "../../../assets/add_icon.svg";
import modify_icon from "../../../assets/modify_icon.svg";
import { useGetCategoriesQuery } from "../../../gql/generated/schema";
import FormAddCategory from "./FormAddCategory";
import { FormUpdateCategory } from "./FormUpdateCategorie";

function CategoriesDashboard() {
  const [listCategories, setListCategories] = useState(true);
  const [addCategories, setAddCategories] = useState(false);
  const [modifyCategories, setModifyCategories] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({});

  const { data } = useGetCategoriesQuery();

  const categories = data?.getCategories;

  return (
    <>
      <div className="my-28 mx-auto h-full flex flex-col w-4/5 max-w-4xl">
        <div className="flex w-fit gap-8">
          <h1 className="type-h1 header__title text-left ">
            GESTION DES CATEGORIES
          </h1>
        </div>
        <div className="bg-cream w-full h-fit min-h-[75%] mt-10">
          {listCategories && (
            <div className="flex flex-col w-full h-full gap-4 pb-8">
              <div className="p-4 w-16 self-end">
                <button
                  onClick={() => (
                    setAddCategories(true), setListCategories(false)
                  )}
                >
                  <img src={add_icon} alt="" />
                </button>
              </div>
              {categories?.map((category) => (
                <div
                  className="h-12 w-72 px-6 self-center rounded bg-orange flex justify-between items-center"
                  key={category.id}
                >
                  <p className="w-4/5">{category.name}</p>
                  <button
                    onClick={() => (
                      setModifyCategories(true),
                      setListCategories(false),
                      setCurrentCategory(category)
                    )}
                  >
                    <img src={modify_icon} alt="" className="w-6" />
                  </button>
                </div>
              ))}
            </div>
          )}
          {addCategories && (
            <div>
              <FormAddCategory
                setAddCategories={setAddCategories}
                setListCategories={setListCategories}
              />
            </div>
          )}
          {modifyCategories && (
            <div>
              <p>FORMULAIRE MODIFICATION CATEGORIE</p>
              <FormUpdateCategory currentCategory={currentCategory} />
              <button
                onClick={() => (
                  setModifyCategories(false), setListCategories(true)
                )}
              >
                Enregistrer
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CategoriesDashboard;
