import React from "react";
import { useFormik } from "formik";
import { useCreateCategoryMutation } from "../gql/generated/schema";

export default function FormAddCategory() {
  const [createCategory] = useCreateCategoryMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      picto: "",
    },
    onSubmit: (values) => {
      createCategory({
        variables: {
          data: { name: values.name, picto: values.picto },
        },
      });
    },
  });

  return (
    <div>
      <h1>Titre du formulaire</h1>
      <form
        onSubmit={formik.handleSubmit}
        className="container flex flex-col w-50"
      >
        <label htmlFor="name" className="modal__input--label">
          Nom
          <input
            type="text"
            name="name"
            id="name"
            className="modal__input shadow shadow-green mb-4"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
        </label>
        <label htmlFor="picto" className="modal__input--label">
          Pictogramme
          <input
            type="url"
            name="picto"
            id="picto"
            className="modal__input shadow shadow-green mb-4"
            onChange={formik.handleChange}
            value={formik.values.picto}
          />
        </label>
        <button type="submit" className="button--primary mt-6">
          Submit
        </button>
      </form>
    </div>
  );
}
