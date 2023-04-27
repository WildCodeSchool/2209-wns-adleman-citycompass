/* eslint-disable no-sequences */
import compasLogo from "../assets/compas_logo.svg";
import accueil_icon from "../assets/accueil_icon.svg";
import category_icon from "../assets/category_icon.svg";
import city_icon from "../assets/city_icon.svg";
import poi_icon from "../assets/poi_icon.svg";
import { useState } from "react";

function Sidebar() {
  const [accueilClicked, setAccueilClicked] = useState(false);
  const [categoryClicked, setCategoryClicked] = useState(false);
  const [cityClicked, setCityClicked] = useState(false);
  const [poiClicked, setPoiClicked] = useState(false);

  return (
    <>
      <div className="bg-green h-full w-1/5 flex flex-col gap-28">
        <div>
          <a href="/" className="sidebar__logo">
            <img
              src={compasLogo}
              alt="logo city compass"
              className="w-16 lg:w-20"
            />
            <h2 className="drop-shadow-cream w-auto">CITY COMPASS</h2>
          </a>
        </div>
        <div>
          <div
            className={
              accueilClicked ? "sidebar__menu-active" : "sidebar__menu"
            }
            onClick={() => (
              setAccueilClicked(!accueilClicked),
              setCategoryClicked(false),
              setCityClicked(false),
              setPoiClicked(false)
            )}
          >
            <button className="sidebar__button">
              <img className="w-6 h-6" src={accueil_icon} alt="" />
              <p>Accueil</p>
            </button>
          </div>
          <div
            className={
              categoryClicked ? "sidebar__menu-active" : "sidebar__menu"
            }
            onClick={() => (
              setCategoryClicked(!categoryClicked),
              setAccueilClicked(false),
              setCityClicked(false),
              setPoiClicked(false)
            )}
          >
            <button className="sidebar__button">
              <img className="w-6 h-6" src={category_icon} alt="" />
              <p>Catégories</p>
            </button>
          </div>
          <div
            className={cityClicked ? "sidebar__menu-active" : "sidebar__menu"}
            onClick={() => (
              setCityClicked(!cityClicked),
              setAccueilClicked(false),
              setCategoryClicked(false),
              setPoiClicked(false)
            )}
          >
            <button className="sidebar__button">
              <img className="w-6 h-6" src={city_icon} alt="" />
              <p>Villes</p>
            </button>
          </div>
          <div
            className={poiClicked ? "sidebar__menu-active" : "sidebar__menu"}
            onClick={() => (
              setPoiClicked(!poiClicked),
              setAccueilClicked(false),
              setCategoryClicked(false),
              setCityClicked(false)
            )}
          >
            <button className="sidebar__button">
              <img className="w-6 h-6" src={poi_icon} alt="" />
              <p>Points d'intérêts</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
