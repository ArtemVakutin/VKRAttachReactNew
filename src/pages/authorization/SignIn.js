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


const defaultTheme = createTheme();


const SignIn = ({registrationComplete = false}) => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [regComplete, setRegComplete] = useState(registrationComplete)
    const {fetchUser} = useContext(AuthContext);


    const sendSignIn = async () => {
        if (userName === "" || password === "") {
            setError("Логин и пароль не должны быть пустыми");
            return;
        }
        const data = {username: userName, password};
        let done = false
        await axios.post(LOGIN_PROCESSING_URL, qs.stringify(data), SIGN_IN_CONFIG)
            .then(async response => {
                if (!response.request.responseURL.includes("error")) {
                    setError("");
                    setUserName("");
                    setPassword("")
                    // done = true
                    await fetchUser()
                    navigate("/")
                } else {
                    setRegComplete(false)
                    setError("Логин или пароль некорректны");
                }
            })
            .catch((error) => {
                console.log(error);
                setError("Что-то пошло не так")
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
                        onChange={event => setUserName(event.target.value)}
                        value={userName}
                    />

                    {/*Форма пароля*/}
                    <PasswordForm
                        password={password}
                        setPassword={setPassword}/>

                    <Button
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        onClick={() => sendSignIn()}
                    >
                        Войти
                    </Button>

                    {error && <Alert severity="error" fullWidth>{error}</Alert>}
                    {regComplete &&
                    <Alert severity="success" fullWidth>Регистрация завершена, войдите под своим логином и
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