import React from "react";
import { Outlet } from "react-router-dom";
import "./layout.css";

export default function Layout() {
  return (
    <>
      <header>
        <h1 className="header-logo">Zias</h1>
      </header>
      <Outlet></Outlet>
    </>
  );
}
