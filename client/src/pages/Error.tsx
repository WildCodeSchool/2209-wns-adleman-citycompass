export default function Erreur() {
  const goBack = () => {
    window.history.back();
  };
  return (
    <div className="my-48 mx-auto flex flex-col w-4/5 max-w-4xl gap-8">
      <h2 className="type-h2 header__title text-center">Introuvable</h2>
      <h2 className="type-h1 header__title text-center">Erreur 404</h2>
      <p className="text-center">
        Désolé, la page que vous recherchez n'existe pas!
      </p>
      <p className="text-center">
        Retournez à la{" "}
        <a href="/" className="underline decoration-1">
          page d'accueil
        </a>{" "}
        ou à la{" "}
        <a href="##" onClick={goBack} className="underline decoration-1">
          page précédente
        </a>{" "}
        .
      </p>
    </div>
  );
}
