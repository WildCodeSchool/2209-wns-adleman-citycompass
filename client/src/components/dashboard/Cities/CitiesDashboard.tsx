/* eslint-disable no-sequences */
import { useState } from "react";
import add_icon from "../../../assets/add_icon.svg";
import modify_icon from "../../../assets/modify_icon.svg";
import { useGetCitiesQuery } from "../../../gql/generated/schema";
import FormAddCity from "./FormAddCity";
import FormUpdateCity from "./FormUpdateCity";

export interface CityProps {
  description: string;
  id: number;
  latitude: string;
  longitude: string;
  name: string;
  picture: string;
}

function CitiesDashboard() {
  const [listCities, setListCities] = useState(true);
  const [addCities, setAddCities] = useState(false);
  const [modifyCities, setModifyCities] = useState(false);
  const [currentCity, setCurrentCity] = useState<CityProps>({
    description: "",
    id: 0,
    latitude: "",
    longitude: "",
    name: "",
    picture: "",
  });

  const { data } = useGetCitiesQuery();

  const cities = data?.getCities;

  return (
    <>
      <div className="my-28 mx-auto h-full flex flex-col w-4/5 max-w-4xl">
        <div className="flex w-fit gap-8">
          <h1 className="type-h1 header__title text-left ">
            GESTION DES VILLES
          </h1>
        </div>
        <div className="bg-cream w-full h-fit min-h-[75%] mt-10">
          {listCities && (
            <div className="flex flex-col w-full h-full gap-4 pb-8">
              <div className="p-4 w-16 self-end">
                <button
                  onClick={() => (setAddCities(true), setListCities(false))}
                >
                  <img src={add_icon} alt="" />
                </button>
              </div>
              {cities?.map((city) => (
                <div
                  className="h-12 w-72 px-6 self-center rounded bg-orange flex justify-between items-center"
                  key={city.id}
                >
                  <p className="w-4/5">{city.name}</p>

                  <button
                    onClick={() => (
                      setModifyCities(true),
                      setListCities(false),
                      setCurrentCity(city)
                    )}
                  >
                    <img src={modify_icon} alt="" className="w-6" />
                  </button>
                </div>
              ))}
            </div>
          )}
          {addCities && (
            <div>
              <FormAddCity
                setAddCities={setAddCities}
                setListCities={setListCities}
              />
            </div>
          )}
          {modifyCities && (
            <div>
              <button
                onClick={() => (
                  setModifyCities(!modifyCities), setListCities(!listCities)
                )}
              >
                Retour
              </button>
              <FormUpdateCity
                setModifyCities={setModifyCities}
                setListCities={setListCities}
                currentCity={currentCity}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CitiesDashboard;
