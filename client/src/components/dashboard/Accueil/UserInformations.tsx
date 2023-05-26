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
      <div className="flex flex-col">
        <div>
          <p className="modal__input--label">Nom</p>
          <p className="modal__input shadow shadow-green mb-4 py-1">
            {user.lastname}
          </p>
        </div>
        <div>
          <p className="modal__input--label">Prénom</p>
          <p className="modal__input shadow shadow-green mb-4 py-1">
            {user.firstname}
          </p>
        </div>
        <div>
          <p className="modal__input--label">Avatar</p>
          <p className="modal__input shadow shadow-green mb-4 py-1">
            {user.picture}
          </p>
        </div>
        <div>
          <p className="modal__input--label">Email</p>
          <p className="modal__input shadow shadow-green mb-4 py-1">
            {user.email}
          </p>
        </div>
      </div>
    </div>
  );
}
