import { MutableRefObject, useRef } from "react";
import { useGetCitiesQuery } from "../gql/generated/schema";
import Hero from "../components/Hero";
import heroHomeImg from "../assets/images/homeHeroBG.png";
import MiniCardCity from "../components/MiniCardCity";
import { CitiesHome } from "../services/interfaces";

export default function Home() {
  const scrollToRef = useRef() as MutableRefObject<HTMLInputElement>;
  const { data } = useGetCitiesQuery();
  let cities: CitiesHome[] = [];
  if (data !== undefined) {
    cities = data.getCities;
  }

  const heroHome = {
    name: "Partagez et découvrez des points d’intérêts",
    picture: heroHomeImg,
    description:
      "Trouvez rapidement des informations sur les points d’intérêts régulièrement partagés par nos contributeur·rice·s, en utilisant nos cartes interactives. Gagnez du temps en planifiant votre voyage à l'avance et découvrez des endroits que vous n'auriez peut-être pas trouvés autrement : attractions touristiques, musées, restaurants, bars et bien plus encore.",
  };

  const action = {
    title: "Chercher une inspiration",
  };

  return (
    <div className="flex h-full flex-col justify-between">
      <Hero heroContent={heroHome} action={action} scrollToRef={scrollToRef} />
      <div className="container" ref={scrollToRef}>
        <h3 className="text-center font-bold font-karla text-l">À découvrir</h3>
        <div className="flex flex-row flex-wrap w-full mt-4 gap-12 justify-center md:justify-between">
          {cities &&
            cities.map((city) => <MiniCardCity city={city} key={city.id} />)}
        </div>
      </div>
    </div>
  );
}
