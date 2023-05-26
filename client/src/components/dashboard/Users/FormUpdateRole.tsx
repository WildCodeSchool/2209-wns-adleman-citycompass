import React from "react";
import { userToUpdateProps } from "./UsersDashboard";

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
  const handleSubmit = () => {
    setListUsers(true);
    setModifyUsers(false);
  };
  console.log(userToUpdate);

  return (
    <div className="container mx-auto p-6 bg-cream flex flex-col">
      <h2>GESTION DES ROLES UTILISATEURS</h2>
      <button onClick={handleSubmit}>Switch</button>
    </div>
  );
}
