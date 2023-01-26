import React from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import { useGetPlacesQuery } from "../gql/generated/schema";

const POI1 = {
  name: "Place Bellecour",
  adress: "Pl Bellecour, 69002 Lyon",
  description:
    "La place Bellecour est une place du 2ᵉ arrondissement de Lyon, en France. Élément majeur de la ville et sa plus grande place avec ses 62 000 m², cinquième plus grande place de France, elle est la plus grande place piétonnière d'Europe.",
  picture:
    "https://www.republique-grolee-carnot.com/wp-content/uploads/2021/10/place-bellecour-lyon-1.webp",
  website: "https://fr.wikipedia.org/wiki/Place_Bellecour",
};

export default function PlaceDetails({ route }: any) {
  const { itemId } = route.params;
  console.log(itemId);

  const { data, error } = useGetPlacesQuery();
  const place = data?.getPlaces|| [];

  console.log(error);


  return (
    <ScrollView style={styles.container}>
      {/* first section : presentation */}
      <View style={styles.firstSection}>
        <Image source={{ uri: POI1.picture }} style={styles.image} />
        <Text style={styles.title1}>{POI1.name}</Text>
        {/* adress block */}
        <View style={styles.innerBlock}>
          <Image
            source={require("../assets/address-icon-mobile.png")}
            style={styles.icon}
          />
          <Text>{POI1.adress}</Text>
        </View>
        {/* website block */}
        <View style={styles.innerBlock}>
          <Image
            source={require("../assets/website-icon-mobile.png")}
            style={styles.icon}
          />
          <Text>{POI1.website}</Text>
        </View>
      </View>

      {/* second section : description */}
      <View style={styles.secondSection}>
        <Text style={styles.title2}>Description</Text>
        <Text style={styles.description}>{POI1.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    height: 300,
  },
  firstSection: {
    flex: 2,
    justifyContent: "space-between",
    marginBottom: 30,
  },
  innerBlock: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  title1: {
    color: "#23272D",
    fontSize: 30,
    padding: 20,
    fontWeight: "500",
    textTransform: "uppercase",
    textShadowColor: "#F6CDAF",
    textShadowOffset: { width: 3, height: 0 },
    textShadowRadius: 20,
  },
  secondSection: {
    flex: 1,
  },
  title2: {
    color: "#23272D",
    fontSize: 25,
    fontWeight: "500",
    textAlign: "center",
  },
  description: {
    color: "#23272D",
    padding: 20,
    lineHeight: 25,
  },
});
