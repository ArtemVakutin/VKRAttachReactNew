import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import SimpleSelector from "../components/SimpleSelector";
import Button from "@mui/material/Button";
import axios from "axios";
import {LOGS_URL} from "../../constants/LinkConstants";
import ConfigDataGrid from "./ConfigDataGrid";
import UpdateIcon from '@mui/icons-material/Update';
import LogsDataGrid from "./LogsDataGrid";
import {randomId} from "@mui/x-data-grid-generator";

const ConfigPage = () => {
    const [logFiles, setLogFiles] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchLogFilesList()
    }, [])

    const fetchLogFilesList = () => {

        axios.get(LOGS_URL).then(response => {
            setLogFiles(response.data)
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


    return (
        <>
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
                    <Button size="large" variant="contained" onClick={fetchLogFilesList}>
                        <UpdateIcon/>Обновить список лог-файлов
                    </Button>
                </Box>
            </Container>

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
                    {error && <Alert severity="error">{error}</Alert>}
                </Box>
            </Container>
            <LogsDataGrid initialRows={logFiles}/>

        </>
    )


}


export default ConfigPage