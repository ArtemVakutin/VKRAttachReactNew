import React, {useContext, useState} from 'react';
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import {useRouteLoaderData} from "react-router-dom";
import AppRegistration from '@mui/icons-material/AppRegistration';
import SimpleSelector from "../components/SimpleSelector";
import axios from "axios";
import {LOGIN_REGISTRATION_URL} from "../../constants/LinkConstants";
import {AuthContext} from "../../context/Contexts";


const UserPatchForm = () => {

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const {user} = useContext(AuthContext);

    const {faculties, years} = useRouteLoaderData("layout")

    const [id, setId] = useState(user.id);
    const [login, setLogin] = useState(user.login);
    const [name, setName] = useState(user.name);
    const [surname, setSurname] = useState(user.surname);
    const [patronymic, setPatronymic] = useState(user.patronymic);
    const [email, setEmail] = useState(user.email);
    const [telephone, setTelephone] = useState(user.telephone);
    const [faculty, setFaculty] = useState(user.faculty);
    const [group, setGroup] = useState(user.group);
    const [yearOfRecruitment, setYearOfRecruitment] = useState(user.yearOfRecruitment);

    //Регистрация
    const sendPatchRequest = async () => {
        const data = {
            id,
            login,
            name,
            surname,
            patronymic,
            email,
            telephone,
            faculty,
            group,
            yearOfRecruitment
        }
        await axios.patch(LOGIN_REGISTRATION_URL, data)
            .then(res => {
                setSuccess(true)
                setError("")
            })
            .catch(err => {
                if (err.response) {
                    console.log(err.response.data);
                    console.log(err.response.status);
                    console.log(err.response.headers);
                    setError(err.response.data.message)
                    setSuccess(false)
                } else if (err.request) {
                    console.log((err.response.data))
                    setError("сервер недоступен" + err.response.data)
                    setSuccess(false)
                } else {
                    console.log(err)
                    setError("Что-то пошло не так" + err.response)
                    setSuccess(false)
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
                    <AppRegistration/>
                </Avatar>

                {/*надпись*/}
                <Typography component="h1" variant="h5">
                    Внесение изменений
                </Typography>

                {/*логин*/}
                <TextField margin="dense" fullWidth autoFocus
                           label="Логин"
                           disabled
                           value={login}
                />

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
                    onClick={() => sendPatchRequest()}
                >
                    Внести изменения
                </Button>

                {error && <Alert severity="error" fullWidth>{error}</Alert>}
                {success && <Alert severity="success" fullWidth>Изменения внесены</Alert>}

            </Box>

            <Typography variant="body2" color="text.secondary" align="center" sx={{mt: 8, mb: 4}}>
                VKR ATTACH
            </Typography>

        </Container>
    );
}

export default UserPatchForm;