import React from "react";
import { Avatar } from "@material-ui/core";
import logo from "../img/logo_sme.svg";
import menuIcon from "../img/icon_understand-white.svg";
import "../css/navbar.css";

function NavBarComponent() {
  return (
    <div className="navbar">
      <div className="left-section">
        <div className="logo">
          <img src={logo} height={40} width={120} alt="logo"></img>
        </div>
        <div className="user">
          <Avatar></Avatar>
          <div className="user-info">
            <p style={{ margin: 0 }} className="name">
              MR. ADMIN
            </p>
            <p style={{ margin: 0 }} className="position">
              Head Quarter
            </p>
          </div>
        </div>
      </div>
      <div className="right-section">
        <p style={{ marginRight: 10 }}>MENU</p>
        <img src={menuIcon} height={25} width={25}></img>
      </div>
    </div>
  );
}

export default NavBarComponent;
