import React, {useContext} from "react";
import {AuthContext} from "../../context/Contexts";
import OrdersModeratorPageSelectors from "./OrdersModeratorPageSelectors";

export const OrdersModeratorPage = () => {

    const {user} = useContext(AuthContext)

    return <OrdersModeratorPageSelectors departmentInit={user.login} role={"MODERATOR"}/>
}

export default OrdersModeratorPage;

