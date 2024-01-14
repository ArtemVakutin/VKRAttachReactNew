import React, {useContext} from "react";
import {AuthContext} from "../../context/Contexts";
import OrdersPageSelectors from "../admin/OrdersPageSelectors";

export const OrdersModeratorPage = () => {

    const {user} = useContext(AuthContext)

    return <OrdersPageSelectors departmentInit={user.department} role={"MODERATOR"}/>
}

export default OrdersModeratorPage;

