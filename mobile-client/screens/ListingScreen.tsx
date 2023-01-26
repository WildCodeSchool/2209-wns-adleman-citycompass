import {
	Text,
	StyleSheet,
	FlatList,
	Image,
	View,
	TouchableOpacity,
} from "react-native";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useGetCitiesQuery } from "../gql/generated/schema";

SplashScreen.preventAutoHideAsync();

// const data_City = [
// 	{ id: 1, name: "Chartres", picture: "https://picsum.photos/500/400" },
// 	{ id: 2, name: "Lyon", picture: "https://picsum.photos/500/400" },
// 	{ id: 3, name: "Strasbourg", picture: "https://picsum.photos/500/400" },
// ];

const DATA_POI = [
	{ id: 1, name: "Cathédrale Notre Dame", city_id: 1 },
	{ id: 2, name: "Gare", adress: "12 avenue de la gare 28300", city_id: 1 },
	{ id: 3, name: "Musée", city_id: 1 },
	{ id: 4, name: "Fourvière", city_id: 2 },
	{ id: 5, name: "Traboules", city_id: 2 },
	{ id: 6, name: "Stade de la Meinau", city_id: 3 },
];

export default function ListingScreen() {
	const { data, error } = useGetCitiesQuery();
	const data_City = data?.getCities || [];

	const [fontsLato] = useFonts({
		"Lato-Black": require("../assets/fonts/Lato/Lato-Black.ttf"),
	});

	const onLayoutRootView = useCallback(async () => {
		if (fontsLato) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLato]);

	if (!fontsLato) {
		return null;
	}

	return data_City.length > 0 ? (
		<FlatList
			onLayout={onLayoutRootView}
			style={styles.container}
			data={data_City}
			keyExtractor={(data_City) => data_City.id.toString()}
			renderItem={(cityData) => {
				return (
					<>
						<Text style={styles.title}>{cityData.item.name}</Text>

						<FlatList
							data={DATA_POI}
							keyExtractor={(cityData) => cityData.id.toString()}
							renderItem={(poiData) => {
								return (
									<>
										{poiData.item.city_id === cityData.item.id ? (
											<TouchableOpacity
												onPress={() => console.log(poiData.item.id)}
											>
												<View style={styles.cardPoi}>
													<Text style={styles.poiText}>
														{poiData.item.name}
													</Text>
													<Image
														style={styles.poiPicture}
														source={{
															uri: cityData.item.picture,
														}}
													/>
												</View>
											</TouchableOpacity>
										) : null}
									</>
								);
							}}
						/>
					</>
				);
			}}
		/>
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
	title: {
		fontSize: 40,
		textTransform: "uppercase",
		fontFamily: "Lato-Black",
		textAlign: "center",
		paddingVertical: 20,
		textShadowColor: "#F6CDAF",
		textShadowOffset: { width: 5, height: 5 },
		textShadowRadius: 0,
	},
	cardPoi: {
		flex: 1,
		// flexDirection: "row",
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
	},

	poiPicture: {
		flex: 1,
		height: 250,
		borderBottomRightRadius: 40,
		borderBottomLeftRadius: 40,
	},
});
