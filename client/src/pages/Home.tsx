import Hero from "../components/Hero";
import heroHomeImg from "../assets/images/homeHeroBG.png";

export default function Home() {
  const heroHome = {
    name: "Partagez et découvrez des points d’intérêts",
    picture: heroHomeImg,
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio adipisci quae  axime error quaerat est incidunt voluptas officiis, quia sapiente ad molestiae pariatur saepe enim porro a deleniti, aperiam et.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio adipisci quae  axime error quaerat est incidunt voluptas officiis, quia sapiente ad molestiae pariatur saepe enim porro a deleniti, aperiam et.",
  };

  const action = {
    title: "Chercher une inspiration",
  };

  return (
    <div className="flex h-full flex-col justify-between">
      <Hero heroContent={heroHome} action={action} />
      <div className="container">
        <h1 className=" drop-shadow-xl">Titre 1</h1>
        <h2 className="drop">Titre 2</h2>
        <h3>Titre 3</h3>
        <h4>Titre 4</h4>
        <p className="">Mon super test</p>
      </div>
    </div>
  );
}
