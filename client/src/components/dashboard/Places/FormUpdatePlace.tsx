import { PlaceProps } from "./PlacesDashboard";

interface updatePlaceProps {
  currentPlace: PlaceProps;
}

function FormUpdatePlace({ currentPlace }: updatePlaceProps) {
  const [updatePlace] = useUpdateCityMutation({
    errorPolicy: "all",
  });
  const handleSubmit = (values: any) => {
    updatePlace({
      variables: {
        data: {
          name: currentPlace.name,
          adress: currentPlace.adress,
          latitude: currentPlace.latitude,
          longitude: currentPlace.longitude,
          picture: currentPlace.picture,
          description: currentPlace.description,
          website: currentPlace.website,
          category: currentPlace.category,
        },
      },
    });
  };
  return <div>FormUpdatePlace</div>;
}

export default FormUpdatePlace;
