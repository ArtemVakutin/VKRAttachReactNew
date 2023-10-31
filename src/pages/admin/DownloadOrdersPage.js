import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {useRouteLoaderData} from "react-router-dom";
import axios from "axios";
import {createFilters} from "../../constants/Methods";
import {DOWNLOAD_URL} from "../../constants/LinkConstants";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import fileDownload from 'js-file-download';
import SimpleSelector from "../components/SimpleSelector";


export const DownloadOrdersPage = ({departmentInitial = ""}) => {

    const {faculties, years, departments} = useRouteLoaderData("layout");

    const [faculty, setFaculty] = useState("");
    const [year, setYear] = useState("");
    const [department, setDepartment] = useState("");

    const [error, setError] = useState("");

    useEffect(() => {
        setDepartment(departmentInitial); // This is be executed when `loading` state changes
    }, [])

    const downloadOrdersDocx = () => {
        let filter = null;

        faculty && (filter = createFilters(filter, "user.faculty", faculty));
        department && (filter = createFilters(filter, "theme.department", department));
        year && (filter = createFilters(filter, "user.year", year));

        const config = {
            params: {filter},
            responseType: 'arraybuffer'
        }

        axios.get(`${DOWNLOAD_URL}/orders`, config).then(response => {
            setError("")
            fileDownload(response.data, "orders.docx");
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
                        value={department}
                        onChange={event => setDepartment(event.target.value)}
                        items={departments}
                        label="Кафедра"/>
                    <SimpleSelector
                        hasEmpty={true}
                        value={faculty}
                        onChange={event => setFaculty(event.target.value)}
                        items={faculties}
                        label="Специальность (направление подготовки)"/>
                    <SimpleSelector
                        hasEmpty={true}
                        value={year}
                        onChange={event => setYear(event.target.value)}
                        items={years}
                        label="Год набора"/>
                    {error && <Alert severity="error" fullWidth>{error}</Alert>}
                    <Button size="large" variant="contained" onClick={downloadOrdersDocx}>
                        <AddIcon/>Скачать список закрепленных работ в .docx
                    </Button>
                </Box>
            </Container>
        </>
    )
}

export default DownloadOrdersPage