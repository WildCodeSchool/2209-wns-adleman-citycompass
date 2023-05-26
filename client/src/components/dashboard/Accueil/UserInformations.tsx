import React from "react";
import { UserProps } from "./AccueilDashboard";

interface FormUpdateUserProps {
  user: UserProps;
}

// form building with Formik https://formik.org/docs/guides/validation

export function UserInformations({ user }: FormUpdateUserProps) {
  return (
    <div className="container mx-auto p-6 bg-cream flex flex-col">
      <h3 className="type-h3 text-center">Données personnelles</h3>
      <div className="w-1/2 my-6">
        <ul className="flex flex-col gap-8">
          <li className="list-disc">Nom : {user.lastname}</li>
          <li className="list-disc">Prénom : {user.firstname}</li>
          <li className="list-disc">Avatar : {user.picture}</li>
          <li className="list-disc">Email : {user.email}</li>
        </ul>
      </div>
    </div>
  );
}
