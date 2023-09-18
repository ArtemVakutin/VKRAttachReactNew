import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {SelectorInOneRowWithEmpty} from "../components/SelectorInOneRow";
import {useRouteLoaderData} from "react-router-dom";
import {REQUEST_STATUS} from "../../constants/SimpleConstants";
import axios from "axios";
import {createFilters} from "../../constants/Methods";
import {GET_ORDERS_URL} from "../../constants/LinkConstants";
import OrdersDataGrid from "./OrdersDataGrid";
import Alert from "@mui/material/Alert";


export const OrdersPage = () => {

    const statuses = REQUEST_STATUS;
    const {faculties, years, departments} = useRouteLoaderData("layout");

    const [faculty, setFaculty] = useState("");
    const [year, setYear] = useState("");
    const [department, setDepartment] = useState("");
    const [status, setStatus] = useState("");

    const [orders, setOrders] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchOrders(); // This is be executed when `loading` state changes
    }, [faculty, year, department, status])

    const fetchOrders = () => {
        let filter = null;

        status && (filter = createFilters(filter, "orderStatus", status));
        faculty && (filter = createFilters(filter, "user.faculty", faculty));
        department && (filter = createFilters(filter, "theme.themeDepartment", department));
        year && (filter = createFilters(filter, "user.yearOfRecruitment", year));

        console.log(filter + "   в итоге фильтр")

        const config = {
            params: {
                filter,
            }
        }

        axios.get(GET_ORDERS_URL, config).then(response => {
            setOrders(response.data)
            setError("")
        }).catch(ex => {
            if (ex.response) {
                console.log(ex.response.data);
                console.log(ex.response.status);
                console.log(ex.response.headers);
                setOrders([])
                setError("Заявок с такими данными не найдено")

            } else if (ex.request) {
                console.log("SERVER IS NOT AVAILABLE");
                setOrders([])
                setError("Сервер не отвечает")
            } else {
                setOrders([])
                setError("Что-то в этом мире пошло не так")
            }
        })
    }

    return (
        <>
            <Container maxWidth={"xl"}>
                <Box sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100',
                    // backgroundColor: 'primary.dark',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    gap: '10px'
                }}>
                    <SelectorInOneRowWithEmpty
                        value={status}
                        setObject={setStatus}
                        items={statuses}
                        label="Статус"/>
                    <SelectorInOneRowWithEmpty
                        value={department}
                        setObject={setDepartment}
                        items={departments}
                        label="Кафедра"/>
                    <SelectorInOneRowWithEmpty
                        value={faculty}
                        setObject={setFaculty}
                        items={faculties}
                        label="Специальность (направление подготовки)"/>
                    <SelectorInOneRowWithEmpty
                        value={year}
                        setObject={setYear}
                        items={years}
                        label="Год набора"/>
                    {error && <Alert severity="error" fullWidth>{error}</Alert>}
                </Box>
            </Container>
            <OrdersDataGrid initialRows={orders}/>
        </>
    )


}


export default OrdersPage