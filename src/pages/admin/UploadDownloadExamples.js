import React, {useState} from 'react';
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';

import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import axios from "axios";
import {DOWNLOAD_URL} from "../../constants/LinkConstants";
import fileDownload from "js-file-download";
import SimpleSelector from "../components/SimpleSelector";

const FILES = [
    {
        value:"themes_example.docx",
        label: "Образец списка тем ВКР в формате docx",
        explanations: "раз"
    },
    {
        value:"lecturers_example.xls",
        label: "Образец списка руководителей ВКР в формате xls",
        explanations: "два"
    },
    {
        value:"users_example.xls",
        label: "Образец списка пользователей в формате xls",
        explanations: "три"
    }
]

const UploadDownloadExamples = () => {
    const files = FILES;
    const [fileName, setFileName] = useState("");

    const [error, setError] = useState("");

    let info;

    if (fileName) {
        info = files.filter(type => type.value === fileName).map(type => type.explanations)[0]
    }

    const downloadFile = () => {
        if (!fileName) {
            setError("Выберите нужный файл");
            return
        }

        const config = {
            params: {
                fileName
            },
            responseType: 'arraybuffer'
        }

        axios.get(`${DOWNLOAD_URL}/example`, config).then(response => {
            setError("")
            fileDownload(response.data, fileName);
        }).catch(ex => {
            if (ex.response) {
                console.log(ex.response.data);
                console.log(ex.response.status);
                console.log(ex.response.headers);
                setError("Загрузка файла не удалась")

            } else if (ex.request) {
                console.log("SERVER IS NOT AVAILABLE");
                setError("Сервер не отвечает")
            } else {
                setError("Что-то в этом мире пошло не так")
            }
        })
    }

    return (
        <>
            <Container maxWidth={"md"}>
                <Box sx={{
                    marginTop: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    gap: '10px',
                    border: 1,
                    borderRadius: 2,
                    p: 2
                }}>
                    <SimpleSelector
                        hasEmpty={true}
                        value={fileName}
                        onChange={event=>{
                            setFileName(event.target.value)
                            setError("")
                        }}
                        items={files}
                        label="Выберите файл"/>

                    <Button size="large" variant="contained" onClick={downloadFile}>
                        <AddIcon/>Скачать образцы файлов для загрузки
                    </Button>
                    {info && <Alert severity="info">info</Alert>}
                    {error && <Alert severity="error">{error}</Alert>}




                </Box>


            </Container>
        </>
    )
}


export default UploadDownloadExamples