import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {useRouteLoaderData} from "react-router-dom";
import Alert from "@mui/material/Alert";
import LecturersDataGrid from "./LecturersDataGrid";
import {fetchLecturers} from "../../constants/Methods";
import SimpleSelector from "../components/SimpleSelector";


const LecturersPage = ({departmentInitial = "", role = "ADMIN"}) => {
    const {departments} = useRouteLoaderData("layout");
    const [department, setDepartment] = useState();


    const [lecturers, setLecturers] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        setDepartment(departmentInitial); // This is be executed when `loading` state changes
    }, [])

    useEffect(() => {
        if (department) {
            fetchLecturers(setLecturers, setError, department); // This is be executed when `loading` state changes
        }
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
                    {role === "ADMIN" && <SimpleSelector
                        value={department}
                        onChange={event => setDepartment(event.target.value)}
                        items={departments}
                        label="Кафедра"/>}
                    {error && <Alert severity="error">{error}</Alert>}
                </Box>
            </Container>
            <LecturersDataGrid initialRows={lecturers}/>
        </>
    )


}


export default LecturersPage