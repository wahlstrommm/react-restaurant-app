import { useNavigate } from "react-router-dom";
import { Button } from "../../styled components/Button";
import Bookning from "../bookning/bookning";
import "./home.css";
import map from "../../assets/karta.svg";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="image-container"></div>
      <div className="about-zias">
        <div className="about-content">
          <h2>Restaurangen</h2>
          <p>
            Hos oss på Restaurang Zias får ni möjlighet att avnjuta karibiska
            och kubanska maträtter tillagade med utsökta och annorlunda råvaror.
            Fantastiska drinkar och ett bra utbud på öl och rom.
          </p>
          <span className="span-line"></span>
        </div>
      </div>
      <div className="flexbox-container">
        <div className="contact-info">
          <h3>Boka bord</h3>
          <p>
            På webben eller via telefon <br />{" "}
            <i className="fa-solid fa-phone"></i> 018 - 71 40 40
          </p>
          <Button
            onClick={() => {
              navigate("/bookning");
            }}>
            Boka här!
          </Button>
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
      <div className="menu-container">
        <div className="menu-content">
          <h2>Vår meny</h2>
          <div className="menu-flexbox">
            <div className="menu-course">
              <h4 className="course-title">Ropa vieja con carne</h4>
              <h4 className="price">199 kr</h4>
              <p>Pulled beef gryta serveras med svart ris</p>
            </div>
            <div className="menu-course">
              <h4 className="course-title">Pollo marinado con arroz</h4>
              <h4 className="price">189 kr</h4>
              <p>Marinerad majskyckling serveras med grönt ris</p>
            </div>
          </div>
          <div className="menu-flexbox">
            <div className="menu-course">
              <h4 className="course-title">Costillas de cordero con patatas</h4>
              <h4 className="price">225 kr</h4>
              <p>
                Grillade lammracks serveras med rödvinssås, säsongsgrönsaker och
                potatisklyftor
              </p>
            </div>
            <div className="menu-course">
              <h4 className="course-title">
                Verduras a la parilla con arroz verde
              </h4>
              <h4 className="price">199 kr</h4>
              <p>Marinerade grillade grönsaker med grönt ris</p>
            </div>
          </div>
          <div className="menu-flexbox">
            <div className="menu-course">
              <h4 className="course-title">Guiso de marisco con arroz verde</h4>
              <h4 className="price">209 kr</h4>
              <p>Skaldjursgryta serveras med grönt ris och papayasallad</p>
            </div>
            <div className="menu-course">
              <h4 className="course-title">Emparedado Cubano con patatas</h4>
              <h4 className="price">209 kr</h4>
              <p>Grillad ryggbiff serveras i surdegsbröd med potatisklyftor</p>
            </div>
          </div>
          <Button
            onClick={() => {
              navigate("/menu");
            }}>
            Till menyn
          </Button>
        </div>
      </div>
      <img src={map} alt="map" className="map" />
      <footer className="footer">
        <p>
          <i className="fa-solid fa-location-dot"></i> S:t Eriks Torg 2, 103 16
          Stockholm
        </p>
      </footer>
    </div>
  );
}
