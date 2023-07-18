import React, { useState } from "react";
import compasHeader from "../assets/compass_header.svg";
import loupe from "../assets/magnifying-glass.svg";
import person from "../assets/person-circle-outline.svg";
import SearchBar from "./SearchBar";
import Modal from "./Modal";
import { useGetProfileQuery, useLogoutMutation } from "../gql/generated/schema";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setShowSearch(!showSearch);
    setShowModal(false);
    setSearchInput("");
  };

  const handleModal = () => {
    setShowModal(!showModal);
    setShowSearch(false);
  };

  const { data: currentUser, client } = useGetProfileQuery({
    errorPolicy: "ignore",
  });

  const [logout] = useLogoutMutation();

  return (
    <>
      <div className="bg-white w-full sticky top-0 z-50">
        <div className="header container py-4">
          <div className="header__compass">
            <a href="/" className="flex">
              <img
                src={compasHeader}
                alt="logo city compass"
                className="header__compass-img"
              />
            </a>
          </div>

          <a href="/" title="Accueil" className="type-h1 header__title">
            CITY COMPASS
          </a>
          <div className="header__profile">
            <img
              src={loupe}
              alt="loupe search bar"
              className="header__profile--loupe cursor-pointer"
              onClick={handleClick}
            />
            {currentUser ? (
              <img
                src={person}
                alt="person icon to profile"
                className="header__profile--search"
              />
            ) : (
              <button type="button" onClick={handleModal}>
                <img
                  src={person}
                  alt="person icon to profile"
                  className="header__profile--search"
                />
              </button>
            )}
            <div className="cursor-pointer	">
              {currentUser ? (
                <>
                  <div
                    onClick={async () => {
                      await logout();
                      await client.resetStore();
                      toast.success("Vous avez été correctement déconnecté");
                    }}
                  >
                    <p className="type-h4 ml-2">Me déconnecter</p>
                  </div>
                  <div
                    onClick={() =>
                      navigate(`/dashboard/${currentUser.profile.id}`)
                    }
                  >
                    <p className="type-h4 ml-2">Back-office</p>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <SearchBar
          showSearch={showSearch}
          setShowSearch={setShowSearch}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
}

export default Header;
