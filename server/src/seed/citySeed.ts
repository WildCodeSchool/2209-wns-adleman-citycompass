import datasource from "../db";
import City from "../entity/City";


export default async function createCity(): Promise<void> {
  await datasource.getRepository(City).save([
    { 
        name: "Marseille",
        picture: "https://www.wonderbox.fr/blog/wp-content/uploads/sites/4/2020/02/Visiter-Marseille-en-10-lieux-marseille-scaled-1-1-2048x1367.jpeg",
        description: "Marseille (Marsiho en provençal) est la principale ville française du littoral méditerranéen de Provence (Sud-Est de la France), chef-lieu du département des Bouches-du-Rhône et préfecture de la région Provence-Alpes-Côte d'Azur. Plus ancienne ville de France3, fondée vers 600 av. J.-C. par des marins et des marchands grecs originaires de Phocée (aujourd'hui Foça en Turquie, près d'Izmir) sous le nom de Μασσαλία / Massalía, Marseille est depuis l'Antiquité un important port de commerce et de passage. Elle connaît un essor commercial considérable pendant la période coloniale et plus particulièrement au cours du xixe siècle, devenant une ville industrielle et négociante prospère4. Héritage de ce passé, le Grand port maritime de Marseille (GPMM) et l'économie maritime constituent l'un des pôles majeurs de l'activité régionale et nationale5, et Marseille reste le premier port français, le deuxieme port méditerranéen6 et le cinquième port européen7. Sa situation privilégiée en bordure de la Méditerranée permettant l'arrivée de nombreux câbles sous marins fait également de Marseille le neuvième hub de connexion au réseau internet mondial avec une des plus fortes croissances mondiales sur ce secteur.",
        latitude: "43.296174",
        longitude: "5.3699525"
    },
    { 
        name: "Lyon",
        picture: "https://www.kayak.fr/news/wp-content/uploads/sites/7/2022/05/DEST_FRANCE_LYON_SAINT-GEORGES-GettyImages-982750890-768x525.jpg",
        description: "Lyon, est une commune française située dans le quart sud-est de la France, au confluent du Rhône et de la Saône. Siège du conseil de la métropole de Lyon, à laquelle son statut particulier confère à la fois les attributions d'une métropole et d'un département, elle est aussi le chef-lieu de l'arrondissement de Lyon, celui de la circonscription départementale du Rhône et celui de la région Auvergne-Rhône-Alpes. Ses habitants sont appelés les Lyonnais. La commune a une situation de carrefour géographique du pays, au nord du couloir rhodanien qui court de Lyon à Marseille. Située entre le Massif central à l'ouest et le massif alpin à l'est, la ville de Lyon occupe une position stratégique dans la circulation nord-sud en Europe. Ancienne capitale des Gaules du temps de l'Empire romain, elle est le siège d'un archevêché dont le titulaire porte le titre de primat des Gaules. Lyon devint une ville très commerçante et une place financière de premier ordre à la Renaissance. Sa prospérité économique est portée aussi à cette époque par la soierie et l'imprimerie puis par l'apparition des industries notamment textiles, chimiques et, plus récemment, par l'industrie de l'image.",
        latitude: "45.764043",
        longitude: "4.835659"
    },
    { 
        name: "Strasbourg",
        picture: "https://www.kayak.fr/news/wp-content/uploads/sites/7/2022/06/DEST_FRANCE_STRASBOURG_GettyImages-928351986-768x525.jpg",
        description: "Strasbourg, est une commune française située dans la collectivité européenne d'Alsace dont elle est le chef-lieu. Elle est la préfecture du Bas-Rhin et de la région Grand Est. Capitale de la région historique d'Alsace, elle est bordée par le Rhin et directement frontalière avec l'Allemagne. Strasbourg est une des trois « capitales européennes » aux côtés de Bruxelles et Luxembourg, elle est parfois qualifiée de capitale parlementaire de l'Union européenne. La ville accueille en effet de multiples institutions européennes, notamment le Conseil de l'Europe dont dépendent la Cour européenne des droits de l'homme et la Pharmacopée européenne, mais également le Parlement européen ou encore le Médiateur européen. Avec notamment Bâle, Genève et New York, Strasbourg est l'une des rares villes au monde à être le siège de plusieurs institutions internationales sans être capitale politique d’un État2. Strasbourg est également la deuxième ville de France en nombre de congrès internationaux, après Paris.",
        latitude: "48.573405",
        longitude: "7.752111"
    },
    { 
        name: "Bordeaux",
        picture: "https://www.kayak.fr/news/wp-content/uploads/sites/7/2022/06/dest_france_bordeaux_shutterstock-portfolio_1389527012_universal_within-usage-period_64159-820x656.jpg",
        description: " est une commune française située dans le département de la Gironde, en région Nouvelle-Aquitaine. Capitale de Gaule aquitaine sous l'Empire romain durant près de 200 ans, puis capitale du duché d'Aquitaine au sein de la couronne d'Angleterre du xiie au milieu du xve siècle, et de la province de Guyenne pour le royaume de France, elle est aujourd'hui le chef-lieu et la préfecture de la région Nouvelle-Aquitaine, du département de la Gironde et le siège de Bordeaux Métropole. Au 1er janvier 2019, elle est la neuvième commune de France par sa population avec 260 958 habitants. Toutefois, avec 986 879 habitants (2019), l'unité urbaine de Bordeaux est la sixième unité urbaine de France. La ville est également le centre d'une métropole de 814 049 habitants (2019). Au sein de l'Union européenne, Bordeaux se classe parmi les parmi les grands « pôles régionaux supérieurs » par sa taille et l'influence que représente son aire d'attraction composée de 275 communes.",
        latitude: "44.837789",
        longitude: "-0.579180"
    },

  ]);
}

createCity().catch(console.error);