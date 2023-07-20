import {
  useUpdatePlaceMutation,
  PlaceUpdate,
  useGetCategoriesQuery,
  useGetCitiesQuery,
  useGetProfileQuery,
  GetCitiesWithPlacesDocument,
} from "../../../gql/generated/schema";
import { Formik, Field, Form } from "formik";
import { PlaceProps } from "./PlacesDashboard";
import { toast } from "react-hot-toast";
import {
  validateDescription,
  validateLatitude,
  validateLongitude,
  validateName,
  validatePicture,
} from "../../../utils/formValidator";
import { CitiesHome } from "../../../services/interfaces";

interface updatePlaceProps {
  currentPlace: PlaceProps;
  setPlaces: React.Dispatch<React.SetStateAction<boolean>>;
  setModifyPlaces: React.Dispatch<React.SetStateAction<boolean>>;
}

function FormUpdatePlace({
  currentPlace,
  setPlaces,
  setModifyPlaces,
}: updatePlaceProps) {
  const { data: allCategories } = useGetCategoriesQuery();
  const categories = allCategories?.getCategories;

  const { data } = useGetCitiesQuery();
  let cities: CitiesHome[] = [];
  if (data !== undefined) {
    cities = data.getCities;
  }

  const { data: currentUser } = useGetProfileQuery({
    errorPolicy: "ignore",
  });
  const userManagedCities = currentUser?.profile.managedCities?.map(
    (city) => city.name
  );

  const [updatePlace] = useUpdatePlaceMutation({
    errorPolicy: "all",
  });
  const handleSubmit = (values: PlaceUpdate) => {
    updatePlace({
      variables: {
        updatePlaceId: currentPlace.id,
        data: {
          name: values.name,
          adress: values.adress,
          latitude: values.latitude,
          longitude: values.longitude,
          picture: values.picture,
          description: values.description,
          website: values.website,
          categoryId: values.categoryId,
          cityId: values.cityId,
        },
      },
      refetchQueries: [{ query: GetCitiesWithPlacesDocument }],
    }).then((res) => {
      // error handling in .then is due to Formik, errors can't be catch in .catch, because of on submit formik method
      if (res.errors) {
        res.errors.forEach(({ message }: any) => {
          toast.error(message);
        });
      } else {
        toast.success("Point d'intérêt mis à jour");
        setModifyPlaces(false);
        setPlaces(true);
      }
    });
  };

  return (
    <div className="container mx-auto p-6 bg-cream flex flex-col">
      <h1 className="type-h2 text-center">Modifier {currentPlace.name}</h1>
      <Formik
        enableReinitialize={true}
        initialValues={{
          name: currentPlace.name,
          adress: currentPlace.adress,
          latitude: currentPlace.latitude,
          longitude: currentPlace.longitude,
          picture: currentPlace.picture,
          description: currentPlace.description,
          website: currentPlace.website,
          categoryId: currentPlace.categoryId,
          cityId: currentPlace.cityId,
        }}
        onSubmit={(values: PlaceUpdate) => handleSubmit(values)}
      >
        {({ errors, touched, setFieldValue }) => (
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

            <label htmlFor="name" className="modal__input--label">
              Address
            </label>
            <Field
              name="adress"
              placeholder="52 Champs Élysées, 75008 Paris"
              className={`modal__input ${
                errors.name && touched.name ? "border-red" : "border-current"
              }`}
            ></Field>
            {errors.adress && touched.adress && (
              <div className="text-red">{errors.adress}</div>
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
            ></Field>
            {errors.website && touched.website && (
              <div className="text-red">{errors.website}</div>
            )}

            <label htmlFor="name" className="modal__input--label">
              Category
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

            <label htmlFor="name" className="modal__input--label">
              City
            </label>
            <Field
              as="select"
              name="cityId"
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

            <button type="submit" className="button--primary mt-6">
              Enregistrer
            </button>
            <div
              className="modal__input--label hover:text-green text-s mt-3 text-center cursor-pointer"
              onClick={() => {
                setPlaces(true);
                setModifyPlaces(false);
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

export default FormUpdatePlace;
