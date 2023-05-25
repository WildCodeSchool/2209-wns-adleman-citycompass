import React from "react";
import { Formik, Field, Form } from "formik";
import {
  CityInput,
  useCreateCityMutation,
  GetCitiesDocument,
} from "../../../gql/generated/schema";
import { toast } from "react-hot-toast";

interface FormAddCityProps {
  setListCities: React.Dispatch<React.SetStateAction<boolean>>;
  setAddCities: React.Dispatch<React.SetStateAction<boolean>>;
}

// validations

function validateName(name: string) {
  let error;
  if (!name) {
    error = "Le nom est obligatoire";
  } else if (name.length < 2) {
    error = "Le nom doit avoir au moins 2 caractères";
  } else if (name.trim() === "") {
    error = "Le nom est invalide";
  }
  return error;
}

function validatePicture(picture: string) {
  let error;
  if (!picture) {
    error = "L'image est obligatoire";
  } else if (!/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(picture)) {
    error = "L'image doit être une URL";
  }
  return error;
}

function validateDescription(description: string) {
  let error;
  if (!description) {
    error = "La description est obligatoire";
  } else if (description.length < 10) {
    error = "La description doit faire au moins 10 caractères";
  }
  return error;
}

function validateLatitude(latitude: string) {
  let error;
  if (!latitude) {
    error = "La latitude est obligatoire";
  } else if (!/^-?([1-8]?[0-9](\.[0-9]+)?|90(\.0+)?)/.test(latitude)) {
    error = "La donnée doit être une latitude";
  }
  return error;
}

function validateLongitude(longitude: string) {
  let error;
  if (!longitude) {
    error = "La longitude est obligatoire";
  } else if (
    !/^-?([1]?[1-7][1-9]|[1]?[1-8][0]|[1-9]?[0-9])\.{1}\d{1,6}/.test(longitude)
  ) {
    error = "La donnée doit être une longitude";
  }
  return error;
}

// form building with Formik https://formik.org/docs/guides/validation

export default function FormAddCity({
  setAddCities,
  setListCities,
}: FormAddCityProps) {
  const [createCity] = useCreateCityMutation({
    errorPolicy: "all",
  });

  const handleSubmit = (values: CityInput) => {
    createCity({
      variables: {
        data: {
          name: values.name,
          picture: values.picture,
          description: values.description,
          latitude: values.latitude,
          longitude: values.longitude,
        },
      },
      refetchQueries: [{ query: GetCitiesDocument }],
    }).then((res) => {
      // error handling in .then is due to Formik, errors can't be catch in .catch, because of on submit formik method
      if (res.errors) {
        res.errors.forEach(({ message }) => {
          if (message === "City already exists") {
            toast.error("La ville existe déjà");
          } else {
            toast.error(message);
          }
        });
      } else {
        toast.success("Ville ajoutée");
        setAddCities(false);
        setListCities(true);
      }
    });
  };

  return (
    <div className="container mx-auto p-6 bg-cream flex flex-col">
      <h1 className="type-h2 text-center">Ajouter une ville</h1>
      <Formik
        initialValues={{
          name: "",
          picture: "",
          description: "",
          latitude: "",
          longitude: "",
        }}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ errors, touched }) => (
          <Form className="container flex flex-col gap-2 w-3/4">
            <label htmlFor="name" className="modal__input--label">
              Nom
            </label>
            <Field
              name="name"
              validate={validateName}
              placeholder="nom"
              className={`modal__input ${
                errors.name && touched.name ? "border-red" : "border-current"
              }`}
            ></Field>
            {errors.name && touched.name && (
              <div className="text-red">{errors.name}</div>
            )}
            <label htmlFor="name" className="modal__input--label">
              Picture
            </label>
            <Field
              name="picture"
              validate={validatePicture}
              placeholder="https://mon-image.net"
              className={`modal__input ${
                errors.name && touched.name ? "border-red" : "border-current"
              }`}
              label="Picture"
            />
            {errors.picture && touched.picture && (
              <div className="text-red">{errors.picture}</div>
            )}
            <label htmlFor="name" className="modal__input--label">
              Description
            </label>
            <Field
              as="textarea"
              name="description"
              validate={validateDescription}
              placeholder="Description"
              className={`modal__input ${
                errors.name && touched.name ? "border-red" : "border-current"
              }`}
              label="Description"
            />
            {errors.description && touched.description && (
              <div className="text-red">{errors.description}</div>
            )}
            <label htmlFor="name" className="modal__input--label">
              Latitude
            </label>
            <Field
              name="latitude"
              validate={validateLatitude}
              placeholder="13.12.13.12"
              className={`modal__input ${
                errors.name && touched.name ? "border-red" : "border-current"
              }`}
              label="Latitude"
            />
            {errors.latitude && touched.latitude && (
              <div className="text-red">{errors.latitude}</div>
            )}
            <label htmlFor="name" className="modal__input--label">
              Longitude
            </label>
            <Field
              name="longitude"
              validate={validateLongitude}
              placeholder="13.12.13.12"
              className={`modal__input ${
                errors.name && touched.name ? "border-red" : "border-current"
              }`}
              label="Longitude"
            />
            {errors.longitude && touched.longitude && (
              <div className="text-red">{errors.longitude}</div>
            )}
            <button type="submit" className="button--primary mt-6">
              Enregistrer
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
