import { ApolloProvider } from "@apollo/client";
import client from "./gql/client";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListingScreen from "./screens/ListingScreen";
import PlaceDetails from "./screens/PlaceDetails";
import ListingCity from "./screens/ListingCity";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#23272D",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 22,
            },
          }}
          initialRouteName="Home"
        >
          <Stack.Screen name="Home" component={ListingCity}   options={{ title: 'Home' }}/>
          <Stack.Screen name="City-details" component={ListingScreen}  options={{ title: PlaceDetails.name }} />

          <Stack.Screen
            name="Place-details"
            component={PlaceDetails}
            options={{ title: PlaceDetails.name }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
