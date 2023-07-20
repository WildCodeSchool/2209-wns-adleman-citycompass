import Hero from "../components/Hero";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useGetOnePlacebyNameQuery } from "../gql/generated/schema";

export default function Place() {
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

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
          <div className="container">
            <div className="py-20 space-y-20">
              <h2 className="text-center">Description</h2>
              <div className="grid-col-6 mx-auto">
                <p>{place.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
