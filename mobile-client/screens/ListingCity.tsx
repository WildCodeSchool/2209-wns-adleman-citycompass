import { Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useGetCitiesQuery } from "../gql/generated/schema";

SplashScreen.preventAutoHideAsync();

export default function ListingCity({ navigation }: any) {
  const cities = useGetCitiesQuery();
  const DATA_City = cities.data?.getCities || [];

  const [fontsLoaded] = useFonts({
    "Lato-Black": require("../assets/fonts/Lato/Lato-Black.ttf"),
    "Karla-Medium": require("../assets/fonts/Karla/static/Karla-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return DATA_City.length > 0 ? (
    <>
      <Text style={styles.titleText}>Choisissez votre ville</Text>
      <FlatList
        onLayout={onLayoutRootView}
        style={styles.container}
        data={DATA_City}
        keyExtractor={(DATA_City) => DATA_City.id.toString()}
        renderItem={(DATA_City) => {
          return (
            <>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("City-details", {
                    CityName: DATA_City.item.name,
                    CityId: DATA_City.item.id,
                  })
                }
              >
                <Text style={styles.title}>{DATA_City.item.name}</Text>
              </TouchableOpacity>
            </>
          );
        }}
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
  titleText: {
    flex: 0.03,
    padding: 15,
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Karla-Medium",
    backgroundColor: "#F6CDAF",
  },

  poiPicture: {
    flex: 1,
    height: 250,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
  },
});
