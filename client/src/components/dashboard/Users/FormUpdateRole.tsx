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
      <Formik
        initialValues={{ role: userToUpdate.role }}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form className="flex flex-col">
            <div role="group" aria-labelledby="my-radio-group">
              <label htmlFor="role">
                <Field type="radio" name="role" value="superadmin"></Field>
                superadmin
              </label>
              <label htmlFor="role">
                <Field type="radio" name="role" value="admin"></Field>admin
              </label>
              <label htmlFor="role">
                <Field type="radio" name="role" value="contributor"></Field>
                contributor
              </label>
              <label htmlFor="role">
                <Field type="radio" name="role" value="visitor"></Field>
                visitor
              </label>
            </div>
            <button type="submit" className="button--primary mt-6">
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
