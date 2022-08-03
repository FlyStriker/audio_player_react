import React from "react";
import "./LoginForm.css";
// import { useState } from "react";

const LoginForm = ({ onChange, onClick }) => {
  return (
    <>
    <div className="login_form">
      <div className="login_form_title">
        <h1>Login</h1>
      </div>
      <div className="login_form_input">
        <input
          type="text"
          name="login"
          placeholder="Login"
          onChange={onChange}
        />
      </div>
      <div className="login_form_input">
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={onChange}
        />
      </div>
      <div className="login_form_button">
        <button onClick={onClick}>Log in</button>
      </div>
    </div>
    </>
  );
}

let login = document.querySelector(".login_form");
let logButton = document.querySelector(".header_button_login");

logButton.addEventListener("onclick", () => {
    login.style.display = login.style.display === "block" ? "none" : "block";
})

export default LoginForm;
