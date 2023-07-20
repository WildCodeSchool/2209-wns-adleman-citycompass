import Category from "../entity/Category";
import datasource from "../db";
import City from "../entity/City";
import Place from "../entity/Place";
import User from "../entity/User";
import { hashPassword } from "../helpers/hashing";

async function reset(): Promise<void> {
  await datasource.initialize();

  // delete all datas in DB
  await datasource.getRepository(City).delete({});
  await datasource.getRepository(Place).delete({});
  await datasource.getRepository(Category).delete({});
  await datasource.getRepository(User).delete({});

  // create fake cities in DB
  const marseille = await datasource.getRepository(City).save({
    name: "Marseille",
    picture:
      "https://www.wonderbox.fr/blog/wp-content/uploads/sites/4/2020/02/Visiter-Marseille-en-10-lieux-marseille-scaled-1-1-2048x1367.jpeg",
    description:
      "Marseille (Marsiho en provençal) est la principale ville française du littoral méditerranéen de Provence (Sud-Est de la France), chef-lieu du département des Bouches-du-Rhône et préfecture de la région Provence-Alpes-Côte d'Azur. Plus ancienne ville de France3, fondée vers 600 av. J.-C. par des marins et des marchands grecs originaires de Phocée (aujourd'hui Foça en Turquie, près d'Izmir) sous le nom de Μασσαλία / Massalía, Marseille est depuis l'Antiquité un important port de commerce et de passage. Elle connaît un essor commercial considérable pendant la période coloniale et plus particulièrement au cours du xixe siècle, devenant une ville industrielle et négociante prospère4. Héritage de ce passé, le Grand port maritime de Marseille (GPMM) et l'économie maritime constituent l'un des pôles majeurs de l'activité régionale et nationale5, et Marseille reste le premier port français, le deuxieme port méditerranéen6 et le cinquième port européen7. Sa situation privilégiée en bordure de la Méditerranée permettant l'arrivée de nombreux câbles sous marins fait également de Marseille le neuvième hub de connexion au réseau internet mondial avec une des plus fortes croissances mondiales sur ce secteur.",
    latitude: "43.296174",
    longitude: "5.3699525",
  });
  const lyon = await datasource.getRepository(City).save({
    name: "Lyon",
    picture:
      "https://www.kayak.fr/news/wp-content/uploads/sites/7/2022/05/DEST_FRANCE_LYON_SAINT-GEORGES-GettyImages-982750890-768x525.jpg",
    description:
      "Lyon, est une commune française située dans le quart sud-est de la France, au confluent du Rhône et de la Saône. Siège du conseil de la métropole de Lyon, à laquelle son statut particulier confère à la fois les attributions d'une métropole et d'un département, elle est aussi le chef-lieu de l'arrondissement de Lyon, celui de la circonscription départementale du Rhône et celui de la région Auvergne-Rhône-Alpes. Ses habitants sont appelés les Lyonnais. La commune a une situation de carrefour géographique du pays, au nord du couloir rhodanien qui court de Lyon à Marseille. Située entre le Massif central à l'ouest et le massif alpin à l'est, la ville de Lyon occupe une position stratégique dans la circulation nord-sud en Europe. Ancienne capitale des Gaules du temps de l'Empire romain, elle est le siège d'un archevêché dont le titulaire porte le titre de primat des Gaules. Lyon devint une ville très commerçante et une place financière de premier ordre à la Renaissance. Sa prospérité économique est portée aussi à cette époque par la soierie et l'imprimerie puis par l'apparition des industries notamment textiles, chimiques et, plus récemment, par l'industrie de l'image.",
    latitude: "45.764043",
    longitude: "4.835659",
  });
  const strasbourg = await datasource.getRepository(City).save({
    name: "Strasbourg",
    picture:
      "https://www.kayak.fr/news/wp-content/uploads/sites/7/2022/06/DEST_FRANCE_STRASBOURG_GettyImages-928351986-768x525.jpg",
    description:
      "Strasbourg, est une commune française située dans la collectivité européenne d'Alsace dont elle est le chef-lieu. Elle est la préfecture du Bas-Rhin et de la région Grand Est. Capitale de la région historique d'Alsace, elle est bordée par le Rhin et directement frontalière avec l'Allemagne. Strasbourg est une des trois « capitales européennes » aux côtés de Bruxelles et Luxembourg, elle est parfois qualifiée de capitale parlementaire de l'Union européenne. La ville accueille en effet de multiples institutions européennes, notamment le Conseil de l'Europe dont dépendent la Cour européenne des droits de l'homme et la Pharmacopée européenne, mais également le Parlement européen ou encore le Médiateur européen. Avec notamment Bâle, Genève et New York, Strasbourg est l'une des rares villes au monde à être le siège de plusieurs institutions internationales sans être capitale politique d’un État2. Strasbourg est également la deuxième ville de France en nombre de congrès internationaux, après Paris.",
    latitude: "48.573405",
    longitude: "7.752111",
  });
  const bordeaux = await datasource.getRepository(City).save({
    name: "Bordeaux",
    picture:
      "https://www.kayak.fr/news/wp-content/uploads/sites/7/2022/06/dest_france_bordeaux_shutterstock-portfolio_1389527012_universal_within-usage-period_64159-820x656.jpg",
    description:
      " est une commune française située dans le département de la Gironde, en région Nouvelle-Aquitaine. Capitale de Gaule aquitaine sous l'Empire romain durant près de 200 ans, puis capitale du duché d'Aquitaine au sein de la couronne d'Angleterre du xiie au milieu du xve siècle, et de la province de Guyenne pour le royaume de France, elle est aujourd'hui le chef-lieu et la préfecture de la région Nouvelle-Aquitaine, du département de la Gironde et le siège de Bordeaux Métropole. Au 1er janvier 2019, elle est la neuvième commune de France par sa population avec 260 958 habitants. Toutefois, avec 986 879 habitants (2019), l'unité urbaine de Bordeaux est la sixième unité urbaine de France. La ville est également le centre d'une métropole de 814 049 habitants (2019). Au sein de l'Union européenne, Bordeaux se classe parmi les parmi les grands « pôles régionaux supérieurs » par sa taille et l'influence que représente son aire d'attraction composée de 275 communes.",
    latitude: "44.837789",
    longitude: "-0.579180",
  });

  // create fake categories in DB
  const bar = await datasource.getRepository(Category).save({
    name: "Bar",
    picto: "https://zupimages.net/up/23/09/cyg3.png",
  });
  const cinema = await datasource.getRepository(Category).save({
    name: "Cinema",
    picto: "https://zupimages.net/up/23/09/r5oc.png",
  });
  const hotel = await datasource.getRepository(Category).save({
    name: "Hotel",
    picto: "https://zupimages.net/up/23/09/r4mz.png",
  });
  const library = await datasource.getRepository(Category).save({
    name: "Library",
    picto: "https://zupimages.net/up/23/09/mhso.png",
  });
  const monument = await datasource.getRepository(Category).save({
    name: "Monument",
    picto: "https://zupimages.net/up/23/09/hp6v.png",
  });
  const park = await datasource.getRepository(Category).save({
    name: "Park",
    picto: "https://zupimages.net/up/23/09/nhcc.png",
  });
  const restaurant = await datasource.getRepository(Category).save({
    name: "Restaurant",
    picto: "https://zupimages.net/up/23/09/9k1h.png",
  });
  const sport = await datasource.getRepository(Category).save({
    name: "Sport",
    picto: "https://zupimages.net/up/23/09/rhv6.png",
  });
  const travel = await datasource.getRepository(Category).save({
    name: "Travel",
    picto: "https://zupimages.net/up/23/09/6vet.png",
  });

  // create fakes user (one by role)

  const tam = await datasource.getRepository(User).save({
    firstname: "Tam",
    lastname: "superadmin",
    email: "superadmin@mail.com",
    password: await hashPassword("superadminPassword1!"),
    picture: "https://i.pravatar.cc/300",
    role: "superadmin",
    managedCities: await datasource.getRepository(City).find(),
  });

  const tom = await datasource.getRepository(User).save({
    firstname: "Tom",
    lastname: "contributor",
    email: "contributor2@mail.com",
    password: await hashPassword("contributorPassword2!"),
    picture: "https://i.pravatar.cc/300",
    role: "contributor",
    managedCities: [
      (await datasource
        .getRepository(City)
        .findOneBy({ name: "Marseille" })) as City,
    ],
  });

  await datasource.getRepository(User).save([
    {
      firstname: "Jane",
      lastname: "visitor",
      email: "visitor@mail.com",
      password: await hashPassword("visitorPassword1!"),
      picture: "https://i.pravatar.cc/300",
    },
    {
      firstname: "John",
      lastname: "contributor",
      email: "contributor@mail.com",
      password: await hashPassword("contributorPassword1!"),
      picture: "https://i.pravatar.cc/300",
      role: "contributor",
      managedCities: [
        (await datasource
          .getRepository(City)
          .findOneBy({ name: "Lyon" })) as City,
      ],
    },
    {
      firstname: "Tim",
      lastname: "admin",
      email: "admin@mail.com",
      password: await hashPassword("adminPassword1!"),
      picture: "https://i.pravatar.cc/300",
      role: "admin",
      managedCities: [
        (await datasource
          .getRepository(City)
          .findOneBy({ name: "Marseille" })) as City,
        (await datasource
          .getRepository(City)
          .findOneBy({ name: "Lyon" })) as City,
      ],
    },
    {
      firstname: "Tom",
      lastname: "admin",
      email: "admin2@mail.com",
      password: await hashPassword("adminPassword2!"),
      picture: "https://i.pravatar.cc/300",
      role: "admin",
    },
  ]);

  // create fake places in DB
  await datasource.getRepository(Place).save([
    {
      name: "Orange Vélodrome",
      latitude: "43.269835",
      longitude: "5.3959117",
      adress: "3 Bd Michelet, 13008 Marseille",
      website: "https://www.orangevelodrome.com/",
      picture:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/67/80/d8/stade-velodrome.jpg?w=1200&h=-1&s=1",
      description:
        "Le stade Vélodrome, aussi appelé, depuis plus longtemps, Stade-Vélodrome et rebaptisé Orange Vélodrome par contrat de naming en juillet 2016, est une enceinte sportive située dans le 8e arrondissement de Marseille (Bouches-du-Rhône), au sein du quartier de Saint-Giniez. Principal équipement sportif de la ville et deuxième stade de France en termes de capacité, le Vélodrome est utilisé par le club de football de l'Olympique de Marseille depuis son inauguration en 1937. Initialement de 35 000 places, le stade accueille, outre le football, des courses cyclistes (le vélodrome sera supprimé dans les années 1980), de rugby à XIII (rencontres de l'équipe de France et du Marseille XIII, club créé par Paul Ricard en 1946), des matches du XV de France qui n'y a perdu que deux fois, ainsi que certaines rencontres de phase finale du Championnat de France de rugby à XV et du RC Toulon, sans oublier des concerts de grande ampleur.",

      city: {
        id: marseille.id,
      },
      category: {
        id: sport.id,
      },
      author: { id: tam.id },
    },
    {
      name: "Parc National des Calanques",
      latitude: "43.2094444",
      longitude: "5.449167",
      adress: "Grotte Bleue, Vallon de Sugiton, 13009 Marseille",
      website: "https://fr.wikipedia.org/wiki/Parc_national_des_Calanques",
      picture:
        "https://i0.wp.com/www.photo-paysage.com/albums/Provence/calanques/cassis/calanque-d-en-vau.jpg",
      description:
        "Le parc national des Calanques est un parc national français, couvrant, notamment, les calanques de Marseille, dans le département des Bouches-du-Rhône, au cœur de la métropole d'Aix-Marseille-Provence. Créé en 2012, il est le premier parc national périurbain d'Europe à la fois terrestre et marin. Il s'étend sur un massif littoral constitué de falaises calcaires et de poudingue, de criques et d'îlots qui constituent des écosystèmes relativement préservés pour de nombreuses espèces vivantes. Le plus haut sommet du parc national des Calanques est le mont Carpiagne (645 m) au cœur du massif de Saint-Cyr. Depuis plus d'un siècle, le site est fréquenté par de nombreux usagers dans un cadre professionnel ou touristique et sportif : pêcheurs, chasseurs, promeneurs, randonneurs, grimpeurs, plongeurs et, plus récemment, traileurs.",
      city: {
        id: marseille.id,
      },
      category: {
        id: park.id,
      },
      author: { id: tam.id },
    },
    {
      name: "La Delicatesse",
      latitude: "43.2993873",
      longitude: "5.3860478",
      adress: "7 Bd de la Libération, 13001 Marseille",
      website: "https://www.la-delicatesse.fr/",
      picture:
        "https://res.cloudinary.com/tf-lab/image/upload/w_800,c_fill,q_auto,f_auto,b_white/restaurant/a3a17f0c-a770-4394-aae3-2ed5e4da3ebb/4e9c8c59-89e6-4822-b717-793b59a85d87.jpg",
      description:
        "Le Restaurant la Délicatesse est situé dans le 1er arrondissement de Marseille. Près du Palais Longchamp et de l’église de Saint-Vincent de Paul venez découvrir ce restaurant bistronomique. Pour un déjeuner ou un dîner, entre amis ou en famille, venez passer un agréable moment en notre compagnie à la Délicatesse. A la Délicatesse, vous dégusterez des produits frais et faits maison. Le chef choisit ses produits et élabore ses plats avec délicatesse. Nous proposons une cuisine régionale de poissons et de viandes pour ravir toutes les papilles.",
      city: { id: marseille.id },
      category: { id: restaurant.id },
      author: { id: tam.id },
    },
    {
      name: "Muséum d'histoire naturelle",
      latitude: "43.304295",
      longitude: "5.394568",
      adress: "Palais Longchamp, Rue Espérandieu, 13004 Marseille",
      website:
        "https://musees.marseille.fr/museum-dhistoire-naturelle-de-marseille-mhnm-0",
      picture:
        "https://musees.marseille.fr/sites/default/files/styles/banner_middle/public/2020-04/MUSEE%20HISTOIRE%20NATURELLE.jpg",
      description:
        "Le muséum d’histoire naturelle de Marseille a été créé en 1819 par Jean-Baptiste, marquis de Montgrand, maire de Marseille de mars 1813 à 1830 et le comte de Villeneuve-Bargemon, alors préfet. Il occupe, depuis 1869, l’aile droite du Palais Longchamp construit par l’architecte Henri-Jacques Espérandieu (1829-1874), dans le 4e arrondissement de Marseille. Le muséum a été créé en 1819. Il a occupé différents lieux, dont la Chapelle des Bernardines, avant de s'implanter définitivement en 1869 au Palais Longchamp qu'il partage avec le musée des Beaux-Arts. Le musée est aujourd'hui sous la tutelle du ministère de l'Enseignement supérieur et de la Recherche. Il a été classé musée de France en 2002.",

      city: {
        id: marseille.id,
      },
      category: {
        id: monument.id,
      },
      author: { id: tom.id },
    },
    {
      name: "Théâtres Romains de Fourvière",
      latitude: "45.7605243",
      longitude: "4.820062",
      adress: "17 Rue Cleberg, 69005 Lyon",
      website: "https://lugdunum.grandlyon.com/fr/",
      picture:
        "https://lugdunum.grandlyon.com/var/site/storage/images/_aliases/reference/0/1/9/2/2910-1-fre-FR/1_theatres.jpg",
      description:
        "Le théâtre antique de Lugdunum est un des principaux monuments romains visibles à Lyon. Il est adossé à la colline de Fourvière, en dessous de son sommet, ce qui le plaçait près du centre de la colonie romaine. Construit au début de l'Empire, peut-être sous Auguste, il est agrandi à la fin du ier siècle ou au début du iie siècle, et peut alors accueillir jusqu’à 10 000 spectateurs. Abandonné à la fin de l'Empire romain, il est transformé en carrière et fortement endommagé puis, complètement enseveli au Moyen Âge, il tombe dans l'oubli. Il est repéré par hasard à la fin du xixe siècle, puis entièrement dégagé et restauré à partir de 1933. Il forme avec ses voisins l'Odéon antique, le pseudo-sanctuaire de Cybèle et le musée gallo-romain un site archéologique remarquable, emblématique du Lyon antique.",
      city: {
        id: lyon.id,
      },
      category: {
        id: monument.id,
      },
      author: { id: tam.id },
    },
    {
      name: "Bar Le Florian, Cocktails & Spirits",
      latitude: "45.763325",
      longitude: "4.828784",
      adress: "4 Pl. de la Baleine, 69005 Lyon",
      website: "https://barleflorian.com/",
      picture: "https://www.materrazza.com/sites/default/files/flo.jpg",
      description:
        "Entité lyonnaise depuis 2012, le bar à cocktails Le Florian est une référence à Lyon. Situé en plein cœur du quartier historique et patrimoine de l’UNESCO : le Vieux-Lyon. Nous offrons une carte de cocktails changeante au rythme des saisons avec nos créations, les classiques, ainsi qu’une large sélection de spiritueux, vins champagne et bières. Profitez de notre cadre unique : un décor renaissance vénitienne, bâtiment du 15e siècle associé à une ambiance Hip–hop & jazz, funk soul. À partir du 5 mars 2022, profitez de notre terrasse unique à l’ombre du tilleul. À très bientôt !",

      city: {
        id: lyon.id,
      },
      category: {
        id: bar.id,
      },
      author: { id: tam.id },
    },
    {
      name: "Lyon Part Dieu",
      latitude: "45.759438",
      longitude: "4.859287",
      adress: "5 Pl. Charles Béraudier, 69003 Lyon",
      website:
        "https://www.garesetconnexions.sncf/fr/gares-services/lyon-part-dieu",
      picture:
        "https://www.lyoncapitale.fr/wp-content/uploads/2018/09/Gare-de-la-part-dieu-biblioth%C3%A8que-tour-%C2%A9-Tim-Douet_0042-770x433.jpg",
      description:
        "La gare de Lyon-Part-Dieu, située dans le quartier de La Part-Dieu, est une gare ferroviaire française de la ville de Lyon, chef-lieu de la région Auvergne-Rhône-Alpes. Gare de la Société nationale des chemins de fer français (SNCF), elle accueille les trafics internationaux, nationaux et régionaux et est la première gare européenne par le nombre de voyageurs en correspondance et, en France, la première gare de province par le nombre annuel de voyageurs. Construite à l'emplacement d'une première gare aux marchandises du même nom, la gare de la Part-Dieu remplace la gare de Lyon-Brotteaux (située à 700 mètres au nord sur les mêmes lignes), qui a été fermée en 1983. Conçue par les architectes Eugène Gachon et Jean-Louis Girodet, elle a été mise en service le 13 juin 1983 dans le cadre d'une opération d'aménagement urbain qui a vu la création d'un second centre-ville de Lyon et l'un des plus grands centres commerciaux de France, le centre commercial de La Part-Dieu situé juste en face de la gare sur le boulevard Vivier-Merle, un important centre administratif et un centre d'affaires dominés par « le crayon » (Tour Part-Dieu).",
      city: {
        id: lyon.id,
      },
      category: {
        id: travel.id,
      },
      author: { id: tam.id },
    },
    {
      name: "Hotel Carlton Lyon - MGallery Hotel Collection",
      latitude: "45.761034",
      longitude: "4.836677",
      adress: "4 Rue Jussieu, 69002 Lyon",
      website:
        "https://all.accor.com/hotel/2950/index.fr.shtml?utm_campaign=seo+maps&utm_medium=seo+maps&utm_source=google+Maps",
      picture: "https://www.ahstatic.com/photos/2950_ho_00_p_1024x768.jpg",
      description:
        "Situé sur la presqu'île, laissez-vous séduire par l'Hôtel Carlton Lyon MGallery. Il a su garder son authenticité et sa personnalité en alliant confort contemporain et raffinement. Profitez d'un moment de détente dans l'une des 80 chambres à la décoration soignée, dans notre Spa Codage ou encore au bar à l'ambiance feutrée. A 5 minutes à pied du métro Bellecour, l'hôtel est le point de départ idéal pour découvrir Lyon: son opéra, ses musées, sa cathédrale St Jean. La Presqu'île de Lyon, située entre Rhône et Saône, offre de multiples atouts pour un séjour au centre de la ville. Musées, opéra, théâtres, commerces, restaurants et authentiques « bouchons lyonnais », il y a tant à faire à seulement deux pas de l'hôtel Vous pourrez également profiter d'un petit déjeuner aux accents lyonnais, d'un massage Haute Couture ou d'un cocktail dans notre bar cosy ; autant d'expériences mémorables que vous offre l'Hôtel Carlton Lyon Mgallery !",
      city: {
        id: lyon.id,
      },
      category: {
        id: hotel.id,
      },
      author: { id: tam.id },
    },
    {
      name: "UGC Ciné Cité Strasbourg Etoile",
      latitude: "48.5729142",
      longitude: "7.745704",
      adress: "25 Av. du Rhin, 67100 Strasbourg",
      website: "https://www.ugc.fr/cinema.html?id=30",
      picture: "https://live.staticflickr.com/860/42987038115_bde775fca9_b.jpg",
      description:
        "L'UGC Ciné Cité Strasbourg Étoile est un multiplexe situé à Strasbourg, à proximité de la place de l'Étoile. Bordant le bassin d'Austerlitz, il fait face au centre commercial Rivetoile ainsi qu'à l'ancien armement Seegmuller, et prend place au cœur du nouveau quartier Fronts de Neudorf. Il a été inauguré le 29 novembre 2000. C'est le plus grand UGC Ciné Cité d'Europe puisqu'il compte 22 salles accessibles aux handicapés et équipées pour accueillir les mal entendants et a une capacité de 5 400 places faisant de lui le deuxième plus grand cinéma de France et cinquième d'Europe.",
      city: {
        id: strasbourg.id,
      },
      category: {
        id: cinema.id,
      },
      author: { id: tam.id },
    },
    {
      name: "Cathédrale Notre Dame",
      latitude: "48.582123",
      longitude: "7.750594",
      adress: "Pl. de la Cathédrale, 67000 Strasbourg",
      website: "https://www.cathedrale-strasbourg.fr/",
      picture:
        "https://www.ndcana.com/wp-content/uploads/2022/07/Noter-dame-de-strasbourg.jpg",
      description:
        "La Cathédrale Notre-Dame de Strasbourg est la première cathédrale la plus visitée de France avec 2 500 000 visiteurs en 2019 (la Cathédrale Notre-Dame de Paris n'étant plus accessible au public depuis le terrible incendie qui l'a affecté le Lundi saint 15 avril 2019). Dédiée à la Vierge Marie, la Cathédrale Notre-Dame de Strasbourg a été construite entre le XIIIème et le XVème siècle. Catholique, elle est dite “cathédrale” parce qu’elle abrite la cathèdre – le siège – de l’Archevêque de Strasbourg qui est aujourd’hui Monseigneur Luc RAVEL. Elle est maison de Dieu et dans la maison de Dieu, il y a une place pour chacune et chacun. Au carrefour de l'Europe, la Cathédrale Notre-Dame est un lieu de prière. Célébrations liturgiques ou temps de prières personnelles, la Cathédrale est le lieu de la rencontre de Dieu avec les hommes et les femmes.",
      city: {
        id: strasbourg.id,
      },
      category: {
        id: monument.id,
      },
      author: { id: tam.id },
    },
    {
      name: "Jardin Botanique de l'université",
      latitude: "48.584234",
      longitude: "7.7666278",
      adress: "28 Rue Goethe, 67000 Strasbourg",
      website: "http://jardin-botanique.unistra.fr/",
      picture:
        "https://www.radiofrance.fr/s3/cruiser-production/2021/04/80179f72-9d1c-4019-bd9a-41b81cd3c5dd/560x315_024_3500275.webp",
      description:
        "Le jardin botanique de l'université de Strasbourg est un jardin botanique fondé en 1619 au sein de l'ancienne Académie protestante de la ville, devenu deux ans plus tard université de Strasbourg. Sa création par des professeurs de la faculté de médecine de Strasbourg est due au besoin de formation de leurs étudiants. À l'origine situé dans le quartier de la Krutenau, il déménage en 1884 au cœur du campus historique dans la Neustadt à l'arrière du palais universitaire après l'annexion de l'Alsace-Lorraine. Il est le deuxième plus ancien jardin botanique de France après celui de Montpellier créé en 1593. L'université de Strasbourg trouve ses origines dans la création du Gymnase Jean-Sturm, devenu une Académie en 1566 alors doté de quatre facultés : Théologie, Droit, Médecine et Philosophie.",
      city: {
        id: strasbourg.id,
      },
      category: {
        id: park.id,
      },
      author: { id: tam.id },
    },
    {
      name: "Place de la Bourse",
      latitude: "44.841354",
      longitude: "-0.570417",
      adress: "Pl. de la Bourse, 33000 Bordeaux",
      website: "https://www.bordeaux.fr/l3293",
      picture:
        "https://www.bordeaux.fr/images/ebx/fr/lieu/3293/format5/bourse2_1.jpg",
      description:
        "La place de la Bourse, initialement place Royale, est une place de Bordeaux, en France. Première place ouverte d'Europe, elle a été réalisée sous les intendances de Boucher et Tourny, par les architectes du roi Jacques Gabriel et son fils Ange-Jacques Gabriel, entre 1730 et 1755. Elle est bordée par deux pavillons symétriques : le palais de la Bourse et l'hôtel des douanes. Ces deux édifices conservent toujours leur fonction initiale de chambre de commerce et d'administration des douanes. La place de la Bourse est la première brèche dans les remparts du Moyen Âge et, en tant que place Royale, est destinée à servir de somptueux écrin à la statue équestre du roi de France Louis XV. Inaugurée en 1743, elle est aussi le symbole de la prospérité de la ville, et son nom s'adaptera aux différents régimes politiques.",

      city: {
        id: bordeaux.id,
      },
      category: {
        id: monument.id,
      },
      author: { id: tam.id },
    },
    {
      name: "Librairie Mollat",
      latitude: "44.840868",
      longitude: "-0.578647",
      adress: "15 Rue Vital Carles, 33000 Bordeaux",
      website: "https://www.mollat.com/",
      picture:
        "https://vivrebordeaux.fr/wp-content/uploads/2022/02/Librairie-Mollat.jpg",
      description:
        "La Librairie Mollat est une librairie indépendante située dans le centre-ville de Bordeaux, en France. En 2020, elle est la première librairie indépendante de France. Elle dispose d'une surface de vente de 2 500 m2 et se situe à l'emplacement de la dernière maison de Montesquieu à Bordeaux. La librairie est dirigée à partir de 1896 par Albert Mollat, originaire du Cantal, qui succède alors à son cousin Bourlange, libraire sous la galerie Bordelaise. Le commerce se porte bien. Une diversification est entreprise avec la mise en vente d'articles religieux ainsi que de maroquinerie, et le début d'une production éditoriale (livres de médecine et sur la porcelaine de Vieillard). Plaque sur la façade de la librairie, rue Porte-Dijeaux. En 1928, la librairie déménage vers son site actuel de la porte Dijeaux, pour des questions d'espace, à l’emplacement de la maison de Montesquieu. En 1949, Jean et Albert, les fils du fondateur, lui succèdent. À partir de 1970, sous l’impulsion de William Mollat, fils d’Albert, la librairie s’agrandit. À cette même époque, Francine Mollat succède à son père Jean. En 1990, la librairie comprend cinq magasins sur le même site et un magasin musique, sur une superficie de 1 200 m2 où officient 70 personnes. C’est à cette époque que Denis Mollat prend le relais de son père à la tête de l’entreprise. En 1996, de grands travaux sont effectués.",

      city: {
        id: bordeaux.id,
      },
      category: {
        id: library.id,
      },
      author: { id: tam.id },
    },
    {
      name: "Restaurant LouLou",
      latitude: "44.839863",
      longitude: "-0.569514",
      adress: "16 Rue de la Cour des Aides, 33000 Bordeaux",
      website: "https://www.loulourestaurant.fr/",
      picture:
        "https://villaerizio.fr/wp-content/uploads/2018/09/Loulou-Restaurant.jpg",
      description:
        "Situé dans une enclave de l’église Saint Pierre, au coeur de Bordeaux, le Restaurant LouLou bénéficie d’un emplacement idéal en plein centre ville. On y déguste une cuisine française élaborée à base de produits frais et locaux. Un lieu unique grâce à une décoration soignée, une ambiance chaleureuse, authentique et vivante. Les soirées estivales sur la terrasse au pied de l’église Saint Pierre sauront vous charmer. La salle vous plongera dans l’esprit bistrot comme on l’aime. Une atmosphère exceptionnelle au coeur de Bordeaux. Une carte qui évolue à la manière des saisons.",
      city: {
        id: bordeaux.id,
      },
      category: {
        id: restaurant.id,
      },
      author: { id: tam.id },
    },
    {
      name: "Basilique Saint-Michel",
      latitude: "44.834686",
      longitude: "-0.566473",
      adress: "Pl. Meynard, 33000 Bordeaux",
      website: "https://www.sacrecoeurbordeaux.info/",
      picture:
        "https://planetofhotels.com/guide/sites/default/files/styles/max_1280/public/136176_Bordeaux_BasiliqueStMichelBasilicaofStMichael_1734_9.jpg",
      description:
        "La basilique Saint-Michel de Bordeaux est la deuxième plus grande église catholique de la ville de Bordeaux, dans le sud-ouest de la France. Bâtie du xive au xvie siècle, elle est caractéristique du style gothique flamboyant. L'église a donné son nom au quartier dans lequel elle se situe. La basilique partage avec la cathédrale Saint-André la particularité d'être dotée d'un clocher indépendant du sanctuaire, un campanile. S'élevant à une hauteur de 114 mètres, il est le plus haut du Midi de la France et le troisième plus haut de l'hexagone, derrière la flèche des cathédrales de Rouen (151 mètres) et de Strasbourg (142 mètres). Sa base conserve une crypte qui servit longtemps d'ossuaire, puis de lieu d'exposition pour des « momies » exhumées au xixe siècle lors de l'aménagement de la « place Meynard », ancien cimetière paroissial. Classée monument historique dès 1846, l'église Saint-Michel — devenue basilique mineure en 1903 — est inscrite sur la liste du patrimoine mondial de l'UNESCO depuis 1998 au titre des chemins de Saint-Jacques-de-Compostelle en France.",

      city: {
        id: bordeaux.id,
      },
      category: {
        id: monument.id,
      },
      author: { id: tam.id },
    },
  ]);

  await datasource.destroy();
  console.log("done !");
}

reset().catch(console.error);
