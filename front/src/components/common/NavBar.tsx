import React from "react";
import logo from "../../assets/logo.png";
import menu from "../../assets/menu.png";
import bell from "../../assets/bell.png";
import "./NavBar.css";

const NavBar = () => {
  return (
    <div className="navbar">
      <img src={logo} alt="" className="logoImg" />
      <img src={bell} alt="" className="bell" />
      <img src={menu} alt="" className="menu" />
    </div>
  );
};

export default NavBar;
