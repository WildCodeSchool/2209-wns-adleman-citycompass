import React from "react";
import { Formik, Field, Form } from "formik";
import {
  CityUpdate,
  useUpdateCityMutation,
  GetCitiesDocument,
} from "../../../gql/generated/schema";
import { toast } from "react-hot-toast";
import { CityProps } from "./CitiesDashboard";
import {
  validateDescription,
  validateLatitude,
  validateLongitude,
  validateName,
  validatePicture,
} from "../../../utils/formValidator";

interface FormUpdateCityProps {
  setListCities: React.Dispatch<React.SetStateAction<boolean>>;
  setModifyCities: React.Dispatch<React.SetStateAction<boolean>>;
  currentCity: CityProps;
}

export default function FormUpdateCity({
  setListCities,
  currentCity,
  setModifyCities,
}: FormUpdateCityProps) {
  const [updateCity] = useUpdateCityMutation({
    errorPolicy: "all",
  });

  const handleSubmit = (values: CityUpdate) => {
    updateCity({
      variables: {
        data: {
          name: values.name,
          picture: values.picture,
          description: values.description,
          latitude: values.latitude,
          longitude: values.longitude,
        },
        updateCityId: currentCity.id,
      },
      refetchQueries: [{ query: GetCitiesDocument }],
    }).then((res) => {
      // error handling in .then is due to Formik, errors can't be catch in .catch, because of on submit formik method
      if (res.errors) {
        res.errors.forEach(({ message }) => {
          toast.error(message);
        });
      } else {
        toast.success("Ville mise à jour");
        setModifyCities(false);
        setListCities(true);
      }
    });
  };

  return (
    <div className="container mx-auto p-6 bg-cream flex flex-col">
      <h1 className="type-h2 text-center">Modifier {currentCity.name}</h1>
      <Formik
        enableReinitialize={true}
        initialValues={{
          name: currentCity.name,
          picture: currentCity.picture,
          description: currentCity.description,
          latitude: currentCity.latitude,
          longitude: currentCity.longitude,
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
            <div
              className="modal__input--label hover:text-green text-s mt-3 text-center cursor-pointer"
              onClick={() => {
                setListCities(true);
                setModifyCities(false);
              }}
            >
              Annuler
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
