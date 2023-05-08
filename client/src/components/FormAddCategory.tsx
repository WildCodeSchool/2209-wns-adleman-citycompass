import React from "react";
import { useFormik } from "formik";
import { useCreateCategoryMutation } from "../gql/generated/schema";

interface FormAddCategoryType {
  name: string;
  picto: string;
}

interface FormAddCategoryErrorsType {
  name?: string;
  picto?: string;
}

// validations

const validate = (values: FormAddCategoryType) => {
  const errors: FormAddCategoryErrorsType = {};
  if (!values.name) {
    errors.name = "Le nom est obligatoire";
  } else if (values.name.length < 2) {
    errors.name = "Le nom doit avoir au moins 2 caractères";
  } else if (values.name.trim() === "") {
    errors.name = "Le nom est invalide";
  }

  if (!values.picto) {
    errors.picto = "Le pictogramme est obligatoire";
  } else if (!/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(values.picto)) {
    errors.picto = "Le pictogramme doit être une URL";
  }
  return errors;
};

// form building

export default function FormAddCategory() {
  const [createCategory] = useCreateCategoryMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      picto: "",
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      createCategory({
        variables: {
          data: { name: values.name, picto: values.picto },
        },
      });
    },
  });

  return (
    <div>
      <h1>Ajouter une catégorie</h1>
      <form
        onSubmit={formik.handleSubmit}
        className="container flex flex-col w-50"
      >
        <label htmlFor="name" className="modal__input--label"></label>
        Nom
        <input
          type="text"
          name="name"
          id="name"
          className="modal__input shadow shadow-green mb-4"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        {formik.errors.name ? (
          <div className="text-red">{formik.errors.name}</div>
        ) : null}
        <label htmlFor="picto" className="modal__input--label"></label>
        Pictogramme
        <input
          type="url"
          name="picto"
          id="picto"
          className="modal__input shadow shadow-green mb-4"
          onChange={formik.handleChange}
          value={formik.values.picto}
        />
        {formik.errors.picto ? (
          <div className="text-red">{formik.errors.picto}</div>
        ) : null}
        <button type="submit" className="button--primary mt-6">
          Enregistrer
        </button>
      </form>
    </div>
  );
}
