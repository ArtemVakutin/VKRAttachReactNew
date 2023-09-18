import React, {useContext} from 'react';
import {Navigate} from "react-router-dom";
import {AuthContext} from "../../context/Contexts";

export const CheckAuth = () => {
    // const navigate = useNavigate();
    const {user} = useContext(AuthContext);
    console.info("------------")
    console.info(user)
    if (user === null) {
        return <Navigate to="/auth"/>
    } else if (user.role === "USER") {
        return <Navigate to="/user"/>
    } else if (user.role === "MODERATOR") {
        return <Navigate to="/moderator"/>
    } else if (user.role === "ADMIN") {
        return <Navigate to="/admin"/>
    }


}