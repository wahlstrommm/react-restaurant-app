import menu from "../../assets/meny.svg";
import "./menu.css";

export default function Menu() {
  return (
    <div className="menu-div">
      <img src={menu} alt="menu" className="menu-img" />
    </div>
  );
}
