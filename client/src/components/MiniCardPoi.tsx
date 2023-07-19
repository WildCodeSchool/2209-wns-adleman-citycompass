import React from "react";
import { PlaceProps } from "./MapCity";
import { useNavigate } from "react-router-dom";
import { heroContent } from "../components/Hero";

interface cardProps {
  place: PlaceProps | undefined;
  city: heroContent;
}

function MiniCardPoi({ place, city }: cardProps) {
  const navigate = useNavigate();
  return (
    <>
      {place && (
        <div
          className="w-full bg-white drop-shadow-green border-green hover:border-green-dark transition border-2 overflow-hidden rounded flex cursor-pointer"
          onClick={() =>
            navigate(`/cities/${city.name}/${place.name}`, {
              state: { place },
            })
          }
        >
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
      )}
    </>
  );
}

export default MiniCardPoi;
