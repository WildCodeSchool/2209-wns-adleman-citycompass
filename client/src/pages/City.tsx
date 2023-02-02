import MapCity from "../components/MapCity";
import Hero from "../components/Hero";
import { useGetOneCitybyIdQuery } from "../gql/generated/schema";
import { useParams } from "react-router-dom";

export default function City() {
	const { cityId = "" } = useParams();

	const { data } = useGetOneCitybyIdQuery({
		variables: { getOneCitybyId: cityId },
	});

	const city = data?.getOneCitybyId;

	//https://medium.com/@mattywilliams/generating-an-automatic-breadcrumb-in-react-router-fed01af1fc3
	const breadcrumbs = [
		{ name: "Accueil", link: "/" },
		{ name: "cities", link: "" },
		{ name: " Lyon", link: "" },
		{ name: " Autre", link: "" },
	];

	return (
		<>
			<Hero heroContent={city} breadcrumbs={breadcrumbs} />
			<div className="container py-20">
				<h2 className="text-center">Les Points d'intérêts</h2>
			</div>
			<div className="flex flex-col sm:flex-row relative sm:gap-6">
				<div className="w-full md:w-1/2 lg:w-2/3 h-[80vh] z-0">
					<MapCity />
				</div>
				<div className="bg-cream sm:bg-transparent w-full md:w-1/2 lg:w-1/3 absolute sm:relative min-h-[100px] bottom-0 z-10">
					<h3 className="text-center sm:text-left">à découvrir</h3>
				</div>
			</div>
		</>
	);
}
