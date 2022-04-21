import React from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
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
    </nav>
  );
}
