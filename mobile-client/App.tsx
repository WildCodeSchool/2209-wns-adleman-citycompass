import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import ListingScreen from "./screens/ListingScreen";

const Tab = createBottomTabNavigator();

export default function App() {
	return (
		<>
			<NavigationContainer>
				<Tab.Navigator>
					<Tab.Screen
						name="Listing"
						component={ListingScreen}
						options={{ unmountOnBlur: true }}
					/>
				</Tab.Navigator>
			</NavigationContainer>
		</>
	);
}
