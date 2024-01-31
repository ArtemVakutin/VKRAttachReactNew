import React, {useContext, useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Alert from "@mui/material/Alert";
import SimpleSelector from "../components/SimpleSelector";
import {CONFIG_TYPES} from "../../constants/SimpleConstants";
import Button from "@mui/material/Button";
import axios from "axios";
import {CONFIG_URL, RESTART_URL} from "../../constants/LinkConstants";
import {AuthContext} from "../../context/Contexts";
import ConfigDataGrid from "./ConfigDataGrid";
import {deleteTokens} from "../authorization/JwtAxiosAuthenticationProps";
import {useNavigate} from "react-router-dom";


const ConfigPage = () => {
    const navigate = useNavigate()
    const {setUser} = useContext(AuthContext)
    const types = CONFIG_TYPES;
    const [type, setType] = useState();
    const [configEntities, setConfigEntities] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        if (type) {
            fetchConfig();
        }
    }, [type])

    const fetchConfig = () => {
        const config = {
            params: {
                type
            }
        }

        axios.get(CONFIG_URL, config).then(response => {
            setConfigEntities(response.data)
            setError("")
        }).catch(ex => {
            if (ex.response) {
                console.log(ex.response.data);
                console.log(ex.response.status);
                console.log(ex.response.headers);
                setError("Что-то произошло непонятное")
            } else if (ex.request) {
                console.log("SERVER IS NOT AVAILABLE");
                setError("Походу интернета тютю")
            } else {
                setError("Что-то в этом мире пошло не так")
            }
        })
    }
    const restartServer = () => {

        axios.post(RESTART_URL).then(async response => {
            await setUser(null)
            await setError("")
            await deleteTokens()
            navigate("/auth")
        }).catch(ex => {
            if (ex.response) {
                console.log(ex.response.data);
                console.log(ex.response.status);
                console.log(ex.response.headers);
                setError("Что-то произошло непонятное")
            } else if (ex.request) {
                console.log("SERVER IS NOT AVAILABLE");
                setError("Походу интернета тютю")
            } else {
                setError("Что-то в этом мире пошло не так")
            }
        })
    }

    return (
        <>
            <Container maxWidth={'md'}>
                <Box sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100',
                    // backgroundColor: 'primary.dark',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    gap: '10px'
                }}>
                    <SimpleSelector
                        value={type}
                        onChange={event => setType(event.target.value)}
                        items={types}
                        label="Разновидность конфигурации"/>
                    {error && <Alert severity="error">{error}</Alert>}
                </Box>
            </Container>
            <ConfigDataGrid initialRows={configEntities} type={type}/>
            <Container maxWidth={'md'}>
                <Box sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100',
                    // backgroundColor: 'primary.dark',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    gap: '10px'
                }}>
                    <Alert severity="info">Внимание! Если клиенты могут быть открыты в других сессиях, необходимо нажать эту кнопку!</Alert>
                    <Button size="large" variant="contained" onClick={restartServer}>
                        <RestartAltIcon/>Закрыть все сессии и перезагрузить сервер
                    </Button>
                 <Alert severity="info">Внимание! После перезагрузки сервера будут закрыты сессии у всех
                        пользователей, а алгоритм шифрования изменен! После перезагрузки обновите страницу</Alert>
                </Box>
            </Container>
        </>
    )


}


export default ConfigPage