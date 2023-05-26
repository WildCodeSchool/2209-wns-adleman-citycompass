import React from "react";

interface FormUpdateRoleProps {
  setListUsers: React.Dispatch<React.SetStateAction<boolean>>;
  setModifyUsers: React.Dispatch<React.SetStateAction<boolean>>;
  // currentCategory: CategoryProps;
}

export function FormUpdateRole({
  setListUsers,
  setModifyUsers,
}: FormUpdateRoleProps) {
  const handleSubmit = () => {
    setListUsers(true);
    setModifyUsers(false);
  };
  return (
    <div className="container mx-auto p-6 bg-cream flex flex-col">
      <h1>GESTION DES ROLES UTILISATEURS</h1>
      <button onClick={handleSubmit}>Switch</button>
    </div>
  );
}
