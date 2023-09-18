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
import {fetchSimpleUserById, fetchThemes} from "../../constants/Methods";
import axios from "axios";
import {ORDER_URL} from "../../constants/LinkConstants";
import Alert from "@mui/material/Alert";

function ChangeThemeDialog({onClose, open, setRows, row, rows}) {
    const {userId, department} = row
    console.log(department)
    const {faculties, years, departments} = useRouteLoaderData("layout")
    const [user, setUser] = useState("");
    const [theme, setTheme] = useState("")
    const [themes, setThemes] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchSimpleUserById(setUser, setError, userId)
        setTheme(row.themeId)
    }, [row])

    useEffect(() => {
        user && fetchThemes(setThemes, setError, {department, year: user.yearOfRecruitment, faculty: user.faculty})
    }, [user])

    let themesMap = themes.map((theme) => {
        return {
            value: theme.id,
            label: theme.themeName,
        }
    })
    themesMap = [...themesMap, {value: row.themeId, label: row.themeName}]


    const close = () => {
        setError("");
        onClose()
    }

    const cleanData = () => {
        setUser("")
        setTheme("")
        setThemes([])
    }


    const sendOrder = () => {
        const data = {...row, themeId: theme}
        axios.patch(ORDER_URL, data)
            .then(response => {
                cleanData()
                const newRow = response.data
                setRows(rows.map((row) => (row.id === newRow.id ? newRow : row)))
                console.log("=1=1=1=1=1=1=1=1")
                console.log(rows)
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


            <DialogTitle>Сменить тему</DialogTitle>

            <DialogContent dividers>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        m: 'auto',
                        width: '100%',
                    }}
                >

                    {/*Выбор темы*/}
                    {(themes.length > 0) && <SimpleSelector
                        value={theme}
                        setObject={setTheme}
                        items={themesMap}
                        label="Название темы"/>}

                    {error && <Alert severity="error" fullWidth>{error}</Alert>}
                </Box>

            </DialogContent>
            <DialogActions>
                <Button onClick={sendOrder} autoFocus>
                    Подтвердить изменения
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ChangeThemeDialog