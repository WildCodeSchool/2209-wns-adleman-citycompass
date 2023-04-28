/* eslint-disable no-sequences */
import compasLogo from "../assets/compas_logo.svg";
import accueil_icon from "../assets/accueil_icon.svg";
import category_icon from "../assets/category_icon.svg";
import city_icon from "../assets/city_icon.svg";
import poi_icon from "../assets/poi_icon.svg";
import { useState } from "react";
import AccueilDashboard from "../components/dashboard/Accueil/AccueilDashbord";
import CategoriesDashboard from "../components/dashboard/Categories/CategoriesDashboard";

export default function Dashboard() {
  const [accueilClicked, setAccueilClicked] = useState(true);
  const [categoryClicked, setCategoryClicked] = useState(false);
  const [cityClicked, setCityClicked] = useState(false);
  const [poiClicked, setPoiClicked] = useState(false);

  return (
    <div className="flex h-full">
      <div className="bg-green h-full min-w-fit flex flex-col gap-28">
        <a href="/" className="sidebar__logo">
          <img
            src={compasLogo}
            alt="logo city compass"
            className="w-16 lg:w-20"
          />
          <h2 className="drop-shadow-cream w-48">CITY COMPASS</h2>
        </a>
        <div>
          <div
            className={
              accueilClicked ? "sidebar__menu-active" : "sidebar__menu"
            }
          >
            <button
              className="sidebar__button"
              disabled={accueilClicked === true}
              onClick={() => (
                setAccueilClicked(!accueilClicked),
                setCategoryClicked(false),
                setCityClicked(false),
                setPoiClicked(false)
              )}
            >
              <img className="w-6 h-6" src={accueil_icon} alt="" />
              <p>Accueil</p>
            </button>
          </div>
          <div
            className={
              categoryClicked ? "sidebar__menu-active" : "sidebar__menu"
            }
          >
            <button
              className="sidebar__button"
              disabled={categoryClicked === true}
              onClick={() => (
                setCategoryClicked(!categoryClicked),
                setAccueilClicked(false),
                setCityClicked(false),
                setPoiClicked(false)
              )}
            >
              <img className="w-6 h-6" src={category_icon} alt="" />
              <p>Catégories</p>
            </button>
          </div>
          <div
            className={cityClicked ? "sidebar__menu-active" : "sidebar__menu"}
          >
            <button
              className="sidebar__button"
              disabled={cityClicked === true}
              onClick={() => (
                setCityClicked(!cityClicked),
                setAccueilClicked(false),
                setCategoryClicked(false),
                setPoiClicked(false)
              )}
            >
              <img className="w-6 h-6" src={city_icon} alt="" />
              <p>Villes</p>
            </button>
          </div>
          <div
            className={poiClicked ? "sidebar__menu-active" : "sidebar__menu"}
          >
            <button
              className="sidebar__button"
              disabled={poiClicked === true}
              onClick={() => (
                setPoiClicked(!poiClicked),
                setAccueilClicked(false),
                setCategoryClicked(false),
                setCityClicked(false)
              )}
            >
              <img className="w-6 h-6" src={poi_icon} alt="" />
              <p>Points d'intérêts</p>
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white h-full w-full flex flex-col">
        {accueilClicked && <AccueilDashboard />}
        {categoryClicked && <CategoriesDashboard />}
        {cityClicked && <div>Test</div>}
        {poiClicked && <div>Test</div>}
      </div>
    </div>
  );
}
