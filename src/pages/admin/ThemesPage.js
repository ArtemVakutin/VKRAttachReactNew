import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {useRouteLoaderData} from "react-router-dom";
import {fetchThemes} from "../../constants/Methods";
import Alert from "@mui/material/Alert";
import ThemesDataGrid from "./ThemesDataGrid";
import SimpleSelector from "../components/SimpleSelector";


export const ThemesPage = ({departmentInit, role = "ADMIN"}) => {
    const {faculties, years, departments} = useRouteLoaderData("layout");

    const [faculty, setFaculty] = useState("");
    const [year, setYear] = useState("");
    const [department, setDepartment] = useState("");

    const [themes, setThemes] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        setDepartment(departmentInit);
    }, [])

    useEffect(() => {
        const notBusy = false;
        fetchThemes(setThemes, setError, {department, faculty, year, notBusy}); // This is be executed when `loading` state changes
    }, [faculty, year, department])

    return (
        <>
            <Container maxWidth={"xl"}>
                <Box sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    gap: '10px'
                }}>
                    {role === "ADMIN" && <SimpleSelector
                        hasEmpty={true}
                        value={department}
                        onChange={event=>setDepartment(event.target.value)}
                        items={departments}
                        label="Кафедра"/>}
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
                    {error && <Alert severity="error">{error}</Alert>}
                </Box>
            </Container>
            {department && faculty && year && <ThemesDataGrid initialRows={themes} facultyInit={faculty} yearInit={year} departmentInit={department}/>}
            {!faculty && !year && <Alert severity="info">Выберите все данные для показа имеющихся тем или добавления новых</Alert>}

        </>
    )


}


export default ThemesPage