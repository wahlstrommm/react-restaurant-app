import React from "react";
import ReactDOMClient from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./components/admin/admin";
import Home from "./components/home/home";
import Menu from "./components/menu/menu";
import Bookning from "./components/bookning/bookning";
import Notfound from "./components/notfound/notfound";
import Layout from "./components/layout/layout";
import Navbar from "./components/navbar/navbar";

const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container as Element);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/bookning" element={<Bookning />} />
          <Route path="*" element={<Notfound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
