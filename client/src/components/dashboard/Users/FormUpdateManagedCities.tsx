import React from "react";
import { FormUpdateUserRightsProps } from "./FormUpdateRole";
import { Field, Form, Formik } from "formik";
import {
  GetUserManagedCitiesDocument,
  useGetProfileQuery,
  useGetUserManagedCitiesQuery,
  useUserManagedCityUpdateMutation,
} from "../../../gql/generated/schema";
import { toast } from "react-hot-toast";
import {
  isAccessAuthorized,
  isManagedCitiesNotEmpty,
  isUserNotAVisitor,
} from "../../../utils/isAccessAuthorized";

export function FormUpdateManagedCities({
  setListUsers,
  setModifyUsers,
  userToUpdate,
}: FormUpdateUserRightsProps) {
  const [updateManagedCities] = useUserManagedCityUpdateMutation({
    errorPolicy: "all",
  });

  const { data } = useGetProfileQuery({
    errorPolicy: "ignore",
  });

  const currentUser = data?.profile;
  let currentUserId = 0;
  if (currentUser !== undefined) {
    currentUserId = currentUser.id;
  }

  const { data: authorizedCitiesData } = useGetUserManagedCitiesQuery({
    variables: { userId: currentUserId },
    fetchPolicy: "network-only",
  });

  const authorizedCities = authorizedCitiesData?.getUserManagedCities;

  const { data: managedcitiesDatas } = useGetUserManagedCitiesQuery({
    variables: { userId: userToUpdate.id },
    fetchPolicy: "network-only",
  });

  const currentManagedCities = managedcitiesDatas?.getUserManagedCities;
  const currentManagedCitiesNames: string[] = [];
  currentManagedCities?.managedCities?.map((city) =>
    currentManagedCitiesNames.push(city.name)
  );

  const handleSubmit = async (values: string[]) => {
    updateManagedCities({
      variables: {
        userId: userToUpdate.id,
        data: { managedCitiesNames: values },
      },
      refetchQueries: [{ query: GetUserManagedCitiesDocument }],
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
    <>
      <div className="container mx-auto p-6 bg-cream flex flex-col">
        {isAccessAuthorized(currentUser, userToUpdate) &&
        isUserNotAVisitor(userToUpdate) &&
        isManagedCitiesNotEmpty(authorizedCities?.managedCities) ? (
          <>
            <h3 className="type-h4 text-center py-6">
              Changer les villes autorisées
            </h3>
            <Formik
              initialValues={{
                cities: currentManagedCitiesNames,
              }}
              onSubmit={(values) => {
                handleSubmit(values.cities);
              }}
              enableReinitialize
            >
              {({ values }) => (
                <Form className="flex flex-col gap-4 my-8">
                  <div
                    role="group"
                    aria-labelledby="checkbox-group"
                    className="flex flex-row gap-4 justify-center align-center"
                  >
                    {authorizedCities?.managedCities?.map((city) => (
                      <label
                        key={`${city.name}`}
                        className="flex gap-3 py-4 px-6 border-2 border-gray rounded
                bg-white cursor-pointer hover:bg-orange"
                      >
                        <Field
                          type="checkbox"
                          name="cities"
                          value={city.name}
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
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
