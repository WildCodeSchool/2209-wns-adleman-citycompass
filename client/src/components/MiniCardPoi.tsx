import React from "react";
import { PlaceProps } from "./MapCity";

interface cardProps {
  places: PlaceProps[] | undefined;
}

function MiniCardPoi({ places }: cardProps) {
  return (
    <>
      {places?.map((place) => (
        <div className="w-full bg-white drop-shadow-green border-green border-2 overflow-hidden rounded flex">
          <div className="w-1/3 h-28 overflow-hidden">
            <img
              src={place.picture}
              alt={place.name + " picture"}
              className="w-full sm:w-auto sm:max-w-none h-full"
            />
          </div>
          <div className="p-4">
            {place.name}
            <p>{place.adress}</p>
          </div>
        </div>
      ))}
    </>
  );
}

export default MiniCardPoi;
