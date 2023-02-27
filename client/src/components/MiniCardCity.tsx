import "../styles/MiniCardCity.css";
import alley from "../assets/alley-gc58ca832a_640.jpg";

export default function MiniCardCity() {
  return (
    <>
      <div className="card_container">
        <img
          src={alley}
          alt="alley"
          className="card_img object-cover rounded shadow"
        ></img>
      </div>
    </>
  );
}
