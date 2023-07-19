/* eslint-disable no-sequences */
import { useState } from "react";
import add_icon from "../../../assets/add_icon.svg";
import modify_icon from "../../../assets/modify_icon.svg";
import chevron_down from "../../../assets/chevron-arrow-down.png";
import chevron_up from "../../../assets/up-arrow-angle.png";
import { useGetCitiesWithPlacesQuery } from "../../../gql/generated/schema";
import FormAddPlace from "./FormAddPlace";
import FormUpdatePlace from "./FormUpdatePlace";

export interface CityArrayProps {
  cityArray: string[] | undefined;
}

export interface CategoryPlace {
  id: number;
}

export interface PlaceProps {
  description: string;
  id: number;
  latitude: string;
  longitude: string;
  name: string;
  picture: string;
  website?: string | null | undefined;
  adress: string;
  categoryId: number;
  cityId: number;
}

function PlacesDashboard({ cityArray }: CityArrayProps) {
  const [places, setPlaces] = useState(true);
  const [listPlaces, setListPlaces] = useState(false);
  const [addPlaces, setAddPlaces] = useState(false);
  const [modifyPlaces, setModifyPlaces] = useState(false);
  const [cityName, setCityName] = useState("");
  const [currentCity, setCurrentCity] = useState<number>(0);
  const [currentPlace, setCurrentPlace] = useState<PlaceProps>({
    description: "",
    id: 0,
    latitude: "",
    longitude: "",
    name: "",
    picture: "",
    adress: "",
    website: "",
    categoryId: 0,
    cityId: 0,
  });

  const { data } = useGetCitiesWithPlacesQuery();

  const cities = data?.getCities;

  return (
    <>
      <div className="my-28 mx-auto h-full flex flex-col w-4/5 max-w-4xl">
        <div className="flex w-fit gap-8">
          <h1 className="type-h1 header__title text-left ">
            GESTION DES POINTS D'INTERETS
          </h1>
        </div>
        <div className="bg-cream w-full h-fit min-h-[75%] mt-10">
          {places && (
            <div className="flex flex-col w-full h-full gap-4 pb-8">
              <div className="p-4 w-16 self-end">
                <button onClick={() => (setAddPlaces(true), setPlaces(false))}>
                  <img src={add_icon} alt="" />
                </button>
              </div>
              {cities?.map((city) => (
                <>
                  {cityArray?.includes(city.name) && (
                    <div
                      className="h-12 w-96 px-6 self-center rounded bg-orange flex justify-between items-center"
                      key={city.name}
                    >
                      <p className="w-4/5">{city.name}</p>
                      <button
                        onClick={() => {
                          setCityName(city.name);
                          setListPlaces(!listPlaces);
                          setCurrentCity(city.id);
                        }}
                      >
                        <img
                          src={
                            listPlaces && cityName === city.name
                              ? chevron_up
                              : chevron_down
                          }
                          alt=""
                          className="w-4"
                        />
                      </button>
                    </div>
                  )}
                  {listPlaces && cityName === city.name && (
                    <div className="flex flex-col justify-between self-center">
                      {city.places.map((place) => (
                        <div
                          className="h-12 w-96 px-6 flex justify-between items-center"
                          key={place.id}
                        >
                          <p className="w-4/5">{place.name}</p>
                          <button
                            onClick={() => (
                              setModifyPlaces(true),
                              setPlaces(false),
                              setListPlaces(false),
                              setCurrentPlace({
                                ...place,
                                categoryId: place.category.id,
                                cityId: currentCity,
                              })
                            )}
                          >
                            <img src={modify_icon} alt="" className="w-6" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ))}
            </div>
          )}
          {addPlaces && (
            <div>
              <FormAddPlace setAddPlaces={setAddPlaces} setPlaces={setPlaces} />
            </div>
          )}
          {modifyPlaces && (
            <div>
              <FormUpdatePlace
                currentPlace={currentPlace}
                setModifyPlaces={setModifyPlaces}
                setPlaces={setPlaces}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default PlacesDashboard;
