import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./layout.css";
import Navbar from "../navbar/navbar";

export default function Layout() {
  const navigate = useNavigate();

  return (
    <>
      <header className="header">
        <h1 className="header-logo">Zias</h1>
        {/* <!-------- Menu Button --------> */}
        <div
          className="hamburger"
          onClick={() => {
            navigate("/navbar");
          }}>
          <div></div>
        </div>
        {/* <!------ Menu Button End ------> */}
      </header>
      <main>
        <Outlet></Outlet>
      </main>
      <footer className="footer">
        <p>
          <i className="fa-solid fa-location-dot"></i> Adressvägen 2, 111 11
          Stocholm
        </p>
      </footer>
    </>
  );
}
