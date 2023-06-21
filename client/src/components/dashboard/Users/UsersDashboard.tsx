/* eslint-disable no-sequences */
import { useState } from "react";
import modify_icon from "../../../assets/modify_icon.svg";
import { useGetUsersQuery } from "../../../gql/generated/schema";
import { FormUpdateRole } from "./FormUpdateRole";
import { roles } from "../../../utils/userRoles";
import chevron_down from "../../../assets/chevron-arrow-down.png";
import chevron_up from "../../../assets/up-arrow-angle.png";

export interface userToUpdateProps {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  picture: string;
  role: string;
}

function UsersDashboard() {
  const [listUsers, setListUsers] = useState(true);
  const [modifyUsers, setModifyUsers] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState<userToUpdateProps>({
    id: 0,
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    picture: "",
    role: "",
  });
  const [userList, setUserList] = useState(false);
  const [roleToDisplay, setRoleToDisplay] = useState("");

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
            <div className="flex flex-col justify-center w-full h-full gap-4 pb-8">
              {roles.map((role) => (
                <>
                  {
                    <div
                      className="h-12 w-96 px-6 self-center rounded bg-orange flex justify-between items-center"
                      key={role}
                    >
                      <p className="w-4/5">{role}</p>
                      <button
                        onClick={() => {
                          setRoleToDisplay(role);
                          setUserList(!userList);
                        }}
                      >
                        <img
                          src={
                            userList && role === roleToDisplay
                              ? chevron_up
                              : chevron_down
                          }
                          alt=""
                          className="w-4"
                        />
                      </button>
                    </div>
                  }
                  <div className="flex flex-col justify-between self-center">
                    {userList &&
                      role === roleToDisplay &&
                      users
                        ?.filter((user) => user.role === role)
                        .map((user) => (
                          <div
                            className="h-12 w-96 px-6 flex justify-between items-center"
                            key={user.id}
                          >
                            <p className="w-4/5">
                              {user.firstname} {user.lastname}
                            </p>
                            <button
                              onClick={() => (
                                setModifyUsers(true),
                                setListUsers(false),
                                setUserToUpdate(user)
                              )}
                            >
                              <img src={modify_icon} alt="" className="w-6" />
                            </button>
                          </div>
                        ))}
                  </div>
                </>
              ))}
            </div>
          )}
          {modifyUsers && (
            <div>
              <FormUpdateRole
                setListUsers={setListUsers}
                setModifyUsers={setModifyUsers}
                userToUpdate={userToUpdate}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default UsersDashboard;
