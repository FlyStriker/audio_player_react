import React, { useState } from "react";
import "./RegisterForm.css";
import { Link, useNavigate } from "react-router-dom";
import { SessionStorage } from "../utils/SessionStorage";
import { gql, useLazyQuery, useMutation } from "@apollo/client";

// создаем запрос для регистрации пользователя

const REGISTER = gql`
  mutation Register($login: String!, $password: String!) {
    createUser(login: $login, password: $password) {
      login
    }
  }
`;

// создаем запрос для авторизации зарегистрированного пользователя

const LOGIN = gql`
  query LogIn($login: String!, $password: String!) {
    login(login: $login, password: $password)
  }
`;

const RegisterForm = () => {
  const [callRegister] = useMutation(REGISTER);
  const [callLogin] = useLazyQuery(LOGIN);
  const [login, setLogin] = useState();
  const [password, setPassword] = useState();
  const navigator = useNavigate();

// создаем форму регистрации пользователя

  return (
    <div className="register_convas">
      <div className="register_form">
        <div className="register_form_title">
          <h1>Register</h1>
        </div>
        <div className="register_form_input">
          <input
            type="text"
            name="login"
            placeholder="Login"
            onChange={(event) => {
              setLogin(event.target.value);
            }}
          />
        </div>
        <div className="register_form_input">
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        <div className="register_form_button">
          <button
            onClick={() => {
              callRegister({ variables: { login, password } })
                .then((response) => {
                  if (!response.data.createUser) {
                    alert("Не удалось зарегать пользователя");
                    return false;
                  }
                  return true;
                })
                .then((result) => {
                  if (result) {
                    callLogin({ variables: { login, password } }).then(
                      (response) => {
                        if (!response.data.login) {
                          alert("Пользователя не существует");
                          return;
                        }
                        SessionStorage.createSession(
                          login,
                          response.data.login
                        );
                        navigator("/");
                      }
                    );
                  }
                })
                .catch(() => {
                  alert("Не удалось зарегистрировать пользователя");
                });
            }}
            className="btn_register"
          >
            Register
          </button>
          <Link to="/login" className="link_to">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
