import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginForm from "./component/LoginForm";
import RegisterForm from "./component/RegisterForm";
import HomePage from "./component/HomePage";
import Auth from "./Auth";

// возвращаем стараницы для авторизации и регистрации пользователей и основную страницу 
function App() {
    return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Auth><HomePage/></Auth>}/>
                <Route path="/login" element={<LoginForm/>}/>
                <Route path="/register" element={<RegisterForm/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
