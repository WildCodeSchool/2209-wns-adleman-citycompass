import "../styles/searchBar.css";
import React, { useEffect } from "react";
import loupe from "../assets/magnifying-glass.svg";
import cross from "../assets/cross.svg";
import { useNavigate } from "react-router-dom";
// import { useGetSearchResultQuery } from "../gql/generated/schema";

interface searchBarProps {
  showSearch: boolean;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}

function SearchBar({
  showSearch,
  setShowSearch,
  setSearchInput,
  searchInput,
}: searchBarProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    setShowSearch(!showSearch);
    setSearchInput("");
  };

  useEffect(() => {
    document.body.style.overflow = showSearch ? "hidden" : "initial";
  });

  // const { data } = useGetSearchResultQuery({
  //   variables: { searchInput: searchInput },
  //   skip: !searchInput,
  // });

  // const result = data?.Search;

  return (
    <div
      className={`searchbar ${
        showSearch ? "searchbar--show" : "searchbar--hidden"
      }`}
    >
      <div className="searchbar__input container space-x-6">
        <img
          src={loupe}
          alt="loupe search bar"
          className="w-6 cursor-pointer"
          style={{ fill: "#F6CDAF" }}
        />
        <input
          type="text"
          name="searchBar"
          placeholder="Rechercher"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        ></input>
        <img
          src={cross}
          alt="loupe search bar"
          className="w-6 cursor-pointer"
          style={{ fill: "#F6CDAF" }}
          onClick={handleClick}
        />
      </div>
      {/* <div className="searchbar__result container flex flex-col">
        {result?.cities.length !== 0 && result?.cities && (
          <p className="pt-12">Les villes</p>
        )}
        {result?.cities?.map((city) => (
          <h4
            className="cursor-pointer pl-4"
            key={city.name}
            onClick={() => {
              navigate(`/cities/${city.name}`);
              setShowSearch(!showSearch);
              setSearchInput("");
            }}
          >
            {city.name}
          </h4>
        ))}
        {result?.placesByName.length !== 0 && result?.placesByName && (
          <p className="pt-4">Les points d'intérêts</p>
        )}
        {result?.placesByName?.map((place) => (
          <h4
            className="cursor-pointer pl-4"
            key={place.name[0]}
            onClick={() => {
              navigate(`/cities/${place.city.name}/${place.name}`);
              setShowSearch(!showSearch);
              setSearchInput("");
            }}
          >
            {place.name}
          </h4>
        ))}
        {result?.placesByAddress.length !== 0 && result?.placesByAddress && (
          <p className="pt-4">Les adresses</p>
        )}
        {result?.placesByAddress?.map((place) => (
          <h4
            className="cursor-pointer pl-4"
            key={place.adress}
            onClick={() => {
              navigate(`/cities/${place.city.name}/${place.name}`);
              setShowSearch(!showSearch);
              setSearchInput("");
            }}
          >
            {place.adress}
          </h4>
        ))}
      </div>
      <div className="search__overlay"></div> */}
    </div>
  );
}

export default SearchBar;
