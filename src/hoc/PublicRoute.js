import {Navigate, Outlet} from "react-router-dom";
import React, {useContext} from "react";
import {AuthContext} from "../context/Contexts";

const PublicRoute = () => {
    const {user} = useContext(AuthContext);

    if (user === null) {
        return <Outlet/>
    } else {
        return <Navigate to="/"/>;
    }
};

export default PublicRoute;