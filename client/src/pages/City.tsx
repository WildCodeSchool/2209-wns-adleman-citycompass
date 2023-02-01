import MapCity from "../components/MapCity";
import Hero from "../components/Hero";
import { useGetOneCitybyIdQuery } from "../gql/generated/schema";

export default function City() {
	const id = "14";
	const { data } = useGetOneCitybyIdQuery({
		variables: { getOneCitybyId: id },
	});

	const city = data?.getOneCitybyId;

	//https://medium.com/@mattywilliams/generating-an-automatic-breadcrumb-in-react-router-fed01af1fc3
	const breadcrumbs = [
		{ name: "Accueil", link: "/" },
		{ name: "cities", link: "" },
		{ name: " Lyon", link: "" },
	];

	return (
		<>
			<Hero heroContent={city} breadcrumbs={breadcrumbs} />
			<MapCity />
		</>
	);
}
