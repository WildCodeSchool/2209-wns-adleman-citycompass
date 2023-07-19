import React from "react";
import { FormUpdateUserRightsProps } from "./FormUpdateRole";
import { Field, Form, Formik } from "formik";
import {
  useGetCitiesQuery,
  useUserManagedCityUpdateMutation,
} from "../../../gql/generated/schema";
import { toast } from "react-hot-toast";

interface CityIdValues {
  cities: string[] | number[];
}

export function FormUpdateManagedCities({
  setListUsers,
  setModifyUsers,
  userToUpdate,
}: FormUpdateUserRightsProps) {
  const [updateManagedCities] = useUserManagedCityUpdateMutation({
    errorPolicy: "all",
  });

  const { data: citiesData } = useGetCitiesQuery();

  const existingCities = citiesData?.getCities;

  // const { data: managedcitiesDatas } = useGetUserManagedCitiesQuery({
  //   variables: { userId: userToUpdate.id },
  // });
  // const currentManagedCities = managedcitiesDatas?.getUserManagedCities;

  // console.log("currentManagedcities", currentManagedCities);

  const handleSubmit = async (values: CityIdValues) => {
    const correctValues = values.cities.map((value) => {
      if (typeof value !== "string") return value;
      return parseInt(value, 10);
    });

    updateManagedCities({
      variables: {
        userId: userToUpdate.id,
        data: { managedCitiesId: correctValues },
      },
    }).then((res) => {
      if (res.errors) {
        res.errors.forEach(({ message }) => {
          toast.error(message);
        });
      }
      toast.success("changement bien effectué");
      setListUsers(true);
      setModifyUsers(false);
    });
  };

  return (
    <div>
      <h3 className="type-h4 text-center py-6">
        Changer les villes autorisées
      </h3>
      <Formik
        initialValues={{
          cities: [0],
        }}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="flex flex-col gap-4 my-8">
            <div
              role="group"
              aria-labelledby="checkbox-group"
              className="flex flex-row gap-4 justify-center align-center"
            >
              {existingCities?.map((city) => (
                <label
                  key={`${city.id}`}
                  className="flex gap-3 py-4 px-6 border-2 border-gray rounded
                bg-white cursor-pointer hover:bg-orange"
                >
                  <Field
                    type="checkbox"
                    name="cities"
                    value={city.id.toString()}
                  />
                  {city.name}
                </label>
              ))}
            </div>
            <button
              type="submit"
              className="button--primary mt-6 w-1/4 self-center"
            >
              Enregistrer
            </button>
            <div
              className="modal__input--label text-s mt-3 text-center cursor-pointer"
              onClick={() => {
                setListUsers(true);
                setModifyUsers(false);
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
