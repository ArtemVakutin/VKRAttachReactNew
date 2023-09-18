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
import {useNavigate, useRouteLoaderData} from "react-router-dom";
import axios from "axios";
import {LOGIN_REGISTRATION_URL} from "../../constants/LinkConstants";


export const Registration = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const {faculties, years} = useRouteLoaderData("layout")
    const [login, setLogin] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [patronymic, setPatronymic] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [telephone, setTelephone] = useState("");
    const [faculty, setFaculty] = useState("");
    const [group, setGroup] = useState("");
    const [yearOfRecruitment, setYearOfRecruitment] = useState("");

    //обнуляем с переадресацией на sign in
    const regComplete = () => {
        setLogin("");
        setName("");
        setSurname("");
        setPatronymic("");
        setEmail("");
        setPassword("");
        setPasswordConfirm("");
        setTelephone("");
        setFaculty("");
        setGroup("");
        setYearOfRecruitment("");
        setError("");
        navigate("/auth/regcomplete")
    }

    //Регистрация, после - переадресация
    const sendRegRequest = async () => {
        const data = {
            login,
            name,
            surname,
            patronymic,
            email,
            password,
            passwordConfirm,
            telephone,
            faculty,
            group,
            yearOfRecruitment
        }
        await axios.put(LOGIN_REGISTRATION_URL, data)
            .then(res => regComplete())
            .catch(err => {
                if (err.response) {
                    console.log(err.response.data);
                    console.log(err.response.status);
                    console.log(err.response.headers);
                    setError(err.response.data.message)
                } else if (err.request) {
                    console.log((err.response.data))
                    setError("сервер недоступен" + err.response.data)
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
                    Регистрация
                </Typography>

                {/*логин*/}
                <TextField margin="dense" fullWidth autoFocus
                           label="Логин*"
                           onChange={event => setLogin(event.target.value)}
                           value={login}
                />

                {/*Форма пароля*/}
                <PasswordForm
                    password={password}
                    setPassword={setPassword}/>

                {/*Форма пароля*/}
                <PasswordForm
                    password={passwordConfirm}
                    setPassword={setPasswordConfirm}/>

                {/*фамилия*/}
                <TextField margin="dense" fullWidth
                           label="Фамилия"
                           onChange={event => setSurname(event.target.value)}
                           value={surname}
                />

                {/*имя*/}
                <TextField margin="dense" fullWidth
                           label="Имя"
                           onChange={event => setName(event.target.value)}
                           value={name}
                />

                {/*отчество*/}
                <TextField margin="dense" fullWidth
                           label="Отчество"
                           onChange={event => setPatronymic(event.target.value)}
                           value={patronymic}
                />

                {/*email*/}
                <TextField margin="dense" fullWidth
                           label="E-mail"
                           onChange={event => setEmail(event.target.value)}
                           value={email}
                />

                {/*telephone*/}
                <TextField margin="dense" fullWidth
                           label="Телефон"
                           onChange={event => setTelephone(event.target.value)}
                           value={telephone}
                />

                {/*Номер группы*/}
                <TextField margin="dense" fullWidth
                           label="Номер группы (без аббревиатуры, например просто: 213)."
                           onChange={event => setGroup(event.target.value)}
                           value={group}
                />

                {/*специальность*/}
                <SimpleSelector
                    value={faculty}
                    setObject={setFaculty}
                    items={faculties}
                    label="Специальность"/>

                {/*год набора*/}
                <SimpleSelector
                    value={yearOfRecruitment}
                    setObject={setYearOfRecruitment}
                    items={years}
                    label="Год набора"/>

                <Button
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                    onClick={() => sendRegRequest()}
                >
                    Зарегистрироваться
                </Button>

                {error && <Alert severity="error" fullWidth>{error}</Alert>}

                <Link to="/auth" variant="subtitle2" component={RouterLink}>
                    {"Уже есть аккаунт? Войти"}
                </Link>

            </Box>

            <Typography variant="body2" color="text.secondary" align="center" sx={{mt: 8, mb: 4}}>
                VKR ATTACH
            </Typography>
        </Container>
    );
}