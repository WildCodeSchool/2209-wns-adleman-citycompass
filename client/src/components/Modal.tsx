import React, { useEffect } from "react";
import cross from "../assets/cross.svg";

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

  const modalContentLogin = {
    title: "Me connecter",
    input_1: {
      prenom: "prénom ",
      nom: "prénom ",
    },
    action: {
      label: "se connecter",
    },
  };

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
            <h4 className="text-center">{modalContentLogin.title}</h4>

            <div className="flex flex-col space-y-4">
              <div className="modal__input--label">
                {modalContentLogin.input_1.prenom}
              </div>
              <input
                className="modal__input shadow shadow-green"
                placeholder={modalContentLogin.input_1.prenom}
              />
              <input type="submit" className="button--primary mt-6" />
            </div>
          </div>
        </div>
        <div className="modal__overlay"></div>
      </div>
    </div>
  );
}

export default Modal;
