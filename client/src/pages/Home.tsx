import Footer from "../components/Footer";

export default function Home() {
  return (
    // Container parent à definir : pour l'instant cela force le footer à être en bas de page peut importe le contenu
    <div className="flex h-full flex-col justify-between">
      {/*  */}
      <div className="h-96 w-96 rounded shadow m-12">
        <h1 className=" drop-shadow-xl">Titre 1</h1>
        <h2 className="drop">Titre 2</h2>
        <h3>Titre 3</h3>
        <h4>Titre 4</h4>
        <p className="">Mon super test</p>
      </div>
      <Footer />
    </div>
  );
}
