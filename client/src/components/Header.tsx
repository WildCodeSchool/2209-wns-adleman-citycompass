import React from "react";
import "../styles/Header.css";
import compass from "../assets/compass.png";
import loupe from "../assets/magnifying-glass.svg";
import person from "../assets/person-circle-outline.svg";

function Header() {
  return (
    <div className="header_container header_container_flex flex">
      <div className="header_compass">
        <img src={compass} alt="compass" className="header_compass" />
      </div>{" "}
      <div className="header_title">CITY COMPASS</div>
      <div className="header_profile_search">
        <img src={loupe} alt="loupe" className="header_glass_img" />
        <img src={person} alt="person" className="header_glass_img" />
      </div>
    </div>
  );
}

export default Header;
