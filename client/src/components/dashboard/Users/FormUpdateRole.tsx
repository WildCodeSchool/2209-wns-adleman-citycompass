import React from "react";
import { Formik, Field, Form } from "formik";
import { userToUpdateProps } from "./UsersDashboard";
import {
  UserRoleUpdate,
  useGetProfileQuery,
} from "../../../gql/generated/schema";
import { useUpdateUserRoleMutation } from "../../../gql/generated/schema";
import { toast } from "react-hot-toast";
import { rolesAdmin, allRoles } from "../../../utils/userRoles";
import { isAccessAuthorized } from "../../../utils/isAccessAuthorized";
import { validateRole } from "../../../utils/formValidator";

export interface FormUpdateUserRightsProps {
  setListUsers: React.Dispatch<React.SetStateAction<boolean>>;
  setModifyUsers: React.Dispatch<React.SetStateAction<boolean>>;
  userToUpdate: userToUpdateProps;
}

export function FormUpdateRole({
  setListUsers,
  setModifyUsers,
  userToUpdate,
}: FormUpdateUserRightsProps) {
  const [updateRole] = useUpdateUserRoleMutation({ errorPolicy: "all" });

  const { data } = useGetProfileQuery({
    errorPolicy: "ignore",
  });

  const currentUser = data?.profile;

  const handleSubmit = async (values: UserRoleUpdate) => {
    updateRole({
      variables: {
        data: { role: values.role },
        updateUserRoleId: userToUpdate.id,
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
    <>
      <div className="container mx-auto p-6 bg-cream flex flex-col">
        {isAccessAuthorized(currentUser, userToUpdate) ? (
          <>
            <h3 className="type-h4 text-center py-6">
              Changer le role de l'utilisateur
            </h3>
            <Formik
              initialValues={{ role: userToUpdate.role }}
              onSubmit={handleSubmit}
            >
              {({ values }) => (
                <Form className="flex flex-col gap-4 my-8">
                  <div
                    role="group"
                    aria-labelledby="my-radio-group"
                    className="flex flex-wrap gap-4 justify-center align-center"
                  >
                    {currentUser?.role === "superadmin" &&
                      allRoles?.map((e) => (
                        <label
                          htmlFor={`${e}`}
                          key={`${e}`}
                          className="flex gap-3 py-4 px-6 border-2 border-gray rounded
                bg-white cursor-pointer hover:bg-orange"
                        >
                          <Field
                            type="radio"
                            name="role"
                            validate={validateRole}
                            value={`${e}`}
                            id={`${e}`}
                          ></Field>
                          {e}
                        </label>
                      ))}
                    {currentUser?.role === "admin" &&
                      rolesAdmin?.map((e) => (
                        <label
                          htmlFor={`${e}`}
                          key={`${e}`}
                          className="flex gap-3 py-4 px-6 border-2 border-gray rounded
                bg-white cursor-pointer hover:bg-orange"
                        >
                          <Field
                            type="radio"
                            name="role"
                            value={`${e}`}
                            id={`${e}`}
                          ></Field>
                          {e}
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
                    className="modal__input--label hover:text-green text-s mt-3 text-center cursor-pointer"
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
          <div>
            <p className="text-center font-semibold text-red ">
              Seuls les superadmin peuvent gérer les droits de cet utilisateur
            </p>
            <div
              className="button--primary w-1/4 text-center mx-auto my-6"
              onClick={() => {
                setListUsers(true);
                setModifyUsers(false);
              }}
            >
              Retour à la liste
            </div>
          </div>
        )}
      </div>
    </>
  );
}
