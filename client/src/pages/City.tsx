import MapCity from "../components/MapCity";
import Hero from "../components/Hero";
import { useGetOneCitybyIdQuery } from "../gql/generated/schema";
import { useParams, useLocation } from "react-router-dom";

export default function City() {
	const { cityId = "" } = useParams();

	const { data } = useGetOneCitybyIdQuery({
		variables: { getOneCitybyId: cityId },
	});

	const city = data?.getOneCitybyId;

	// Get the url and get each individual link for breadcrumbs /
	function GenerateBreadcrumbs() {
		const router = useLocation()
			.pathname.split("/")
			.filter((v) => v.length > 0);

		const crumblist = router.map((subpath, id) => {
			const href = "/" + router.slice(0, id + 1).join("/");
			const title = subpath;
			return { href, title };
		});
		return [{ href: "/", title: "Accueil" }, ...crumblist];
	}
	const breadcrumbs = GenerateBreadcrumbs();

	console.log(breadcrumbs);

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
