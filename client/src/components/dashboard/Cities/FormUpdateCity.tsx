import React from "react";
import { Formik, Field, Form } from "formik";
import {
  CityUpdate,
  useUpdateCityMutation,
  GetCitiesDocument,
  useGetOneCitybyNameQuery,
} from "../../../gql/generated/schema";
import { toast } from "react-hot-toast";

interface FormUpdateCityProps {
  setListCities: React.Dispatch<React.SetStateAction<boolean>>;
  setModifyCities: React.Dispatch<React.SetStateAction<boolean>>;
  currentCity: string;
}

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
    picture = "L'image doit être une URL";
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
  } else if (!latitude.includes(".")) {
    error = "La latitude doit contenir un point (.)";
  }
  return error;
}

function validateLongitude(longitude: string) {
  let error;
  if (!longitude) {
    error = "La longitude est obligatoire";
  } else if (!longitude.includes(".")) {
    error = "La longitude doit contenir un point (.)";
  }
  return error;
}

export default function FormUpdateCity({
  setListCities,
  currentCity,
  setModifyCities,
}: FormUpdateCityProps) {
  const [updateCity] = useUpdateCityMutation({
    errorPolicy: "all",
  });

  const { data } = useGetOneCitybyNameQuery({
    variables: {
      name: currentCity,
    },
  });

  const thisCity = data?.getOneCitybyName;
  const thisCityId = thisCity?.id as const;

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
        updateCityId: { thisCityIdString },
      },
      refetchQueries: [{ query: GetCitiesDocument }],
    }).then((res) => {
      setModifyCities(false);
      setListCities(true);
      // error handling in .then is due to Formik, errors can't be catch in .catch, because of on submit formik method
      console.log(res);
      if (res.errors) {
        res.errors.forEach(({ message }) => {
          console.log(message);
          toast.error(message);
        });
      }
    });
  };

  return (
    <div className="container mx-auto p-6 bg-cream flex flex-col">
      <h1 className="type-h2 text-center">Modifier {thisCity?.name}</h1>
      <Formik
        initialValues={{
          enableReinitialize: true,
          name: thisCity?.name,
          picture: thisCity?.picture,
          description: thisCity?.description,
          latitude: thisCity?.latitude,
          longitude: thisCity?.longitude,
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
