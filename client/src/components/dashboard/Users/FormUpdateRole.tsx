import React from "react";
import { Formik, Field, Form } from "formik";
import { userToUpdateProps } from "./UsersDashboard";
import { UserInformations } from "../Accueil/UserInformations";
import { UserRoleUpdate } from "../../../gql/generated/schema";
import { useUpdateUserRoleMutation } from "../../../gql/generated/schema";
import { toast } from "react-hot-toast";

interface FormUpdateRoleProps {
  setListUsers: React.Dispatch<React.SetStateAction<boolean>>;
  setModifyUsers: React.Dispatch<React.SetStateAction<boolean>>;
  userToUpdate: userToUpdateProps;
}

export function FormUpdateRole({
  setListUsers,
  setModifyUsers,
  userToUpdate,
}: FormUpdateRoleProps) {
  const [updateRole] = useUpdateUserRoleMutation({ errorPolicy: "all" });
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
      setListUsers(true);
      setModifyUsers(false);
    });
  };

  return (
    <div className="container mx-auto p-6 bg-cream flex flex-col">
      <UserInformations user={userToUpdate} />
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
              className="flex flex-row gap-4 justify-center align-center"
            >
              <label
                htmlFor="superadmin"
                className="flex gap-3 py-4 px-6 border-2 border-gray rounded
                bg-white cursor-pointer hover:bg-orange"
              >
                <Field
                  type="radio"
                  name="role"
                  value="superadmin"
                  id="superadmin"
                ></Field>
                superadmin
              </label>

              <label
                htmlFor="admin"
                className="flex gap-3 py-4 px-6 border-2 border-gray rounded bg-white cursor-pointer"
              >
                <Field
                  type="radio"
                  name="role"
                  value="admin"
                  id="admin"
                ></Field>
                admin
              </label>
              <label
                htmlFor="contributor"
                className="flex gap-3 py-4 px-6 border-2 border-gray rounded bg-white cursor-pointer"
              >
                <Field
                  type="radio"
                  name="role"
                  value="contributor"
                  id="contributor"
                ></Field>
                contributor
              </label>

              <label
                htmlFor="visitor"
                className="flex gap-3 py-4 px-6 border-2 border-gray rounded bg-white cursor-pointer"
              >
                <Field
                  type="radio"
                  name="role"
                  value="visitor"
                  id="visitor"
                ></Field>
                visitor
              </label>
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
