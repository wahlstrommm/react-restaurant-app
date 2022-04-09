import React from "react";
import drinkPic from "../../assets/glas.svg";

export default function home() {
  return (
    <div>
      <div>
        <h1>Zias</h1>
        <img src={drinkPic} alt="Bild på drink" />
      </div>
      <div>
        <h1>Restaurangen</h1>
        <p>
          Hos oss på Restaurang Zias får ni möjlighet att avnjuta karibiska och
          kubanska maträtter tillagade med utsökta och annorlunda råvaror.
          Fantaastiska drinkar och ett bra utbud på öl och rom.
        </p>
        <span></span>
      </div>
    </div>
  );
}
