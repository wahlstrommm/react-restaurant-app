import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { Li } from "../../styled components/Li";

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <Li>
          <Link to="/">Hem</Link>
        </Li>
        <Li>
          <Link to="/menu">Meny</Link>
        </Li>
        <Li>Galleri</Li>
        <Li>Take Away</Li>
        <Li>
          <Link to="/admin">Admin</Link>
        </Li>
        <Li>Kontakt</Li>
        <Li>
          <Link to="/bookning">Boka bord</Link>
        </Li>
      </ul>
    </nav>
  );
}
