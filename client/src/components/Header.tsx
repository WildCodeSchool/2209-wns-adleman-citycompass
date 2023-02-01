import React from "react";
import "../styles/Header.css";
import compasLogo from "../assets/compas_logo.svg";
import loupe from "../assets/magnifying-glass.svg";
import person from "../assets/person-circle-outline.svg";

function Header() {
  return (
    <div className="header_container">
      <div className="header_compass">
        <img src={compasLogo} alt="compass" className="header_compass" />
      </div>{" "}
      <h1 className="header_title">CITY COMPASS</h1>
      <div className="header_profile_search">
        <img src={loupe} alt="loupe" className="header_glass_img" />
        <img src={person} alt="person" className="header_profile_img" />
      </div>
    </div>
  );
}

export default Header;
