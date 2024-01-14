import React, {useEffect, useState} from 'react';
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';

import Box from "@mui/material/Box";
import UploadDataDialog from "./UploadDataDialog";
import {useRouteLoaderData} from "react-router-dom";
import SimpleSelector from "../../components/SimpleSelector";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";


const UploadUsers = () => {

    const {faculties, years, departments} = useRouteLoaderData("layout");

    const [openUsersAdd, setOpenUsersAdd] = useState(false);

    const [faculty, setFaculty] = useState("");
    const [year, setYear] = useState("");
    const [group, setGroup] = useState("");

    const [params, setParams] = useState({})

    const [error, setError] = useState("");

    useEffect(() => {
        setParams({
            faculty,
            year,
            group
        }); // This is be executed when `loading` state changes
    }, [faculty, year, group])

    const checkSelectors = () => {
        if (!faculty || !year) {
            setError("Выберите специальность и год набора")
        } else {
            setOpenUsersAdd(() => !openUsersAdd);
            setError("");
        }
    }

    return (
            <>
                <Container maxWidth={"md"}>
                    <Box sx={{
                        marginTop: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        gap: '10px',
                        border: 1,
                        borderRadius: 2,
                        p: 2
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

                        <TextField margin="dense" fullWidth
                                   label="Группа (не обязательно)"
                                   onChange={event => setGroup(event.target.value)}
                                   value={group}/>

                        <Button size="large" variant="contained" onClick={() => checkSelectors()}>
                            <AddIcon/>Добавить пользователей из файла Excel
                        </Button>
                        {error && <Alert severity="error">{error}</Alert>}
                        <UploadDataDialog params={params} onClose={() => setOpenUsersAdd(false)} open={openUsersAdd}
                                          uploadType="users"/>

                    </Box>

                </Container>
            </>
        )
    }



export default UploadUsers