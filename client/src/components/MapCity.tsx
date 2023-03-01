import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../styles/MapCity.css";
import { useNavigate } from "react-router-dom";

interface CityProps {
  cityName: string | undefined;
  cityLat: string | undefined;
  cityLong: string | undefined;
  places: PlaceProps[] | undefined;
}

export interface PlaceProps {
  id: number;
  picture: string;
  latitude: string;
  longitude: string;
  name: string;
  adress: string;
  category: {
    picto: string;
  };
}

export default function MapCity({
  cityName,
  cityLat,
  cityLong,
  places,
}: CityProps) {
  const navigate = useNavigate();

  return (
    <>
      {cityName && cityLat && cityLong && (
        <>
          <MapContainer
            center={[parseFloat(cityLat), parseFloat(cityLong)]}
            zoom={13}
            scrollWheelZoom={true}
            minZoom={6}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.forte.tiles.quaidorsay.fr/fr{r}/{z}/{x}/{y}.png"
            />
            {places &&
              places.map((place: PlaceProps) => (
                <Marker
                  position={[
                    parseFloat(place.latitude),
                    parseFloat(place.longitude),
                  ]}
                  icon={L.icon({
                    iconUrl: place.category.picto,
                    iconSize: [35, 35],
                    iconAnchor: [12, 12],
                    popupAnchor: [0, 0]
                  })}
                >
                  <Popup maxWidth={200}>
                    <div>
                      <img
                        src={place.picture}
                        alt="Place"
                        onClick={() =>
                          navigate(
                            `/cities/${cityName}/${place.name.replace(
                              " ",
                              "-"
                            )}`
                          )
                        }
                      />
                      <div>
                        <p className="font-bold font-latoBlack text-center">
                          {place.name}
                        </p>
                        <p>{place.adress}</p>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
          </MapContainer>
        </>
      )}
    </>
  );
}
