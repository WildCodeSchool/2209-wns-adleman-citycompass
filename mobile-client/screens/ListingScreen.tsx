import {
  Text,
  StyleSheet,
  FlatList,
  Image,
  View,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Location from "expo-location";
import { useGetOneCitybyNameQuery } from "../gql/generated/schema";
import { CityCoord, CityCoordInt } from "../services/interfaces";

SplashScreen.preventAutoHideAsync();

export default function ListingScreen({ navigation, route }: any) {
  const { CityName } = route.params;
  const { data } = useGetOneCitybyNameQuery({
    variables: {
      name: CityName,
    },
  });
  const DATA_POI = data?.getOneCitybyName.places || [];
  const [userLocation, setUserLocation] = useState<CityCoordInt>({
    latitude: undefined,
    longitude: undefined,
  });
  const [sortedPoiCoords, setSortedPoiCoords] = useState<any>([]);
  const [sorted, setSorted] = useState(false);
  const [clickable, setClickable] = useState(false);

  useEffect(() => {
    getUserLocation();
  }, [sortedPoiCoords, clickable]);

  const getUserLocation = async () => {
    console.log("userLoc", userLocation);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      const userLatitude = location.coords.latitude;
      const userLongitude = location.coords.longitude;
      setUserLocation({ latitude: userLatitude, longitude: userLongitude });
      if (userLocation) {
        setClickable(true);
      }
    } catch (error) {
      console.log("Error getting location", error);
    }
  };

  const orderPoiCoords = () => {
    if (clickable) {
      setSorted(!sorted);
      if (!userLocation.latitude) {
        console.log("getting user loc");
        getUserLocation();
      } else {
        console.log("creating order");
        console.log(userLocation);
        const PoiDistances = DATA_POI.map((poi: any) => {
          const distance = calculateDistance(userLocation!, poi); // Use non-null assertion operator
          return { ...poi, distance };
        });

        const sortedPoiCoords = PoiDistances.sort(
          (placeA: any, placeB: any) => {
            return placeA.distance - placeB.distance;
          }
        );
        setSortedPoiCoords(sortedPoiCoords);
      }
    }
  };

  // Function to calculate the distance between two coordinates using the Haversine formula
  const calculateDistance = (
    userLocation: CityCoordInt,
    cityCoord: CityCoord
  ) => {
    if (userLocation.latitude && userLocation.longitude) {
      const earthRadius = 6371; // Earth's radius in kilometers
      const latDiff = degToRad(
        parseFloat(cityCoord.latitude) - userLocation.latitude
      );
      const lonDiff = degToRad(
        parseFloat(cityCoord.longitude) - userLocation.longitude
      );

      const a =
        Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
        Math.cos(degToRad(userLocation.latitude)) *
          Math.cos(degToRad(parseFloat(cityCoord.latitude))) *
          Math.sin(lonDiff / 2) *
          Math.sin(lonDiff / 2);

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      let distance: number | string = earthRadius * c;
      distance = distance.toFixed(2);
      return distance;
    }
  };

  // Helper function to convert degrees to radians
  const degToRad = (degrees: number) => {
    return (degrees * Math.PI) / 180;
  };

  const renderItem = (DATA_POI: any) => (
    <>
      <Text style={styles.title}>{DATA_POI.item.name}</Text>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Place-details", {
            itemId: DATA_POI.item.id,
          })
        }
      >
        <View style={styles.cardPoi}>
          {sorted ? (
            <Text style={styles.poiText}>
              Situé à {DATA_POI.item.distance} km de votre position
            </Text>
          ) : (
            <Text style={styles.poiText}>{DATA_POI.item.adress}</Text>
          )}
          <Image
            style={styles.poiPicture}
            source={{
              uri: DATA_POI.item.picture,
            }}
          />
        </View>
      </TouchableOpacity>
    </>
  );
  return DATA_POI.length > 0 ? (
    <>
      <TouchableOpacity
        key="Trier par distance"
        onPress={orderPoiCoords}
        style={[
          styles.button,
          sorted && styles.selected,
          clickable ? styles.opacity1 : styles.opacity0,
        ]}
      >
        <Text style={[styles.buttonLabel, sorted && styles.selectedLabel]}>
          {sorted ? "Trier par default" : "Trier par distance"}
        </Text>
      </TouchableOpacity>
      <FlatList
        style={styles.container}
        data={sorted ? sortedPoiCoords : DATA_POI}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={renderItem}
      />
    </>
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
    paddingBottom: 110,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 40,
    textTransform: "uppercase",
    fontFamily: "Lato-Black",
    textAlign: "center",
    paddingVertical: 20,
    textShadowColor: "#F6CDAF",
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 1,
  },
  cardPoi: {
    flex: 1,
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    backgroundColor: "#F5F2E1",
    marginBottom: 70,
    overflow: "hidden",
  },
  opacity1: {
    opacity: 1,
  },
  opacity0: {
    opacity: 0.5,
  },
  poiText: {
    flex: 1,
    padding: 15,
    fontSize: 18,
    fontFamily: "Karla-Medium",
  },
  poiPicture: {
    flex: 1,
    height: 250,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 4,
    backgroundColor: "#23272D",
    marginHorizontal: "auto",
    marginVertical: 12,
    textAlign: "center",
    alignSelf: "center",
  },
  selected: {
    backgroundColor: "#84A59D",
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#84A59D",
  },
  selectedLabel: {
    color: "#23272D",
  },
  label: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 24,
  },
});
