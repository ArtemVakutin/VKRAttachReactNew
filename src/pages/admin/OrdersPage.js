import React, {useContext} from "react";
import {AuthContext} from "../../context/Contexts";
import OrdersPageSelectors from "./OrdersPageSelectors";

export const OrdersPage = () => {

    return <OrdersPageSelectors role={"ADMIN"}/>
}

export default OrdersPage;

