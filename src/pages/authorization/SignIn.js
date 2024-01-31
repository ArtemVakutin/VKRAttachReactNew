import * as React from 'react';
import {useContext, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Link as RouterLink, useNavigate} from "react-router-dom";
import Alert from "@mui/material/Alert";
import axios from "axios";
import {LOGIN_PROCESSING_URL} from "../../constants/LinkConstants";
import qs from "qs"
import {SIGN_IN_CONFIG} from "../../constants/SimpleConstants";
import PasswordForm from "../components/PasswordForm";
import {AuthContext} from "../../context/Contexts";
import {addCsrfToken} from "../../App";
import {checkAndRefreshToken, deleteTokens} from "./JwtAxiosAuthenticationProps";

const defaultTheme = createTheme();


const SignIn = ({registrationComplete = false}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [regComplete, setRegComplete] = useState(registrationComplete)
    const {fetchUser} = useContext(AuthContext);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendSignIn();
        }
    };

    const sendSignIn = async () => {

        if (username === "" || password === "") {
            setError("Логин и пароль не должны быть пустыми");
            return;
        }
        const basicAuthToken = btoa(`${username}:${password}`);
        const config = {
            headers: {
                'Authorization': `Basic ${basicAuthToken}`,
                'Content-Type': 'application/json',
                // Другие заголовки, если необходимо
            },
        };

        await axios.post(LOGIN_PROCESSING_URL, "", config)
            .then(async response => {
                console.log("-------------УДАЧНО-----------------")
                setError("");
                setUsername("");
                setPassword("")
                await deleteTokens()
                await checkAndRefreshToken();
                await fetchUser()
            })
            .catch((err) => {
                if (err.response) {
                    if (err.response.status === 401) {
                        console.log("-------------НЕЕЕЕУДАЧНО-----------------")
                        setRegComplete(false)
                        setError("Логин или пароль некорректны");
                    } else {
                        setError(`Что-то пошло не так: ошибка ${err.status}`);
                        console.log("-------------НЕЕЕЕУДАЧНО2-----------------")
                        console.log(err.response.data);
                        console.log(err.response.status);
                        console.log(err.response.headers);
                    }
                } else if (err.request) {
                    console.log((err.response.data))
                    setError("Сервер недоступен (возможно отключен доступ в сеть)" + err.response.data)
                } else {
                    console.log(err)
                    setError("Что-то пошло не так" + err.response)
                }
            });
    }


    return (
        <ThemeProvider theme={defaultTheme}>
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
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Вход
                    </Typography>

                    {/*форма ввода*/}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Логин"
                        autoFocus
                        onChange={event => setUsername(event.target.value)}
                        value={username}
                        onKeyDown={(event)=>handleKeyDown(event)}
                    />

                    {/*Форма пароля*/}
                    <PasswordForm
                        password={password}
                        setPassword={setPassword}
                        onKeyDown={(event)=>handleKeyDown(event)}/>

                    <Button
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        onClick={() => sendSignIn()}

                    >
                        Войти
                    </Button>

                    {error && <Alert severity="error">{error}</Alert>}
                    {regComplete &&
                        <Alert severity="success">Регистрация завершена, войдите под своим логином и
                            паролем</Alert>}

                    <Link to="/auth/registration" variant="subtitle2" component={RouterLink}>
                        {"Зарегистрироваться"}
                    </Link>

                </Box>

                <Typography variant="body2" color="text.secondary" align="center" sx={{mt: 8, mb: 4}}>
                    VKR ATTACH
                </Typography>
            </Container>
        </ThemeProvider>
    );
}


export default SignIn