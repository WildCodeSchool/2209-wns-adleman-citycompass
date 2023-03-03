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
        <h3 className="text-center">à découvrir</h3>
      </div>
    </div>
  );
}
