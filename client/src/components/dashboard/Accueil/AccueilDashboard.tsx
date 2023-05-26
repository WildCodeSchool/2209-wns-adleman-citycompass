import { useState } from "react";
import { useGetProfileQuery } from "../../../gql/generated/schema";
import { FormUpdateUser } from "./FormUpdateUser";
import { UserInformations } from "./UserInformations";

export interface UserProps {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  picture: string;
  role: string;
}

function AccueilDashboard() {
  const [modifyUser, setModifyUser] = useState(false);

  const { data } = useGetProfileQuery({
    errorPolicy: "ignore",
  });

  const user = data?.profile;
  
  return (
    <>
      <div className="bg-cream my-20 mx-auto h-full flex flex-col gap-10 w-4/5 max-w-5xl p-10">
        <div className="flex gap-36 self-center items-center">
          <img
            src={user?.picture}
            alt=""
            className="rounded-full w-36 h-36 border-4 border-white"
          />
          <div className="flex flex-col w-fit h-fit">
            <h1 className="type-h1 header__title text-left">BIENVENUE</h1>
            <h1 className="text-orange">{user?.firstname}</h1>
          </div>
        </div>
        {user && (
          <>
            {modifyUser ? (
              <div className="w-2/3 self-center">
                <FormUpdateUser user={user} setModifyUser={setModifyUser}/>
              </div>
            ) : (
              <div className="w-2/3 self-center">
                <UserInformations user={user} />
                <button
                  type="button"
                  className="button--primary w-1/2"
                  onClick={() => setModifyUser(true)}
                >
                  Modifier le profil
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default AccueilDashboard;
