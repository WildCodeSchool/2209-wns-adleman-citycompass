import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../styles/MapCity.css";

export default function MapCity({ cityLat, cityLong, places }: any) {
  const restaurantIcon = L.icon({
    iconUrl: places[0].category.picto,
    iconSize: [50, 50],
    iconAnchor: [12, 12],
    popupAnchor: [0, 0],
  });
  console.log(restaurantIcon);
  return (
    <div>
      <MapContainer
        center={[parseFloat(cityLat), parseFloat(cityLong)]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://wxs.ign.fr/pratique/wmts/?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&STYLE=normal&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image%2Fjpeg"
        />
        {places.map((place: any) => (
          <Marker
            position={[parseFloat(place.latitude), parseFloat(place.longitude)]}
            icon={restaurantIcon}
          >
            <Popup>
              <div>
                <img src={place.picture} alt="Place" />
                <div>
                  <p>{place.name}</p>
                  <p>{place.adress}</p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
