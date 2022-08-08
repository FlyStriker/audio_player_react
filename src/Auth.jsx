import React from "react";
import {Navigate} from "react-router-dom";
import {SessionStorage} from "./utils/SessionStorage";


// Изначально открываем страницу авторизации пользывателя и проверяем его авторизацию
const Auth = ({children}) => {
    if(!SessionStorage.getActiveUser()){
        return <Navigate to="/login"/>
    }

    return children
}

export default Auth;
