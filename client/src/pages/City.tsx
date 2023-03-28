import MapCity from "../components/MapCity";
import Hero, { heroContent } from "../components/Hero";
import { useGetOneCitybyNameQuery } from "../gql/generated/schema";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MiniCardPoi from "../components/MiniCardPoi";

export default function City() {
  const navigate = useNavigate();
  const { cityName = "" } = useParams();
  const { data } = useGetOneCitybyNameQuery({
    variables: { name: cityName },
  });

  let city: heroContent = {};
  if (data !== undefined) {
    city = data.getOneCitybyName;
  }
  return (
    <>
      <Hero heroContent={city} />
      <div className="container">
        <h2 className="text-center py-20">Les Points d'intérêts</h2>
      </div>
      <div className="flex flex-col sm:flex-row relative sm:gap-6">
        <div className="w-full md:w-1/2 lg:w-2/3 h-[80vh] z-0">
          {city && (
            <MapCity
              cityName={city.name}
              cityLat={city.latitude}
              cityLong={city.longitude}
              places={city.places}
            />
          )}
        </div>
        <div className="bg-cream px-8 pb-12 sm:bg-transparent w-full md:w-1/2 lg:w-1/3 absolute sm:relative min-h-[100px] bottom-0 z-10 space-y-8">
          <h3 className="text-center sm:text-left">À découvrir</h3>
          {city.places?.map((place) => (
            <div
              onClick={() =>
                navigate(`/cities/${city.name}/${place.name}`, {
                  state: { place },
                })
              }
            >
              <MiniCardPoi place={place} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
