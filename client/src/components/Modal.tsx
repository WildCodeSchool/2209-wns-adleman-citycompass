import React, { useEffect, useState } from "react";
import cross from "../assets/cross.svg";
import FormSignUp from "./FormSignUp";
import FormSignIn from "./FormSignIn";

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

  const [isLogin, setIsLogin] = useState(true);

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
            {isLogin ? (
              <FormSignUp isLogin={isLogin} setIsLogin={setIsLogin} />
            ) : (
              <FormSignIn isLogin={isLogin} setIsLogin={setIsLogin} />
            )}
          </div>
        </div>
        <div className="modal__overlay"></div>
      </div>
    </div>
  );
}

export default Modal;
