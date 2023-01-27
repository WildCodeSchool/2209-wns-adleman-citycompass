import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";

// Type any is from documentation
export default function Home({ navigation }: any) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() =>
          navigation.navigate("Place-details", {
            itemId: 1,
          })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({});
