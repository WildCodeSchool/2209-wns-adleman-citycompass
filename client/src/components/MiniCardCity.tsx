import { useNavigate } from "react-router-dom";
import "../styles/MiniCardCity.css";
import { MiniCardProps } from "../services/interfaces";
import "../styles/button.css";

export default function MiniCardCity({ city }: MiniCardProps) {
  const navigate = useNavigate();
  const cityName = city.name;

  return (
    <>
      <div className="card_container">
        <div className="h-56">
          <img
            src={city.picture}
            alt={city.name}
            className="rounded shadow"
          ></img>
        </div>
        <h2 className="mt-12 font-bold font-karla text-m">{city.name}</h2>
        <p className="font-latoRegular">
          {city.description.length >= 100
            ? city.description.substring(0, 100) + "..."
            : city.description}
        </p>
        <button
          className="border border-black rounded-3xl py-2 px-8 mt-4 button--secondary"
          onClick={() => navigate(`/cities/${cityName}`)}
        >
          Voir
        </button>
      </div>
    </>
  );
}
