import React, { FormEvent, useState } from "react";
import { useCreateCategoryMutation } from "../gql/generated/schema";

function FormAddCategory() {
  const [name, setName] = useState("");
  const [picto, setPicto] = useState("");
  const [createCategory] = useCreateCategoryMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await createCategory({
      variables: {
        data: { name, picto },
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="container flex flex-col w-50">
      <label htmlFor="name" className="modal__input--label">
        Nom
        <input
          type="text"
          name="name"
          id="name"
          className="modal__input shadow shadow-green mb-4"
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label htmlFor="picto" className="modal__input--label">
        Pictogramme
        <input
          type="url"
          name="picto"
          id="picto"
          className="modal__input shadow shadow-green mb-4"
          onChange={(e) => setPicto(e.target.value)}
        />
      </label>
      <input type="submit" className="button--primary mt-6" />
    </form>
  );
}

export default FormAddCategory;
