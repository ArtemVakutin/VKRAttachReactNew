import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/Contexts";
import UserOrdersDataGrid from "./UserOrdersDataGrid";
import {fetchOrdersByUser} from "../../constants/Methods";

export const OrdersModeratorPage = () => {

    const {user} = useContext(AuthContext)

    const [orders, setOrders] = useState([]);
    const [error, setError] = useState("");


    useEffect(() => {
        fetchOrdersByUser(setOrders, setError, user.id);
    }, [user])


    return <UserOrdersDataGrid initialRows={orders}/>
}

export default OrdersModeratorPage;

