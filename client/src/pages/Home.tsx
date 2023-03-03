import { useGetCitiesQuery } from "../gql/generated/schema";
import Hero from "../components/Hero";
import heroHomeImg from "../assets/images/homeHeroBG.png";
import MiniCardCity from "../components/MiniCardCity";
import { CitiesHome } from "../services/interfaces";

export default function Home() {
  const { data } = useGetCitiesQuery();
  let cities: CitiesHome[] = [];
  if (data !== undefined) {
    cities = data.getCities;
  }

  const heroHome = {
    name: "Partagez et découvrez des points d’intérêts",
    picture: heroHomeImg,
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio adipisci quae  axime error quaerat est incidunt voluptas officiis, quia sapiente ad molestiae pariatur saepe enim porro a deleniti, aperiam et.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio adipisci quae  axime error quaerat est incidunt voluptas officiis, quia sapiente ad molestiae pariatur saepe enim porro a deleniti, aperiam et.",
  };

  const action = {
    title: "Chercher une inspiration",
  };

  return (
    <div className="flex h-full flex-col justify-between">
      <Hero heroContent={heroHome} action={action} />
      <div className="container">
        <h3 className="text-center font-bold font-karla text-l">À découvrir</h3>
        <div className="flex flex-row flex-wrap w-full mt-4 gap-12 justify-center md:justify-between">
          {cities &&
            cities.map((city) => <MiniCardCity city={city} key={city.id} />)}
        </div>
      </div>
    </div>
  );
}
