/* eslint-disable no-sequences */
import { useState } from "react";
import modify_icon from "../../../assets/modify_icon.svg";
import { useGetUsersQuery } from "../../../gql/generated/schema";
import { FormUpdateRole } from "./FormUpdateRole";

function UsersDashboard() {
  const [listUsers, setListUsers] = useState(true);
  const [modifyUsers, setModifyUsers] = useState(false);

  const { data } = useGetUsersQuery();

  const users = data?.getUsers;

  return (
    <>
      <div className="my-28 mx-auto h-full flex flex-col w-4/5 max-w-4xl">
        <div className="flex w-fit gap-8">
          <h1 className="type-h1 header__title text-left ">
            GESTION DES UTILISATEURS
          </h1>
        </div>
        <div className="bg-cream w-full h-fit min-h-[75%] mt-10">
          {listUsers && (
            <div className="flex flex-col w-full h-full gap-4 pb-8">
              {users?.map((user) => (
                <div
                  className="h-12 w-96 px-6 self-center rounded bg-orange flex justify-between items-center"
                  key={user.id}
                >
                  <p className="w-4/5">{user.firstname}</p>
                  <button
                    onClick={() => (setModifyUsers(true), setListUsers(false))}
                  >
                    <img src={modify_icon} alt="" className="w-6" />
                  </button>
                </div>
              ))}
            </div>
          )}
          {modifyUsers && (
            <div>
              <FormUpdateRole
                setListUsers={setListUsers}
                setModifyUsers={setModifyUsers}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default UsersDashboard;
