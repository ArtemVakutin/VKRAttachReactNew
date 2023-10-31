import Dialog from "@mui/material/Dialog";
import React, {useEffect, useState} from "react";
import IconButton from "@mui/material/IconButton";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from '@mui/icons-material/Close';
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import SimpleSelector from "./SimpleSelector";
import {useRouteLoaderData} from "react-router-dom";
import {fetchSimpleUsers, fetchThemes} from "../../constants/Methods";
import {REQUEST_STATUS} from "../../constants/SimpleConstants";
import TextField from "@mui/material/TextField";
import axios from "axios";
import {ORDER_URL} from "../../constants/LinkConstants";
import Alert from "@mui/material/Alert";

function AddOrderDialog({onClose, open, setRows, departmentInit=""}) {

    const {faculties, years, departments} = useRouteLoaderData("layout")
    const [faculty, setFaculty] = useState("");
    const [year, setYear] = useState("");
    const [department, setDepartment] = useState("")
    const [user, setUser] = useState("");
    const [theme, setTheme] = useState("")
    const [lecturer, setLecturer] = useState("")
    const [requestStatus, setRequestStatus] = useState("UNDER_CONSIDERATION")
    const [comment, setComment] = useState("")

    const [users, setUsers] = useState([]);
    const [themes, setThemes] = useState([]);
    const [lecturers, setLecturers] = useState([]);

    const [error, setError] = useState("");

    useEffect(() => {
        setDepartment(departmentInit)
    }, [departmentInit])

    useEffect(() => {
        faculty && year && department && fetchThemes(setThemes, setError, {
            faculty,
            year,
            department
        })
    }, [department, year, faculty])

    useEffect(() => {
        faculty && year && fetchSimpleUsers(setUsers, setError, {faculty, year})
    }, [faculty, year])

    // Преобразовываем юзера для селекта
    const usersMap = users.sort((a, b) => {
        const nameA = a.surname.toUpperCase(); // ignore upper and lowercase
        const nameB = b.surname.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        // names must be equal
        return 0;
    }).map((user) => {
        return {
            value: user.id,
            label: `${user.faculty}-${user.group}  ${user.surname} ${user.name} ${user.patronymic}`
        }
    })

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
        setFaculty("")
        setDepartment("")
        setLecturer("")
        setUser("")
        setTheme("")
        setRequestStatus("UNDER_CONSIDERATION")
        setComment("")
        setYear("")
        setUsers([])
        setThemes([])
        setLecturers([])
    }


    const sendOrder = () => {
        const data = {faculty, year, department, userId: user, themeId: theme, requestStatus, comment}
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
                    <SimpleSelector
                        value={faculty}
                        setObject={setFaculty}
                        items={faculties}
                        label="Специальность (направление подготовки)"/>

                    {/*год набора*/}
                    <SimpleSelector
                        value={year}
                        setObject={setYear}
                        items={years}
                        label="Год набора"/>

                    {/*Выбор обучающегося*/}
                    {users.length > 0 && <SimpleSelector
                        value={user}
                        setObject={setUser}
                        items={usersMap}
                        label="Обучающийся"/>}

                    {/*Выбор кафедры на которой писать тему*/}
                    <SimpleSelector
                        value={department}
                        setObject={setDepartment}
                        items={departments}
                        inputProps={{
                            readOnly: departmentInit !== ""
                        }}
                        label="Кафедра"/>

                    {/*Выбор темы*/}
                    {(themes.length > 0) && <SimpleSelector
                        value={theme}
                        setObject={setTheme}
                        items={themesMap}
                        label="Название темы"/>}

                    {/*Выбор научного руководителя*/}
                    {(lecturers.length > 0) && <SimpleSelector
                        value={lecturer}
                        setObject={setLecturer}
                        items={lecturers}
                        label="Научный руководитель"/>}

                    <SimpleSelector
                        value={requestStatus}
                        setObject={setRequestStatus}
                        items={REQUEST_STATUS}
                        label="Статус"/>

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

export default AddOrderDialog