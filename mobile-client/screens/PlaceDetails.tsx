import React from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import { useGetOnePlacebyIdQuery } from "../gql/generated/schema";
import { A } from "@expo/html-elements";

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
          <A
            href={
              "https://www.google.com/maps/search/?api=1&query=" +
              place?.adress +
              "+field"
            }
          >
            {place?.adress}
          </A>
        </View>
        {/* website block */}
        <View style={styles.innerBlock}>
          <Image
            source={require("../assets/website-icon-mobile.png")}
            style={styles.icon}
          />
          <A href={place?.website}>{place?.website}</A>
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
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  title1: {
    padding: 5,
    fontSize: 40,
    textTransform: "uppercase",
    fontFamily: "Lato-Black",
    textAlign: "center",
    paddingVertical: 20,
    textShadowColor: "#F6CDAF",
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 1,
  },
  secondSection: {
    flex: 1,
    marginBottom: 50,
  },
  title2: {
    color: "#23272D",
    fontSize: 25,
    fontWeight: "500",
    textAlign: "center",
    fontFamily: "Lato-Black",
  },
  description: {
    color: "#23272D",
    fontFamily: "Karla-Medium",
    padding: 20,
    lineHeight: 25,
  },
});
