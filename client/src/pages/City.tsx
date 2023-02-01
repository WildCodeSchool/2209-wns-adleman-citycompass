import MapCity from "../components/MapCity";

export default function City() {
  const city = {
    name: "Lyon",
    latitude: "45.764042",
    longitude: "4.835659",
    places: [
      {
        id: 1,
        longitude: "4.8312188",
        latitude: "45.757198",
        name: "Place Bellecour",
        adress: "69002, Lyon",
        picture:
          "https://www.republique-grolee-carnot.com/wp-content/uploads/2021/10/place-bellecour-lyon-1.webp",
        category: {
          id: 6,
          name: "Histiore",
          picto:
            "https://www.republique-grolee-carnot.com/wp-content/uploads/2021/10/place-bellecour-lyon-1.webp",
        },
      },
      {
        id: 2,
        longitude: "4.822626",
        latitude: "45.7622928",
        name: "La Basilique Notre Dame de Fourvière",
        adress: "8 Pl. de Fourvière, 69005 Lyon",
        picture:
          "https://www.republique-grolee-carnot.com/wp-content/uploads/2021/10/place-bellecour-lyon-1.webp",
        category: {
          id: 6,
          name: "Histiore",
          picto: "https://img1.freepng.fr/20180617/aoj/kisspng-computer-icons-clip-art-picto-5b26cc64b3ef02.106318281529269348737.jpg",
        },
      },
    ],
  };

  return (
    <div>
      <p> City</p>
      <MapCity
        cityName={city.name}
        cityLat={city.latitude}
        cityLong={city.longitude}
        places={city.places}
      />
    </div>
  );
}
