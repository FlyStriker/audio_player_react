import React from "react";
import {Navigate} from "react-router-dom";
import {SessionStorage} from "./utils/SessionStorage";



const Auth = ({children}) => {
    if(!SessionStorage.getActiveUser()){
        return <Navigate to="/login"/>
    }

    return children
}

export default Auth;
