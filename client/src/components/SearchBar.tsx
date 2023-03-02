import "../styles/searchBar.css";
import React from "react";
import loupe from "../assets/magnifying-glass.svg";
import cross from "../assets/cross.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetSearchResultQuery } from "../gql/generated/schema";

interface searchBarProps {
  showSearch: boolean;
}

function SearchBar(showSearch: searchBarProps) {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");

  const { data } = useGetSearchResultQuery({
    variables: { searchInput: searchInput },
    skip: !searchInput,
  });

  const result = data?.Search;

  return (
    <div className={showSearch ? "searchbar" : "searchbar--hidden"}>
      <div className="searchbar__input">
        <img
          src={loupe}
          alt="loupe search bar"
          className="header__profile--loupe cursor-pointer"
          style={{ fill: "#F6CDAF" }}
        />
        <input
          type="text"
          name="searchBar"
          placeholder="Rechercher"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        ></input>
        <img
          src={cross}
          alt="loupe search bar"
          className="header__profile--loupe cursor-pointer"
          style={{ fill: "#F6CDAF" }}
        />
      </div>
      <div className="searchbar__result flex flex-col">
        {result?.cities.length !== 0 && result?.cities && <p>Les villes</p>}
        {result?.cities?.map((city) => (
          <h3
            className="cursor-pointer"
            key={city.name}
            onClick={() => navigate(`/cities/${city.name}`)}
          >
            {city.name}
          </h3>
        ))}
        {result?.placesByName.length !== 0 && result?.placesByName && (
          <p>Les points d'intérêts</p>
        )}
        {result?.placesByName?.map((place) => (
          <h3 key={place.name}>{place.name}</h3>
        ))}
        {result?.placesByAddress.length !== 0 && result?.placesByAddress && (
          <p>Les adresses</p>
        )}
        {result?.placesByAddress?.map((place) => (
          <h3 key={place.adress}>{place.adress}</h3>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
