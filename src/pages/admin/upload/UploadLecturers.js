import React, {useEffect, useState} from 'react';
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';

import Box from "@mui/material/Box";
import UploadDataDialog from "./UploadDataDialog";
import {useRouteLoaderData} from "react-router-dom";
import Alert from "@mui/material/Alert";
import SimpleSelector from "../../components/SimpleSelector";


const UploadLecturers = ({departmentInitial = "", role = "ADMIN"}) => {
    const {departments} = useRouteLoaderData("layout");
    const [openDialog, setOpenDialog] = useState(false);

    const [department, setDepartment] = useState("");

    const [params, setParams] = useState({})

    const [error, setError] = useState("");

    const checkSelectors = () => {
        if (!department) {
            setError("Выберите все позиции")
        } else {
            setOpenDialog(true)
            setError("")
        }
    }


    useEffect(() => {
        setDepartment(departmentInitial); // This is be executed when `loading` state changes
    }, [])

    useEffect(() => {
        setParams({
            department
        }); // This is be executed when `loading` state changes
    }, [department])

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
                    {role === "ADMIN" && <SimpleSelector
                        hasEmpty={true}
                        value={department}
                        onChange={event=>setDepartment(event.target.value)}
                        items={departments}
                        label="Кафедра"/>}

                    <Button size="large" variant="contained" onClick={checkSelectors}>
                        <AddIcon/>Добавить преподавателей из файла Excel
                    </Button>

                    {error && <Alert severity="error" fullwidth>{error}</Alert>}

                    <UploadDataDialog params={params} onClose={() => setOpenDialog(false)} open={openDialog}
                                      uploadType="lecturers"/>

                </Box>


            </Container>
        </>
    )
}


export default UploadLecturers