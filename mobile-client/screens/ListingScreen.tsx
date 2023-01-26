import { Text, StyleSheet, FlatList, Image, View } from "react-native";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const DATA_City = [
	{ id: 1, name: "Chartres", picture: "https://picsum.photos/500/400" },
	{ id: 2, name: "Lyon", picture: "https://picsum.photos/500/400" },
	{ id: 3, name: "Strasbourg", picture: "https://picsum.photos/500/400" },
];

const DATA_POI = [
	{ id: 1, name: "Cathédrale Notre Dame", city_id: 1 },
	{ id: 2, name: "Gare", adress: "12 avenue de la gare 28300", city_id: 1 },
	{ id: 3, name: "Musée", city_id: 1 },
	{ id: 4, name: "Fourvière", city_id: 2 },
	{ id: 5, name: "Traboules", city_id: 2 },
	{ id: 6, name: "Stade de la Meinau", city_id: 3 },
];

export default function ListingScreen() {
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

	return DATA_City.length > 0 ? (
		<FlatList
			onLayout={onLayoutRootView}
			style={styles.container}
			data={DATA_City}
			keyExtractor={(DATA_City) => DATA_City.id.toString()}
			renderItem={(itemData) => {
				return (
					<>
						<Text style={styles.title}>{itemData.item.name}</Text>

						<FlatList
							data={DATA_POI}
							keyExtractor={(itemData) => itemData.id.toString()}
							renderItem={(poiData) => {
								return (
									<>
										{poiData.item.city_id === itemData.item.id ? (
											<View style={styles.cardPoi}>
												<View style={styles.containerText}>
													<Text style={styles.poiText}>
														{poiData.item.name}
													</Text>
													{poiData.item.adress ? (
														<Text style={styles.poiText}>
															{poiData.item.adress}
														</Text>
													) : null}
												</View>
												<Image
													style={styles.poiPicture}
													source={{
														uri: itemData.item.picture,
													}}
												/>
											</View>
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
		flexDirection: "row-reverse",
		borderTopRightRadius: 40,
		borderBottomRightRadius: 40,
		borderBottomLeftRadius: 40,
		backgroundColor: "#F5F2E1",
		marginBottom: 20,
		overflow: "hidden",
	},
	containerText: {
		flex: 2,
	},
	poiText: {
		padding: 15,
		fontSize: 18,
	},

	poiPicture: {
		flex: 1,
		height: 150,
		// borderBottomRightRadius: 40,
		borderBottomLeftRadius: 40,
	},
});
