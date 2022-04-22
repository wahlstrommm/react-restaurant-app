import { Outlet, useNavigate } from "react-router-dom";
import "./layout.css";

export default function Layout() {
  const navigate = useNavigate();

  return (
    <>
      <header className="header">
        <h1
          className="header-logo"
          onClick={() => {
            navigate("/");
          }}>
          Zias
        </h1>
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
    </>
  );
}
