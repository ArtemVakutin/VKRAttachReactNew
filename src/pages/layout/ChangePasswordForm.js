import React, {useState} from 'react';
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Link from "@mui/material/Link";
import {Link as RouterLink} from "react-router-dom";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PasswordForm from "../components/PasswordForm";
import SimpleSelector from "../components/SimpleSelector";
import axios from "axios";
import {CHANGE_PASSWORD_URL} from "../../constants/LinkConstants";


export const ChangePasswordForm = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    //обнуляем с переадресацией на sign in
    const changeComplete = () => {
        setOldPassword("");
        setPassword("");
        setPasswordConfirm("");
        setError("");
        setSuccess(true);
    }

    //Регистрация, после - переадресация
    const sendChangePasswordRequest = async () => {
        if (!oldPassword || !password || !passwordConfirm) {
            setError("Заполните все поля");
            return;
        }
        if (password !== passwordConfirm) {
            setError("Поле \"Пароль\" и поле \"Подтвердите пароль\" должны совпадать");
            return;
        }

        const config = {
            oldPassword,
            password,
        }
        await axios.patch(CHANGE_PASSWORD_URL, config)
            .then(res => changeComplete())
            .catch(err => {
                if (err.response) {
                    console.log(err.response.data);
                    console.log(err.response.status);
                    console.log(err.response.headers);
                    setError(err.response.data.message)
                } else if (err.request) {
                    console.log((err.response.data))
                    setError("Сервер недоступен (возможно отключен доступ в сеть)" + err.response.data)
                } else {
                    console.log(err)
                    setError("Что-то пошло не так" + err.response)
                }
            })
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {/*Иконка*/}
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <PersonAddAlt1Icon/>
                </Avatar>

                {/*надпись*/}
                <Typography component="h1" variant="h5">
                    Смена пароля
                </Typography>


                {/*Форма пароля*/}
                <PasswordForm
                    password={oldPassword}
                    setPassword={setOldPassword}
                    label={"Старый пароль"}/>


                {/*Форма пароля*/}
                <PasswordForm
                    password={password}
                    setPassword={setPassword}/>

                {/*Форма пароля*/}
                <PasswordForm
                    password={passwordConfirm}
                    setPassword={setPasswordConfirm}
                    label={"Повторите пароль"}/>


                <Button
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                    onClick={() => sendChangePasswordRequest()}
                >
                    Сменить пароль
                </Button>

                {error && <Alert severity="error">{error}</Alert>}
                {success && <Alert severity="success">Пароль изменен</Alert>}
            </Box>

            <Typography variant="body2" color="text.secondary" align="center" sx={{mt: 8, mb: 4}}>
                VKR ATTACH
            </Typography>
        </Container>
    );
}