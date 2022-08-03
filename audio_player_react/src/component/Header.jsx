import React from "react";
import logo from "../images/logo_2.jpg";
import "./Header.css";


const Header = () => {
  return (
    <div className="header">
      <div className="header_link">
        <img src={logo} alt="logo" />
      </div>
      <div className="header_user">
        <h1>Welcome : "Имя"</h1>
      </div>
      <div className="header_button">
        <button className="header_button_login">Login</button>
        <button className="header_button_register">Register</button>
      </div>
    </div>
  );
};

export default Header;
