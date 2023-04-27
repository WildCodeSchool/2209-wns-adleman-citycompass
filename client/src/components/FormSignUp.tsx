import React, { useState } from "react";
import { useCreateUserMutation } from "../gql/generated/schema";

interface FormSignUpProps {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

function FormSignUp({ isLogin, setIsLogin }: FormSignUpProps) {
  const [userInfos, setUserInfos] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    picture: "",
    role: "user",
  });

  const [createUser] = useCreateUserMutation();

  return (
    <div>
      <h4 className="text-center">Créer un compte</h4>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createUser({ variables: { data: userInfos } })
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
          <label className="modal__input--label" htmlFor="nom">
            Nom
          </label>
          <input
            type="lastname"
            id="lastname"
            name="lastname"
            value={userInfos.lastname}
            onChange={(e) => {
              setUserInfos({ ...userInfos, lastname: e.target.value });
            }}
            className="modal__input shadow shadow-green mb-4"
            placeholder="lastname"
          />
          <label className="modal__input--label" htmlFor="prénom">
            Prénom
          </label>
          <input
            type="firstname"
            id="firstname"
            name="firstname"
            value={userInfos.firstname}
            onChange={(e) => {
              setUserInfos({ ...userInfos, firstname: e.target.value });
            }}
            className="modal__input shadow shadow-green mb-4"
            placeholder="firstname"
          />
          <label className="modal__input--label" htmlFor="Image url">
            Image url
          </label>
          <input
            type="picture"
            id="picture"
            name="picture"
            value={userInfos.picture}
            onChange={(e) => {
              setUserInfos({ ...userInfos, picture: e.target.value });
            }}
            className="modal__input shadow shadow-green mb-4"
            placeholder="picture"
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
            Se connecter
          </button>
          <input type="submit" className="button--primary mt-6" />
        </div>
      </form>
    </div>
  );
}

export default FormSignUp;
