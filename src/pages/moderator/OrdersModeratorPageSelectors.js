import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {useRouteLoaderData} from "react-router-dom";
import {REQUEST_STATUS} from "../../constants/SimpleConstants";
import {fetchLecturers, fetchOrders} from "../../constants/Methods";
import Alert from "@mui/material/Alert";
import OrdersModeratorDataGrid from "./OrdersModeratorDataGrid";
import SimpleSelector from "../components/SimpleSelector";


export const OrdersModeratorPageSelectors = ({departmentInit = ""}) => {
    const statuses = REQUEST_STATUS;
    const {faculties, years, departments} = useRouteLoaderData("layout");

    const [faculty, setFaculty] = useState("");
    const [year, setYear] = useState("");
    const [department, setDepartment] = useState("");
    const [status, setStatus] = useState("");

    const [orders, setOrders] = useState([]);
    const [lecturers, setLecturers] = useState([])
    const [error, setError] = useState("");

    const mapLecturers = (lecturersList) => {
        setLecturers(lecturersList.map(({id, surname, name, patronymic}) => {
            return {
                value: id,
                label: `${surname} ${name} ${patronymic}`
            }
        }))
    }

    useEffect(() => {
        setDepartment(departmentInit); // This is be executed when `loading` state changes
    }, [])

    useEffect(() => {
        fetchOrders(setOrders, setError, {department, faculty, year, status});
        fetchLecturers(mapLecturers, Function.prototype, department);
    }, [faculty, year, department, status])


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

                    <SimpleSelector
                        hasEmpty={true}
                        value={faculty}
                        onChange={event=>setFaculty(event.target.value)}
                        items={faculties}
                        label="Специальность (направление подготовки)"/>
                    <SimpleSelector
                        hasEmpty={true}
                        value={year}
                        onChange={event=>setYear(event.target.value)}
                        items={years}
                        label="Год набора"/>
                    <SimpleSelector
                        hasEmpty={true}
                        value={status}
                        onChange={event=>setStatus(event.target.value)}
                        items={statuses}
                        label="Статус"/>
                    {error && <Alert severity="error" fullWidth>{error}</Alert>}
                </Box>
            </Container>
            {error && <Alert severity="error" fullWidth>{error}</Alert>}
            <OrdersModeratorDataGrid initialRows={orders} lecturers={lecturers}/>

        </>
    )


}


export default OrdersModeratorPageSelectors