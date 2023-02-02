import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../styles/MapCity.css";
import restaurant from "../assets/noun-restaurant-1032636.png";
import building from "../assets/noun-building-1068937.png";

export default function MapCity() {
	const city = {
		name: "Lyon",
		latitude: "45.764042",
		longitude: "4.835659",
	};
	const place1 = {
		longitude: "4.8312188",
		latitude: "45.757198",
		name: "Place Bellecour",
		adress: "69002, Lyon",
		description:
			"La place Bellecour est une place du 2ᵉ arrondissement de Lyon, en France. Élément majeur de la ville et sa plus grande place avec ses 62 000 m², cinquième plus grande place de France, elle est la plus grande place piétonnière d'Europe.",
		picture:
			"https://www.republique-grolee-carnot.com/wp-content/uploads/2021/10/place-bellecour-lyon-1.webp",
	};

	const place2 = {
		longitude: "4.822626",
		latitude: "45.7622928",
		name: "La Basilique Notre Dame de Fourvière",
		adress: "8 Pl. de Fourvière, 69005 Lyon",
		description:
			"Basilique du XIXe siècle avec 4 tours octogonales, musée d'Art religieux et offices catholiques réguliers.",
		picture:
			"https://www.republique-grolee-carnot.com/wp-content/uploads/2021/10/place-bellecour-lyon-1.webp",
	};

	const restaurantIcon = L.icon({
		iconUrl: restaurant,
		iconSize: [50, 50],
		iconAnchor: [12, 12],
		popupAnchor: [0, 0],
	});

	const buildingIcon = L.icon({
		iconUrl: building,
		iconSize: [50, 50],
		iconAnchor: [12, 12],
		popupAnchor: [0, 0],
	});

	return (
		<>
			<MapContainer
				center={[parseFloat(city.latitude), parseFloat(city.longitude)]}
				zoom={13}
				scrollWheelZoom={true}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://wxs.ign.fr/pratique/wmts/?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&STYLE=normal&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image%2Fjpeg"
				/>
				<Marker
					position={[parseFloat(place1.latitude), parseFloat(place1.longitude)]}
					icon={restaurantIcon}
				>
					<Popup>
						{place1.name} <br /> {place1.adress}
					</Popup>
				</Marker>{" "}
				<Marker
					position={[parseFloat(place2.latitude), parseFloat(place2.longitude)]}
					icon={buildingIcon}
				>
					<Popup>
						{place2.name} <br /> {place2.adress}
					</Popup>
				</Marker>
			</MapContainer>
		</>
	);
}
