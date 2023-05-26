import {
  Text,
  StyleSheet,
  FlatList,
  Image,
  View,
  Button,
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
    latitude: 0,
    longitude: 0,
  });
  const [sortedPoiCoords, setSortedPoiCoords] = useState<any>([]);
  const [sorted, setSorted] = useState(false);

  useEffect(() => {}, [sortedPoiCoords]);

  const getUserLocation = async () => {
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
        console.log(userLocation);
      }
    } catch (error) {
      console.log("Error getting location", error);
    }
  };

  const orderPoiCoords = () => {
    setSorted(!sorted);
    console.log("clicked");
    console.log("unordered", sortedPoiCoords);
    if (!userLocation) {
      console.log("getting user loc");
      getUserLocation();
    } else {
      console.log("creating order");
      const PoiDistances = DATA_POI.map((poi: any) => {
        const distance = calculateDistance(userLocation!, poi); // Use non-null assertion operator
        return { ...poi, distance };
      });
      const sortedPoiCoords = PoiDistances.sort((placeA: any, placeB: any) => {
        return placeA.distance - placeB.distance;
      });
      setSortedPoiCoords(sortedPoiCoords);
      console.log("is sorted", sortedPoiCoords);
    }
  };

  // Function to calculate the distance between two coordinates using the Haversine formula
  const calculateDistance = (
    userLocation: CityCoordInt,
    cityCoord: CityCoord
  ) => {
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
    const distance = earthRadius * c;

    return distance;
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
          <Text style={styles.poiText}>{DATA_POI.item.name}</Text>
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
      <Button title="Trier par distance" onPress={orderPoiCoords} />
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
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#fff",
  },
  button: {
    borderRadius: 60,
    backgroundColor: "#F6CDAF",
    margin: 20,
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
    marginBottom: 20,
    overflow: "hidden",
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
});
