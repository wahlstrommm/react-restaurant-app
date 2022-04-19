import React from "react";
import { Outlet } from "react-router-dom";
import "./layout.css";

export default function Layout() {
  return (
    <>
      <header>
        <h1 className="header-logo">Zias</h1>
        {/* <!-------- Menu Button --------> */}
        <div className="hamburger">
          <div></div>
        </div>
        {/* <!------ Menu Button End ------> */}
      </header>
      <main>
        <Outlet></Outlet>
      </main>
    </>
  );
}