import React from "react";
import drinkPic from "../../assets/glas.svg";
import { Img } from "../../styled components/Img";

export default function Home() {
  return (
    <div>
      <Img src={drinkPic} alt="Bild på drink" />
      <div>
        <h1>Restaurangen</h1>
        <p>
          Hos oss på Restaurang Zias får ni möjlighet att avnjuta karibiska och
          kubanska maträtter tillagade med utsökta och annorlunda råvaror.
          Fantastiska drinkar och ett bra utbud på öl och rom.
        </p>
        <span></span>
      </div>
    </div>
  );
}
