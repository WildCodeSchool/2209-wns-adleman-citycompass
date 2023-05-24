import { Formik, Field, Form } from "formik";
import React from "react";
import {
  CategoryUpdate,
  GetCategoriesDocument,
  useUpdateCategoryMutation,
} from "../../../gql/generated/schema";
import { toast } from "react-hot-toast";

// validations

function validateName(name: string) {
  let error;
  if (name.length < 2) {
    error = "Le nom doit avoir au moins 2 caractères";
  } else if (name.trim() === "") {
    error = "Le nom est invalide";
  }
  return error;
}

function validatePicto(picto: string) {
  let error;
  if (!/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(picto)) {
    picto = "Le pictogramme doit être une URL";
  }
  return error;
}

// form building with Formik https://formik.org/docs/guides/validation

export function FormUpdateCategory({ currentCategory }: any) {
  console.log("L'ID", currentCategory.id);
  const [updateCategory] = useUpdateCategoryMutation({
    errorPolicy: "all",
  });
  const handleSubmit = (values: CategoryUpdate) => {
    console.log(values);
    updateCategory({
      variables: {
        data: { name: values.name, picto: values.picto },
        updateCategoryId: currentCategory.id,
      },
      refetchQueries: [{ query: GetCategoriesDocument }],
    }).then((res) => {
      console.log(res);
      if (res.errors) {
        res.errors.forEach(({ message }) => {
          toast.error(message);
        });
      }
    });
  };

  return (
    <div className="container mx-auto p-6 bg-cream flex flex-col">
      <h1 className="type-h2 text-center">Modifier une catégorie</h1>
      <Formik
        initialValues={{
          name: "",
          picto: "",
        }}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ errors, touched }) => (
          <Form className="container flex flex-col gap-2 w-3/4 md:w-2/5">
            <label htmlFor="name" className="modal__input--label">
              Nom
            </label>
            <Field
              name="name"
              validate={validateName}
              className={`modal__input ${
                errors.name && touched.name ? "border-red" : "border-current"
              }`}
            ></Field>
            {/* {errors.name && touched.name && (
              <div className="text-red">{errors.name}</div>
            )} */}
            <label htmlFor="name" className="modal__input--label">
              Pictogramme
            </label>
            <Field
              name="picto"
              validate={validatePicto}
              className={`modal__input ${
                errors.name && touched.name ? "border-red" : "border-current"
              }`}
              label="Pictogramme"
            />
            {/* {errors.picto && touched.picto && (
              <div className="text-red">{errors.picto}</div>
            )} */}
            <button type="submit" className="button--primary mt-6">
              Enregistrer
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
