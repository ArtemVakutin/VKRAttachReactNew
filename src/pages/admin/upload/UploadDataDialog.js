import Dialog from "@mui/material/Dialog";
import React, {useState} from "react";
import IconButton from "@mui/material/IconButton";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from '@mui/icons-material/Close';
import Alert from "@mui/material/Alert";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {DropzoneArea} from "mui-file-dropzone";
import axios from "axios";
import {UPLOAD_URL} from "../../../constants/LinkConstants";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import BasicTable from "../../components/BasicTable";
import Divider from "@mui/material/Divider";

const UploadDataDialog = (props) => {
    const {onClose, open, dropzoneText = "Выберите Excel-файл для загрузки пользователей", acceptedFiles = ['.xls'], uploadType, params = {}} = props
    const [error, setError] = useState("")
    const [dataId, setDataId] = useState("");
    const uploadURL = `${UPLOAD_URL}/${uploadType}`
    const [tableData, setTableData] = useState([])
    const [errorTableData, setErrorTableData] = useState([])
    const [success, setSuccess] = useState(false)

    const close = () => {
        cleanAll()
        onClose()
    }

    const cleanAll = () => {
        setTableData([])
        setErrorTableData([])
        setError("")
        setDataId("")
        setSuccess(false)
    }

    const loadData = () => {
        axios.get(uploadURL, {params: {dataId}}).then(async response => {
            await cleanAll()
            setSuccess(true)
        }).catch(async ex => {
            if (ex.response) {
                console.log(ex.response.data);
                console.log(ex.response.status);
                console.log(ex.response.headers);
                await cleanAll()
                setError("Загрузка не произведена")

            } else if (ex.request) {
                console.log("SERVER IS NOT AVAILABLE");
                await cleanAll()
                setError("Отсутствует соединение с сервером")
            } else {
                await cleanAll()
                setError("Что-то в этом мире пошло не так")
            }
        })
    }

    const checkUploadFile = (files) => {
        console.log(files)
        const data={...params, data: files[0]}

        console.log("---------------------------------")
        console.log(data)

        const config = {headers: {"Content-Type": "multipart/form-data"}}


        axios.post(uploadURL, data, config).then(response => {
            setDataId(response.data.dataId)
            setTableData(response.data.objects)
            setErrorTableData(response.data.errorObjects)
            console.log(response.data)
            setError("")
        }).catch(ex => {
            if (ex.response) {
                console.log(ex.response.data);
                console.log(ex.response.status);
                console.log(ex.response.headers);
                setTableData([])
                setErrorTableData([])
                setDataId("")
                setError("Файл не загружен")

            } else if (ex.request) {
                console.log("SERVER IS NOT AVAILABLE");
                setTableData([])
                setErrorTableData([])
                setDataId("")
                setError("Отсутствует соединение с сервером")
            } else {
                setTableData([])
                setErrorTableData([])
                setDataId("")
                setError("Что-то в этом мире пошло не так")
            }
        })
    }

    return (
        <Dialog maxWidth={"xl"} fullWidth onClose={close} open={open}>
            <Divider/>
            <DialogContent dividers={'body'}>
                <Container maxWidth={"xl"}>
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    > <CloseIcon/>
                    </IconButton>
                </Container>


                <Container maxWidth={"sm"}>
                    <Box sx={{
                        marginTop: 5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        gap: '10px'
                    }}>
                        <DropzoneArea filesLimit={1} maxFileSize={2000000} dropzoneText={dropzoneText}
                                      acceptedFiles={acceptedFiles} onDelete={cleanAll}
                                      showFileNamesInPreview={true} showFileNames={true} onDrop={async (files) => {
                            await cleanAll()
                            checkUploadFile(files)
                        }}/>
                    </Box>

                </Container>


                {tableData.length === 0 && errorTableData.length > 0 &&
                <Alert severity="error" fullwidth>"Никаких данных загружено не будет:"</Alert>}

                {error && <Alert severity="error" fullwidth>{error}</Alert>}
                {!error && success && <Alert severity="success" fullwidth>{"Данные добавлены"}</Alert>}

                {!error && errorTableData.length > 0 && tableData.length > 0 &&
                <Alert severity="warning" fullwidth>{"Не будут загружены следующие данные:"}</Alert>}
                {errorTableData.length > 0 && <BasicTable tableData={errorTableData}/>}

                {!error && tableData.length > 0 &&
                <Alert severity="info" fullwidth>{"Будут загружены следующие данные"}</Alert>}
                {tableData.length > 0 && <BasicTable tableData={tableData}/>}

            </DialogContent>

            <DialogActions sx={{
                marginTop: 2,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: '100',
                justifyContent: 'center',
                alignSelf: 'center',
                gap: '10px'
            }}>

                {tableData.length > 0 && dataId &&
                <Button size="large" variant="contained" onClick={loadData} autoFocus>
                    {errorTableData > 0 ? "Все равно загрузить оставшееся" : "Загрузить"}
                </Button>}
                <Button size="large" variant="contained" onClick={close}>Отмена</Button>

            </DialogActions>
        </Dialog>
    );
}

export default UploadDataDialog