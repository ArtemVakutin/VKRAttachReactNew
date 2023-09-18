import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {SelectorInOneRowWithEmpty} from "../components/SelectorInOneRow";
import {useRouteLoaderData} from "react-router-dom";
import {fetchThemes} from "../../constants/Methods";
import Alert from "@mui/material/Alert";
import ThemesDataGrid from "./ThemesDataGrid";


export const ThemesPage = ({departmentInitial = "UPV", role = "ADMIN"}) => {
    const {faculties, years, departments} = useRouteLoaderData("layout");

    const [faculty, setFaculty] = useState("");
    const [year, setYear] = useState("");
    const [department, setDepartment] = useState("");

    const [themes, setThemes] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        setDepartment(departmentInitial); // This is be executed when `loading` state changes
    }, [])

    useEffect(() => {
        fetchThemes(setThemes, setError, {department, faculty, year}); // This is be executed when `loading` state changes
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
                    // backgroundColor: 'primary.dark',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    gap: '10px'
                }}>
                    {role === "ADMIN" && <SelectorInOneRowWithEmpty
                        value={department}
                        setObject={setDepartment}
                        items={departments}
                        label="Кафедра"/>}
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
            <ThemesDataGrid initialRows={themes}/>
        </>
    )


}


export default ThemesPage