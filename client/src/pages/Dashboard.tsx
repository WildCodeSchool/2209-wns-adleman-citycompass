/* eslint-disable no-sequences */
import compasLogo from "../assets/compas_logo.svg";
import accueil_icon from "../assets/accueil_icon.svg";
import category_icon from "../assets/category_icon.svg";
import city_icon from "../assets/city_icon.svg";
import poi_icon from "../assets/poi_icon.svg";
import user_icon from "../assets/user_icon.svg";
import logout_icon from "../assets/logout.png";
import { useState } from "react";
import { useGetProfileQuery, useLogoutMutation } from "../gql/generated/schema";
import { toast } from "react-hot-toast";

import AccueilDashboard from "../components/dashboard/Accueil/AccueilDashboard";
import CategoriesDashboard from "../components/dashboard/Categories/CategoriesDashboard";
import CitiesDashboard from "../components/dashboard/Cities/CitiesDashboard";
import PlacesDashboard from "../components/dashboard/Places/PlacesDashboard";
import UsersDashboard from "../components/dashboard/Users/UsersDashboard";
import { useNavigate } from "react-router-dom";

interface userManagedCitiesArray {
  id: number;
  name: string;
}

export default function Dashboard() {
  const [accueilClicked, setAccueilClicked] = useState(true);
  const [categoryClicked, setCategoryClicked] = useState(false);
  const [cityClicked, setCityClicked] = useState(false);
  const [poiClicked, setPoiClicked] = useState(false);
  const [userClicked, setUserClicked] = useState(false);

  const { data: currentUser, client } = useGetProfileQuery({
    errorPolicy: "ignore",
  });

  const [logout] = useLogoutMutation();

  const navigate = useNavigate();

  const isSuperAdmin = currentUser?.profile.role === "superadmin";
  const isAdmin = currentUser?.profile.role === "admin";
  const isContributor = currentUser?.profile.role === "contributor";

  const userManagedCities = currentUser?.profile.managedCities?.map(
    (city) => city.name
  );

  let userManagedCitiesArray: userManagedCitiesArray[] = [];
  if (
    currentUser?.profile.managedCities !== null &&
    currentUser?.profile.managedCities !== undefined
  )
    userManagedCitiesArray = currentUser.profile.managedCities;

  return (
    <>
      {currentUser ? (
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
                    setPoiClicked(false),
                    setUserClicked(false)
                  )}
                >
                  <img className="w-6 h-6" src={accueil_icon} alt="" />
                  <p>Accueil</p>
                </button>
              </div>
              {isSuperAdmin && (
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
                      setPoiClicked(false),
                      setUserClicked(false)
                    )}
                  >
                    <img className="w-6 h-6" src={category_icon} alt="" />
                    <p>Catégories</p>
                  </button>
                </div>
              )}
              {isSuperAdmin && (
                <div
                  className={
                    cityClicked ? "sidebar__menu-active" : "sidebar__menu"
                  }
                >
                  <button
                    className="sidebar__button"
                    disabled={cityClicked === true}
                    onClick={() => (
                      setCityClicked(!cityClicked),
                      setAccueilClicked(false),
                      setCategoryClicked(false),
                      setPoiClicked(false),
                      setUserClicked(false)
                    )}
                  >
                    <img className="w-6 h-6" src={city_icon} alt="" />
                    <p>Villes</p>
                  </button>
                </div>
              )}
              {(isSuperAdmin || isAdmin || isContributor) &&
                userManagedCitiesArray.length > 0 && (
                  <div
                    className={
                      poiClicked ? "sidebar__menu-active" : "sidebar__menu"
                    }
                  >
                    <button
                      className="sidebar__button"
                      disabled={poiClicked === true}
                      onClick={() => (
                        setPoiClicked(!poiClicked),
                        setAccueilClicked(false),
                        setCategoryClicked(false),
                        setCityClicked(false),
                        setUserClicked(false)
                      )}
                    >
                      <img className="w-6 h-6" src={poi_icon} alt="" />
                      <p>Points d'intérêts</p>
                    </button>
                  </div>
                )}
              {(isSuperAdmin || isAdmin) && (
                <div
                  className={
                    userClicked ? "sidebar__menu-active" : "sidebar__menu"
                  }
                >
                  <button
                    className="sidebar__button"
                    disabled={userClicked === true}
                    onClick={() => (
                      setUserClicked(!userClicked),
                      setPoiClicked(false),
                      setAccueilClicked(false),
                      setCategoryClicked(false),
                      setCityClicked(false)
                    )}
                  >
                    <img className="w-6 h-6" src={user_icon} alt="" />
                    <p>Utilisateurs</p>
                  </button>
                </div>
              )}
              <div className="sidebar__menu">
                <button
                  className="sidebar__button"
                  onClick={async () => {
                    await logout();
                    await client.resetStore();
                    toast.success("Vous avez été correctement déconnecté");
                    navigate("/");
                  }}
                >
                  <img className="w-6 h-6" src={logout_icon} alt="" />
                  <p>Me déconnecter</p>
                </button>
              </div>
            </div>
          </div>
          <div className="bg-white h-full w-full flex flex-col">
            {accueilClicked && <AccueilDashboard />}
            {categoryClicked && <CategoriesDashboard />}
            {cityClicked && <CitiesDashboard />}
            {poiClicked && <PlacesDashboard cityArray={userManagedCities} />}
            {userClicked && <UsersDashboard />}
          </div>
        </div>
      ) : (
        <>{navigate("/")}</>
      )}
    </>
  );
}
