import { ApolloProvider } from "@apollo/client";
import client from "./gql/client";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListingScreen from "./screens/ListingScreen";
import PlaceDetails from "./screens/PlaceDetails";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Listing" component={ListingScreen} />
          <Stack.Screen
            name="Place-details"
            component={PlaceDetails}
            options={{ title: "Details" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
