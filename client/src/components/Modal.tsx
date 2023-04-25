import React, { useEffect, useState } from "react";
import cross from "../assets/cross.svg";
import { useCreateUserMutation } from "../gql/generated/schema";

interface modalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function Modal({ showModal, setShowModal }: modalProps) {
  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "initial";
  });

  const showClick = () => {
    setShowModal(!showModal);
  };

  const [userInfos, setUserInfos] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    picture: "",
  });

  const [createUser] = useCreateUserMutation();
  return (
    <div className={`modal ${showModal ? "modal--show" : "modal--hidden"}`}>
      <div className="relative w-full h-full items-center justify-center flex">
        <div className="modal__container">
          <img
            src={cross}
            alt="cross"
            className="w-4 cursor-pointer absolute right-8 top-8"
            style={{ fill: "#F6CDAF" }}
            onClick={showClick}
          />
          <div className="flex flex-col w-full p-8">
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
                <input type="submit" className="button--primary mt-6" />
              </div>
            </form>
          </div>
        </div>
        <div className="modal__overlay"></div>
      </div>
    </div>
  );
}

export default Modal;
