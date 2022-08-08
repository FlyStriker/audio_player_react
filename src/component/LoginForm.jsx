import React, { useState } from "react";
import "./LoginForm.css";
import { Link, useNavigate } from "react-router-dom";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { SessionStorage } from "../utils/SessionStorage";

//  создаем переменную которая будет отвечать за запрос на авторизацию пользователя c graphql

const LOGIN = gql`
  query LogIn($login: String!, $password: String!) {
    login(login: $login, password: $password)
  }
`;

// СОздаем форму авторизации пользователя и проверяем его авторизацию

const LoginForm = () => {
  const [login, setLogin] = useState();
  const [password, setPassword] = useState();
  const [callLogin, { loading, error }] = useLazyQuery(LOGIN);
  const navigate = useNavigate();

  return (
    <div className="login_convas">
      <div className="login_form">
        <div className="login_form_title">
          <h1>Login</h1>
        </div>
        <div className="login_form_input">
          <input
            type="text"
            name="login"
            placeholder="Login"
            onChange={(event) => {
              setLogin(event.target.value);
            }}
          />
        </div>
        <div className="login_form_input">
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        <div className="login_form_button">
          <button
            onClick={() => {
              callLogin({ variables: { login, password } })
                .then((response) => {
                  if (!response.data.login) {
                    alert("Пользователя не существует");
                    return;
                  }
                  SessionStorage.createSession(login);
                  navigate("/");
                })
                .catch(() => {
                  alert("Не удалось авторизовать пользователя");
                });
            }}
            className="btn_log_in"
          >
            Log in
          </button>
          <Link to="/register" className="link_to">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
