import React from "react";
import { UserProps } from "./AccueilDashboard";

interface FormUpdateUserProps {
  user: UserProps;
}

// form building with Formik https://formik.org/docs/guides/validation

export function UserInformations({ user }: FormUpdateUserProps) {
  return (
    <div className="container py-6 bg-cream flex flex-col w-fit">
      <h3 className="type-h3">Informations de profil</h3>
      <div className="my-6">
        <ul className="flex flex-col gap-8 ml-5">
          <li className="list-disc">Nom : {user.lastname}</li>
          <li className="list-disc">Prénom : {user.firstname}</li>
          <li className="list-disc">Avatar : {user.picture}</li>
          <li className="list-disc">Email : {user.email}</li>
          <li className="list-disc">Role: {user.role}</li>
        </ul>
      </div>
    </div>
  );
}
