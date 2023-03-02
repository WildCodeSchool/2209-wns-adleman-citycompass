import Hero from "../components/Hero";
import { useParams } from "react-router-dom";
import { useGetOnePlacebyNameQuery } from "../gql/generated/schema";

export default function Place() {
  let { placeName = "" } = useParams();

  const { data } = useGetOnePlacebyNameQuery({
    variables: { name: placeName },
  });

  const place = data?.getOnePlacebyName;

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
