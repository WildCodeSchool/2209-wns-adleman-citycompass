import React from "react";
import { useState } from "react";
import { useGetSearchResultQuery } from "../gql/generated/schema";

function SearchBar() {
  const [searchInput, setSearchInput] = useState("");

  const { data } = useGetSearchResultQuery({
    variables: { searchInput: searchInput },
    skip: !searchInput,
  });

  const result = data?.Search;
  console.log(result);

  return (
    <div>
      <div className="SearchBar">
        <input
          type="text"
          name="searchBar"
          placeholder="Rechercher"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        ></input>
      </div>
      <div className="flex flex-col">
        <p>Les villes</p>
        {result?.cities?.map((city) => (
          <div key={city.name}>{city.name}</div>
        ))}
        <p>Les POIs</p>
        {result?.placesByName?.map((place) => (
          <div key={place.name}>{place.name}</div>
        ))}
        <p>Les adresses</p>
        {result?.placesByAddress?.map((place) => (
          <div key={place.adress}>{place.adress}</div>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
