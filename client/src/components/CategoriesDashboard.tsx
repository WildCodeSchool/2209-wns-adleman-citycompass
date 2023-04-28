import add_icon from "../assets/add_icon.svg";
import modify_icon from "../assets/modify_icon.svg";

function CategoriesDashboard() {
  return (
    <>
      <div className="my-28 mx-auto h-full flex flex-col w-4/5 max-w-4xl">
        <div className="flex w-fit gap-8">
          <h1 className="type-h1 header__title text-left ">
            GESTION DES CATEGORIES
          </h1>
        </div>
        <div className="bg-cream flex flex-col w-full h-fit min-h-[75%] gap-5 mt-28">
          <div className="p-4 w-16 self-end">
            <button>
              <img src={add_icon} alt="" />
            </button>
          </div>
          <div className="h-12 w-72 px-4 self-center rounded shadow shadow-cream bg-orange flex justify-between items-center">
            <p>20</p>
            <img src={modify_icon} alt="" className="w-6" />
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoriesDashboard;
