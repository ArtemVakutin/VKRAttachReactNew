import {Navigate, Outlet} from "react-router-dom";
import React, {useContext} from "react";
import {AuthContext} from "../context/Contexts";

const PrivateRoute = ({role}) => {
    const {user} = useContext(AuthContext);

    if (user === null) {
        return <Navigate to="/"/>;
    } else if (user.role === role) {
        return <Outlet/>
    }
};

export default PrivateRoute;