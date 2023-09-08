import React from "react";
import logo from "../../assets/logo.png";
import menu from "../../assets/menu.png";
import bell from "../../assets/bell.png";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogoClick = (router: string) => {
    navigate(router);
  };

  return (
    <div className="navbar">
      <img
        src={logo}
        alt=""
        className="logoImg"
        onClick={() => handleLogoClick("/main")}
      />
      <img
        src={bell}
        alt=""
        className="bell"
        onClick={() => handleLogoClick("/alert")}
      />
      <img src={menu} alt="" className="menu" />
    </div>
  );
};

export default NavBar;
