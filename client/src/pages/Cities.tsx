import { MutableRefObject, useRef } from "react";
import { useGetCitiesQuery } from "../gql/generated/schema";
import MiniCardCity from "../components/MiniCardCity";
import { CitiesHome } from "../services/interfaces";

export default function Cities() {
  const scrollToRef = useRef() as MutableRefObject<HTMLInputElement>;
  const { data } = useGetCitiesQuery();
  let cities: CitiesHome[] = [];
  if (data !== undefined) {
    cities = data.getCities;
  }

  return (
    <div className="sm:flex sm:h-full flex-col justify-between">
      <div className="container py-8" ref={scrollToRef}>
        <h3 className="text-center font-bold font-karla text-l">À découvrir</h3>
        <div className="flex flex-row flex-wrap w-full mt-4 gap-12 justify-center md:justify-between">
          {cities &&
            cities.map((city) => <MiniCardCity city={city} key={city.id} />)}
        </div>
      </div>
    </div>
  );
}
