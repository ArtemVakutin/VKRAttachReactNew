import React, {useEffect, useState} from 'react';
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';

import Box from "@mui/material/Box";
import UploadDataDialog from "./UploadDataDialog";
import {useRouteLoaderData} from "react-router-dom";
import Alert from "@mui/material/Alert";
import axios from "axios";
import {GET_THEMES_URL} from "../../../constants/LinkConstants";
import DeleteSomethingDialog from "../../components/DeleteSomethingDialog";
import ThemesNotDeletedDialog from "./ThemesNonDeletedDialog";
import SimpleSelector from "../../components/SimpleSelector";


const UploadThemes = ({departmentInitial = "", role = "ADMIN"}) => {
    const {faculties, years, departments} = useRouteLoaderData("layout");
    const [uploadDialog, setUploadDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);

    const [themesNotDeletedDialog, setThemesNotDeletedDialog] = useState(false);

    const [themesNotDeleted, setThemesNotDeleted] = useState([]);

    const [faculty, setFaculty] = useState("");
    const [year, setYear] = useState("");
    const [department, setDepartment] = useState("");

    const [params, setParams] = useState({})

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        setDepartment(departmentInitial); // This is be executed when `loading` state changes
    }, [])

    useEffect(() => {
        setParams({
            department,
            faculty,
            year
        }); // This is be executed when `loading` state changes
    }, [faculty, year, department])

    const checkSelectors = () => {
        if (!faculty || !department || !year) {
            setError("Выберите все позиции")
        } else {
            openUploadDialog()
            setError("")
        }
    }

    const openUploadDialog = () => {
        setUploadDialog(() => !uploadDialog);
        setSuccess("");
        setError("");
    }

    const openDeleteDialog = () => {
        if (!faculty || !department || !year) {
            setError("Выберите все позиции")
            setSuccess("");
        } else {
            setDeleteDialog(() => !deleteDialog);
            setSuccess("");
            setError("");
        }
    }


    const deleteAllThemes = () => {

        const config = {
            params: {
                department,
                faculty,
                year
            }
        }
        axios.delete(GET_THEMES_URL, config).then(async response => {
            await setThemesNotDeleted(response.data)
            console.log(response.data)
            console.log(themesNotDeleted)
            setError("")
            setDeleteDialog(false)

            setThemesNotDeletedDialog(true)
            themesNotDeleted.length > 0 && setThemesNotDeletedDialog(true)
            themesNotDeleted.length = 0 && setSuccess("Удалено")
        }).catch(ex => {
            if (ex.response) {
                console.log(ex.response.data);
                console.log(ex.response.status);
                console.log(ex.response.headers);
                setError("При удалении что-то пошло не так")
                setSuccess("")
                setThemesNotDeleted([])
                setDeleteDialog(false)

            } else if (ex.request) {
                console.log("SERVER IS NOT AVAILABLE");
                setError("Проверьте ваш выход в сеть")
                setSuccess("")
                setDeleteDialog(false)
            } else {
                setError("Что-то в этом мире пошло не так")
                setSuccess("")
                setDeleteDialog(false)
            }
        })


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

                    <Button size="large" variant="contained" onClick={checkSelectors}>
                        <AddIcon/>Добавить темы из файла Word
                    </Button>

                    <Button size="large" variant="contained" onClick={openDeleteDialog}>
                        <AddIcon/>Удалить все темы по факультету и году набора
                    </Button>

                    {error && <Alert severity="error">{error}</Alert>}
                    {success && <Alert severity="success">{success}</Alert>}
                    <UploadDataDialog params={params} onClose={openUploadDialog} open={uploadDialog}
                                      uploadType="themes" acceptedFiles={['.docx']}
                                      dropzoneText={"Выберите файл в формате .docx (НЕ .doc)"}/>
                    <DeleteSomethingDialog onClose={openDeleteDialog} open={deleteDialog}
                                           message={`кафедра: ${department}, факультет: ${faculty}, кафедра: ${year}`}
                                           handleAccept={deleteAllThemes}/>
                    <ThemesNotDeletedDialog open={themesNotDeletedDialog}
                                            onClose={() => {
                                                setThemesNotDeleted([])
                                                setThemesNotDeletedDialog(false)
                                            }
                                            }
                                            themes={themesNotDeleted}/>
                </Box>


            </Container>
        </>
    )
}


export default UploadThemes