import React from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import { useGetOnePlacebyIdQuery } from "../gql/generated/schema";

export default function PlaceDetails({ route }: any) {
  const { itemId } = route.params;

  const { data } = useGetOnePlacebyIdQuery({
    variables: { getOnePlacebyIdId: itemId.toString() },
  });

  const place = data?.getOnePlacebyId;

  return (
    <ScrollView style={styles.container}>
      {/* first section : presentation */}
      <View style={styles.firstSection}>
        <Image source={{ uri: place?.picture }} style={styles.image} />
        <Text style={styles.title1}>{place?.name}</Text>
        {/* adress block */}
        <View style={styles.innerBlock}>
          <Image
            source={require("../assets/address-icon-mobile.png")}
            style={styles.icon}
          />
          <Text>{place?.adress}</Text>
        </View>
        {/* website block */}
        <View style={styles.innerBlock}>
          <Image
            source={require("../assets/website-icon-mobile.png")}
            style={styles.icon}
          />
          <Text>{place?.website}</Text>
        </View>
      </View>

      {/* second section : description */}
      <View style={styles.secondSection}>
        <Text style={styles.title2}>Description</Text>
        <Text style={styles.description}>{place?.description}</Text>
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
