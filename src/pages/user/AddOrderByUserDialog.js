import Dialog from "@mui/material/Dialog";
import React, {useContext, useEffect, useState} from "react";
import IconButton from "@mui/material/IconButton";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from '@mui/icons-material/Close';
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {useRouteLoaderData} from "react-router-dom";
import {fetchThemes} from "../../constants/Methods";
import TextField from "@mui/material/TextField";
import axios from "axios";
import {ORDER_URL} from "../../constants/LinkConstants";
import Alert from "@mui/material/Alert";
import {AuthContext} from "../../context/Contexts";
import SimpleSelector from "../components/SimpleSelector";

function AddOrderByUserDialog({onClose, open, setRows}) {
    const {user} = useContext(AuthContext)
    const {faculty, year, surname, name, patronymic} = user

    const {faculties, departments} = useRouteLoaderData("layout")
    const [department, setDepartment] = useState("")
    const [theme, setTheme] = useState("")
    const [comment, setComment] = useState("")
    const [themes, setThemes] = useState([]);
    const [error, setError] = useState("");
    let facultyLabel = "Укажите в настройках профиля факультет и год набора"
    if (faculty && year) {
        facultyLabel = faculties.filter(({value}) => value === faculty).shift().label
    }

    useEffect(() => {
        faculty && year && department && fetchThemes(setThemes, setError, {
            faculty,
            year,
            department
        })
    }, [department, year, faculty])

    const themesMap = themes.map((theme) => {
        return {
            value: theme.id,
            label: theme.themeName,
        }
    })

    const close = () => {
        setError("");
        onClose()
    }

    const cleanData = () => {
        setDepartment("")
        setTheme("")
        setComment("")
        setThemes([])
    }


    const sendOrder = () => {
        const data = {faculty, year, department, userId: user.id, themeId: theme, comment}
        axios.put(ORDER_URL, data)
            .then(response => {
                cleanData()
                setRows(oldRows => [...oldRows, response.data])
                onClose()
            }).catch(ex => {
            if (ex.response) {
                console.log(ex.response.data);
                console.log(ex.response.status);
                console.log(ex.response.headers);
                ex.response.status === 500 ? setError("Внутренняя ошибка сервера (смотри логи)") : setError(ex.response.data.message)
            } else if (ex.request) {
                console.log("SERVER IS NOT AVAILABLE");
                setError("Походу интернета тютю")
            } else {
                setError("Что-то в этом мире пошло не так")
            }
        })
    }

    return (
        <Dialog maxWidth="xs" fullWidth onClose={close} open={open}>
            <IconButton
                aria-label="close"
                onClick={close}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            > <CloseIcon/>
            </IconButton>


            <DialogTitle>Заявка</DialogTitle>

            <DialogContent dividers>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        m: 'auto',
                        width: '100%',
                    }}
                >

                    {/*специальность*/}

                    <TextField
                        fullWidth margin="dense"
                        disabled
                        label="Специальность (направление подготовки)"
                        defaultValue={facultyLabel}
                        onChange={()=> {}}
                    />


                    <TextField
                        fullWidth margin="dense"
                        disabled
                        label="Год набора"
                        defaultValue={year}
                        onChange={()=> {}}
                    />


                    <TextField
                        fullWidth margin="dense"
                        disabled
                        label="Обучающийся"
                        defaultValue={`${surname} ${name} ${patronymic}`}
                        onChange={()=> {}}
                    />


                    {/*Выбор кафедры на которой писать тему*/}
                    <SimpleSelector
                        value={department}
                        onChange={event => setDepartment(event.target.value)}
                        items={departments}
                        label="Кафедра"/>

                    {/*Выбор темы*/}
                    {(themes.length > 0) && <SimpleSelector
                        value={theme}
                        onChange={event => setTheme(event.target.value)}
                        items={themesMap}
                        label="Название темы"/>}

                    <TextField
                        label="Комментарий (не обязательно)"
                        multiline
                        rows={3}
                        fullWidth
                        margin="dense"
                        value={comment}
                        onChange={event => setComment(event.target.value)}
                    />

                    {error && <Alert severity="error" fullWidth>{error}</Alert>}
                </Box>

            </DialogContent>
            <DialogActions>
                <Button onClick={sendOrder} autoFocus>
                    Послать заявку
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddOrderByUserDialog