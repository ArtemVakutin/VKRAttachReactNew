import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import SelectorInOneRow, {SelectorInOneRowWithEmpty} from "../components/SelectorInOneRow";
import {useRouteLoaderData} from "react-router-dom";
import {ROLES} from "../../constants/SimpleConstants";
import axios from "axios";
import {createFilters} from "../../constants/Methods";
import {GET_USERS_URL} from "../../constants/LinkConstants";
import UsersDataGrid from "./UsersDataGrid";


export const UsersPage = () => {
    const roles = ROLES;
    const {faculties, years} = useRouteLoaderData("layout");
    const [role, setRole] = useState("USER");
    const [faculty, setFaculty] = useState("");
    const [year, setYear] = useState("");
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const setRole1 = async (role) => await setRole(role)

    useEffect(() => {
        fetchUsers(); // This is be executed when `loading` state changes
    }, [role, faculty, year])

    const fetchUsers = () => {
        console.log("Метод вызван")
        let filter = null;

        role && (filter = createFilters(filter, "role", role));
        faculty && (filter = createFilters(filter, "faculty", faculty));
        year && (filter = createFilters(filter, "yearOfRecruitment", year));

        console.log(filter + "   в итоге фильтр")

        const config = {
            params: {
                filter,
                role
            }
        }

        filter && axios.get(GET_USERS_URL, config).then(response => {
            setUsers(response.data)
            console.log(response.data)
        }).catch(ex => {
            if (ex.response) {
                console.log(ex.response.data);
                console.log(ex.response.status);
                console.log(ex.response.headers);
                setUsers([])
                setError("Пользователей с такими данными не найдено")

            } else if (ex.request) {
                console.log("SERVER IS NOT AVAILABLE");
                setUsers([])
                setError("Пользователей с такими данными не найдено")
            } else {
                setUsers([])
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
                    <SelectorInOneRow
                        value={role}
                        setObject={setRole1}
                        items={roles}
                        label="Права доступа"/>
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
                </Box>
            </Container>
            <UsersDataGrid initialRows={users}/>
        </>
    )


}


export default UsersPage