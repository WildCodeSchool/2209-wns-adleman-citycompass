import { useGetProfileQuery } from "../../../gql/generated/schema";

function AccueilDashboard() {
  const { data: currentUser } = useGetProfileQuery({
    errorPolicy: "ignore",
  });

  return (
    <>
      <div className="my-28 mx-auto h-full flex flex-col gap-10 w-4/5 max-w-4xl">
        <div className="flex w-fit gap-8">
          <h1 className="type-h1 header__title text-left ">BIENVENUE</h1>
          <h1 className="text-orange">{currentUser?.profile.firstname}</h1>
        </div>
        <div>
          <p className="text-2xl font-semibold">Quelques chiffres clés</p>
        </div>
        <div className="flex w-full justify-between mt-28">
          <div className="h-24 w-52 rounded shadow shadow-cream bg-orange flex flex-col justify-center items-center">
            <p>20</p>
            <p>Catégories</p>
          </div>
          <div className="h-24 w-52 rounded shadow shadow-cream bg-orange flex flex-col justify-center items-center">
            <p>20</p>
            <p>Catégories</p>
          </div>
          <div className="h-24 w-52 rounded shadow shadow-cream bg-orange flex flex-col justify-center items-center">
            <p>20</p>
            <p>Catégories</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccueilDashboard;
