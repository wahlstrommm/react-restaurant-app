import React from "react";
import { useNavigate } from "react-router-dom";
import Bookning from "../bookning/bookning";
// import drinkPic from "../../assets/glas.svg";
// import { Img } from "../../styled components/Img";
import "./home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="image-container"></div>
      <div className="about-zias">
        <h2>Restaurangen</h2>
        <p>
          Hos oss på Restaurang Zias får ni möjlighet att avnjuta karibiska och
          kubanska maträtter tillagade med utsökta och annorlunda råvaror.
          Fantastiska drinkar och ett bra utbud på öl och rom.
        </p>
        <span className="span-line"></span>
      </div>
      <div className="flexbox-container">
        <div className="booking-info">
          <h3>Boka bord</h3>
          <p>
            På webben eller via telefon <br /> 018 - 71 40 40
          </p>
          <button
            onClick={() => {
              navigate("/bookning");
            }}>
            Boka här!
          </button>
        </div>
        <div className="opening-hours">
          <table>
            <tbody>
              <tr>
                <td className="opening-day">Måndag</td>
                <td className="opening-hour">Stängt</td>
              </tr>
              <tr>
                <td className="opening-day">Tis-Ons</td>
                <td className="opening-hour">16-22</td>
              </tr>
              <tr>
                <td className="opening-day">Torsdag</td>
                <td className="opening-hour">16-23</td>
              </tr>
              <tr>
                <td className="opening-day">Fre-Lör</td>
                <td className="opening-hour">16-01</td>
              </tr>
              <tr>
                <td className="opening-day">Söndag</td>
                <td className="opening-hour">16-22</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
