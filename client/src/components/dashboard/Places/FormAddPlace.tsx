import React from "react";
import { Formik, Field, Form } from "formik";
import {
  PlaceInput,
  useCreatePlaceMutation,
  useGetProfileQuery,
  useGetCitiesQuery,
  useGetCategoriesQuery,
  GetCitiesWithPlacesDocument,
} from "../../../gql/generated/schema";
import { toast } from "react-hot-toast";
import {
  validateDescription,
  validateLatitude,
  validateLongitude,
  validateName,
  validatePicture,
} from "../../../utils/formValidator";

interface FormAddPlacesProps {
  setPlaces: React.Dispatch<React.SetStateAction<boolean>>;
  setAddPlaces: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FormAddPlace({
  setAddPlaces,
  setPlaces,
}: FormAddPlacesProps) {
  const [createPlace] = useCreatePlaceMutation({
    errorPolicy: "all",
  });

  const { data: currentUser } = useGetProfileQuery({
    errorPolicy: "ignore",
  });
  const userManagedCities = currentUser?.profile.managedCities?.map(
    (city) => city.name
  );

  const { data: allCategories } = useGetCategoriesQuery();
  const categories = allCategories?.getCategories;

  const { data: allCities } = useGetCitiesQuery();
  const cities = allCities?.getCities;
  const initialCity = cities?.slice(0, 1).shift();
  const initialCategory = categories?.slice(0, 1).shift();

  const handleSubmit = (values: PlaceInput) => {
    createPlace({
      variables: {
        data: {
          cityId: values.cityId,
          name: values.name,
          latitude: values.latitude,
          longitude: values.longitude,
          adress: values.adress,
          website: values.website,
          picture: values.picture,
          description: values.description,
          categoryId: values.categoryId,
        },
      },
      refetchQueries: [{ query: GetCitiesWithPlacesDocument }],
    }).then((res) => {
      // error handling in .then is due to Formik, errors can't be catch in .catch, because of on submit formik method
      if (res.errors) {
        res.errors.forEach(({ message }) => {
          if (message === "Places already exists") {
            toast.error("Le point d'interet existe déjà");
          } else {
            toast.error(message);
          }
        });
      } else {
        toast.success("Point d'intéret ajouté");
        setAddPlaces(false);
        setPlaces(true);
      }
    });
  };

  return (
    <div className="container mx-auto p-6 bg-cream flex flex-col">
      <h1 className="type-h2 text-center">Ajouter une place</h1>
      {initialCity && initialCategory && (
        <Formik
          initialValues={{
            cityId: initialCity.id,
            name: "",
            picture: "",
            description: "",
            latitude: "",
            longitude: "",
            website: "",
            adress: "",
            categoryId: initialCategory.id,
          }}
          onSubmit={(values: PlaceInput) => {
            console.log(values);
            handleSubmit(values);
          }}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form className="container flex flex-col gap-2 w-3/4">
              <label htmlFor="name" className="modal__input--label">
                Ville
              </label>
              <Field
                as="select"
                name="cityId"
                type="number"
                className={`modal__input ${
                  errors.name && touched.name ? "border-red" : "border-current"
                }`}
                onChange={(e: any) => {
                  setFieldValue("cityId", parseInt(e.target.value));
                }}
              >
                {cities?.map((city) => (
                  <>
                    {userManagedCities?.includes(city.name) && (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    )}
                  </>
                ))}
              </Field>

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

              <label htmlFor="name" className="modal__input--label">
                Website
              </label>
              <Field
                name="website"
                placeholder="https://mon-site.net"
                className={`modal__input ${
                  errors.name && touched.name ? "border-red" : "border-current"
                }`}
                label="website"
              />
              {errors.website && touched.website && (
                <div className="text-red">{errors.website}</div>
              )}

              <label htmlFor="name" className="modal__input--label">
                Address
              </label>
              <Field
                name="adress"
                placeholder="52 Champs Élysées, 75008 Paris"
                label="adress"
                className={`modal__input ${
                  errors.name && touched.name ? "border-red" : "border-current"
                }`}
              />

              <label htmlFor="name" className="modal__input--label">
                Catégorie
              </label>
              <Field
                as="select"
                name="categoryId"
                className={`modal__input ${
                  errors.name && touched.name ? "border-red" : "border-current"
                }`}
                onChange={(e: any) => {
                  setFieldValue("categoryId", parseInt(e.target.value));
                }}
              >
                {categories?.map((category) => (
                  <option value={category.id}>{category.name}</option>
                ))}
              </Field>

              <button type="submit" className="button--primary mt-6">
                Enregistrer
              </button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}
