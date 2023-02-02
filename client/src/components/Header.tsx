import React from "react";
import "../styles/Header.css";
import compasLogo from "../assets/compas_logo.svg";
import loupe from "../assets/magnifying-glass.svg";
import person from "../assets/person-circle-outline.svg";

function Header() {
  return (
    <>
      <div className="header_container">
        <div className="header_div_compass">
          <img
            src={compasLogo}
            alt="logo city compass"
            className="header_compass"
          />
        </div>
        <h1 className="header_title">CITY COMPASS</h1>
        <div className="header_profile_search">
          <img src={loupe} alt="loupe" className="header_glass_img" />
          <img src={person} alt="person" className="header_profile_img" />
        </div>
        <div>
          <button className="visible lg:invisible relative group mr-2">
            <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden">
              <div className="bg-black  h-[2px] w-7 transform transition-all duration-300 origin-left group-focus:translate-y-6 delay-100"></div>
              <div className="bg-black  h-[2px] w-7 rounded transform transition-all duration-300 group-focus:translate-y-6 delay-75"></div>
              <div className="bg-black h-[2px] w-7 transform transition-all duration-300 origin-left group-focus:translate-y-6"></div>

              <div className="absolute items-center justify-between transform transition-all duration-500 top-2.5 -translate-x-10 group-focus:translate-x-0 flex w-0 group-focus:w-12">
                <div className="absolute bg-black h-[2px] w-5 transform transition-all duration-500 rotate-0 delay-300 group-focus:rotate-45"></div>
                <div className="absolute bg-black h-[2px] w-5 transform transition-all duration-500 -rotate-0 delay-300 group-focus:-rotate-45"></div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}

export default Header;
