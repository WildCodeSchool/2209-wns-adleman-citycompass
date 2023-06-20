import React from "react";
import { UserProps } from "./AccueilDashboard";
import identity from "../../../assets/user-identity.png";
import avatar from "../../../assets/user-avatar.png";
import email from "../../../assets/user-email.png";
import role from "../../../assets/user-role.png";

interface FormUpdateUserProps {
  user: UserProps;
}

// form building with Formik https://formik.org/docs/guides/validation

export function UserInformations({ user }: FormUpdateUserProps) {
  return (
    <div className="container py-4 bg-cream flex flex-col w-fit">
      <div className="my-8 flex flex-col gap-6">
        <div className="container gap-4 flex items-center">
          <img src={identity} alt="user identity" className="w-8 h-8" />
          <p>{user.firstname}</p>
          <p>{user.lastname}</p>
        </div>
        <div className="container flex gap-4 items-center">
          <img src={avatar} alt="user avatar" className="w-8 h-8" />
          <p>{user.picture}</p>
        </div>
        <div className="container flex gap-4 items-center">
          <img src={email} alt="user email" className="w-8 h-8" />
          <a href={`mailto: ${user.email}`}>{user.email}</a>
        </div>
        <div className="container flex gap-4 items-center">
          <img src={role} alt="user email" className="w-8 h-8" />
          <p>{user.role}</p>
        </div>
      </div>
    </div>
  );
}
