import Hero from "../components/Hero";
import { useLocation } from "react-router-dom";

export default function Place() {
  const location = useLocation();
  const place = location.state.place;

  console.log(place);

  return (
    <>
      {place && (
        <div>
          <Hero
            heroContent={{
              name: place.name,
              description: place.adress,
              website: place.website,
              picture: place.picture,
            }}
          />
          <div className="container py-20 space-y-12">
            <h2 className="text-center">Description</h2>
            <div className="grid-col-6 mx-auto">{place.description}</div>
          </div>
        </div>
      )}
    </>
  );
}
