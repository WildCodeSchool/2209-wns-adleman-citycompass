import React, { MutableRefObject } from "react";
import Breadcrumbs from "./Breadcrumbs";
import "../styles/button.css";
import { Link, useLocation } from "react-router-dom";
import { PlaceProps } from "./MapCity";

export interface HeroProps {
  heroContent: heroContent;
  action?: {
    title: string;
  };
  scrollToRef?: MutableRefObject<HTMLInputElement>;
}

export interface heroContent {
  description?: string;
  latitude?: string;
  longitude?: string;
  name?: string;
  picture?: string;
  website?: string | null;
  grade?: string;
  places?: PlaceProps[];
}

function Hero({ heroContent, action, scrollToRef }: HeroProps) {
  const isHome = useLocation().pathname === "/" ? true : false;
  const handleClick = () => scrollToRef?.current.scrollIntoView();

  // Get the url and get each individual link for breadcrumbs /
  function GenerateBreadcrumbs() {
    const router = useLocation()
      .pathname.split("/")
      .filter((v) => v.length > 0);

    const crumblist = router.map((subpath, id) => {
      const href = "/" + router.slice(0, id + 1).join("/");
      const title = subpath;
      return { href, title };
    });
    return [{ href: "/", title: "Accueil" }, ...crumblist];
  }
  const breadcrumbs = GenerateBreadcrumbs();

  return (
    heroContent && (
      <div className="hero sm:h-screen flex flex-col sm:flex-row justify-start bg-cream">
        <div className="w-full sm:w-1/2 overflow-hidden">
          <img
            className="w-full sm:w-auto sm:max-w-none h-full"
            src={heroContent.picture}
            alt={heroContent.name + " picture"}
          />
        </div>
        <div className="container w-full sm:w-1/2 px-6 py-10 sm:py-0 sm:pr-0 md:pr-9 lg:pr-32 flex flex-col gap-8 sm:inline-block justify-center sm:space-y-8 max-w-2xl">
          {!isHome && breadcrumbs && (
            <div className="breadcrumbs hidden sm:flex">
              <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>
          )}
          {isHome ? (
            <h1 className="type-h2 normal-case font-normal text-center sm:text-left">
              {heroContent?.name}
            </h1>
          ) : (
            <h1 className="drop-shadow-xl text-center sm:text-left">
              {heroContent?.name}
            </h1>
          )}
          <p className={isHome ? "" : "hidden sm:inline-block"}>
            {heroContent.description}
          </p>

          {heroContent.website && (
            <p>
              <button className="button--primary">Site internet</button>
            </p>
          )}
          {action && (
            <button
              className="button--primary"
              type="button"
              onClick={handleClick}
            >
              {action.title}
            </button>
          )}
        </div>
      </div>
    )
  );
}

export default Hero;
