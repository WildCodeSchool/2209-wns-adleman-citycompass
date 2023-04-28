/* eslint-disable no-sequences */
import { useState } from "react";
import add_icon from "../../../assets/add_icon.svg";
import modify_icon from "../../../assets/modify_icon.svg";
import { useGetPlacesQuery } from "../../../gql/generated/schema";

function PlacesDashboard() {
  const [listPlaces, setListPlaces] = useState(true);
  const [addPlaces, setAddPlaces] = useState(false);
  const [modifyPlaces, setModifyPlaces] = useState(false);

  const { data } = useGetPlacesQuery();

  const places = data?.getPlaces;

  return (
    <>
      <div className="my-28 mx-auto h-full flex flex-col w-4/5 max-w-4xl">
        <div className="flex w-fit gap-8">
          <h1 className="type-h1 header__title text-left ">
            GESTION DES PLACES
          </h1>
        </div>
        <div className="bg-cream w-full h-fit min-h-[75%] mt-10">
          {listPlaces && (
            <div className="flex flex-col w-full h-full gap-4 pb-8">
              <div className="p-4 w-16 self-end">
                <button
                  onClick={() => (setAddPlaces(true), setListPlaces(false))}
                >
                  <img src={add_icon} alt="" />
                </button>
              </div>
              {places?.map((place) => (
                <div
                  className="h-12 w-96 px-6 self-center rounded bg-orange flex justify-between items-center"
                  key={place.id}
                >
                  <p className="w-4/5">{place.name}</p>
                  <button
                    onClick={() => (
                      setModifyPlaces(true), setListPlaces(false)
                    )}
                  >
                    <img src={modify_icon} alt="" className="w-6" />
                  </button>
                </div>
              ))}
            </div>
          )}
          {addPlaces && (
            <div>
              <p>FORMULAIRE AJOUT PLACE</p>
              <button
                onClick={() => (setAddPlaces(false), setListPlaces(true))}
              >
                Enregistrer
              </button>
            </div>
          )}
          {modifyPlaces && (
            <div>
              <p>FORMULAIRE MODIFICATION PLACE</p>
              <button
                onClick={() => (setModifyPlaces(false), setListPlaces(true))}
              >
                Enregistrer
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default PlacesDashboard;
