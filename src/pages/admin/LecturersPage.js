import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import SelectorInOneRow from "../components/SelectorInOneRow";
import {useRouteLoaderData} from "react-router-dom";
import axios from "axios";
import {GET_LECTURERS_URL} from "../../constants/LinkConstants";
import Alert from "@mui/material/Alert";
import LecturersDataGrid from "./LecturersDataGrid";
import {fetchLecturers} from "../../constants/Methods";


const LecturersPage = ({departmentInitial = "UPV", role = "ADMIN"}) => {
    const {departments} = useRouteLoaderData("layout");
    const [department, setDepartment] = useState();


    const [lecturers, setLecturers] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        setDepartment(departmentInitial); // This is be executed when `loading` state changes
    }, [])

    useEffect(() => {
        fetchLecturers(setLecturers, setError, department); // This is be executed when `loading` state changes
    }, [department])


    return (
        <>
            <Container maxWidth={'md'}>
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
                    {role === "ADMIN" && <SelectorInOneRow
                        value={department}
                        setObject={setDepartment}
                        items={departments}
                        label="Кафедра"/>}
                    {error && <Alert severity="error" fullWidth>{error}</Alert>}
                </Box>
            </Container>
            <LecturersDataGrid initialRows={lecturers}/>
        </>
    )


}


export default LecturersPage