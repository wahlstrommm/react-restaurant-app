import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { Li } from "../../styled components/Li";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <ul>
        <Li
          onClick={() => {
            navigate("/");
          }}>
          Hem
        </Li>
        <Li
          onClick={() => {
            navigate("/menu");
          }}>
          Meny
        </Li>
        <Li>Galleri</Li>
        <Li>Take Away</Li>
        <Li
          onClick={() => {
            navigate("/admin");
          }}>
          Admin
        </Li>
        <Li>Kontakt</Li>
        <Li
          onClick={() => {
            navigate("/bookning");
          }}>
          Boka bord
        </Li>
      </ul>
      <span className="span-line"></span>
    </nav>
  );
}
