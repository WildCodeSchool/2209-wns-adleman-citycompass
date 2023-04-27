import React, { useState } from "react";
import { useLoginMutation } from "../gql/generated/schema";

interface FormSignInProps {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

function FormSignUp({ isLogin, setIsLogin }: FormSignInProps) {
  const [userInfos, setUserInfos] = useState({
    email: "",
    password: "",
  });

  const [logInUser] = useLoginMutation();

  return (
    <div>
      <h4 className="text-center">Me connecter</h4>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          logInUser({ variables: { data: userInfos } })
            .then(() => {
              console.log("ok");
            })
            .catch(console.error);
        }}
      >
        <div className="flex flex-col">
          <label className="modal__input--label" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={userInfos.email}
            onChange={(e) => {
              setUserInfos({ ...userInfos, email: e.target.value });
            }}
            className="modal__input shadow shadow-green mb-4"
            placeholder="email"
          />
          <label className="modal__input--label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={userInfos.password}
            onChange={(e) => {
              setUserInfos({ ...userInfos, password: e.target.value });
            }}
            className="modal__input shadow shadow-green mb-4"
            placeholder="password"
          />
          <button
            className="modal__input--label text-xs"
            onClick={(e) => {
              setIsLogin(!isLogin);
            }}
          >
            Créer un compte
          </button>
          <input type="submit" className="button--primary mt-6" />
        </div>
      </form>
    </div>
  );
}

export default FormSignUp;
