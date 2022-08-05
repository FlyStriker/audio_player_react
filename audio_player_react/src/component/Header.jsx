import React from "react";
import logo from "../images/logo_2.jpg";
import "./Header.css";
import {SessionStorage} from "../utils/SessionStorage";
import {Link} from "react-router-dom";


const Header = () => {
  return (
    <div className="header">
      <div className="header_logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="header_user">
        <h1>Welcome : { SessionStorage.getActiveUser() }</h1>
      </div>
      <div className="header_change_user">
        <Link to={"/login"} className="header_link_change">Change User</Link>
      </div>
    </div>
  );
};

export default Header;
