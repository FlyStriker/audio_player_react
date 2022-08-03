import React from "react";
import "./RegisterForm.css";

const RegisterForm = ({ onChange, onClick }) => {
  return (
    <>
      <div className="register_form">
        <div className="register_form_title">
          <h1>Register</h1>
        </div>
        <div className="register_form_input">
          <input
            type="text"
            name="login"
            placeholder="Login"
            onChange={onChange}
          />
        </div>
        <div className="register_form_input">
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={onChange}
          />
        </div>
        <div className="register_form_button">
          <button onClick={onClick}>Register</button>
        </div>
      </div>
    </>
  );
};

let regButton = document.querySelector(".header_button_register");
let register = document.querySelector(".register_form");
regButton.addEventListener("onclick", () => {
    register.style.display = register.style.display === "block" ? "none" : "block";
})


export default RegisterForm;
