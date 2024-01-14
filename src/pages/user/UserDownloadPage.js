import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/Contexts";
import {fetchOrdersByUser} from "../../constants/Methods";
import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import {DOWNLOAD_URL} from "../../constants/LinkConstants";
import fileDownload from "js-file-download";

export const UserDownloadPage = ({userId}) => {

    const {user} = useContext(AuthContext)
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState("");
    const [id, setId] = useState();


    useEffect(() => {
        fetchOrdersByUser(setOrders, setError, user.id);
    }, [user])

    useEffect(() => {
        if (userId){
            setId(userId)
        } else {
            setId(user.id)
        }
    }, [userId])

    const order = orders.filter(order => order.requestStatus === "ACCEPTED")[0]


    const downloadReport = () => {
        let filter = null;

        const config = {
            params: {
                id,
            },
            responseType: 'arraybuffer'
        }

        axios.get(`${DOWNLOAD_URL}/docs`, config).then(response => {
            setError("")
            fileDownload(response.data, "report.docx");
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

    return <>
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
                {order && <><Button size="large" variant="contained" onClick={downloadReport}>
                    <AddIcon/>Скачать рапорт
                </Button>
                    <Alert severity="info">Если хотите, чтобы в рапорте были заполнены все поля - заполните свои
                        регистрационные данные</Alert></>
                }
                {!order && <Alert severity="info">Здесь сможете скачать сгенерированный рапорт, когда за Вами закрепят
                    ВКР</Alert>}
                {error && <Alert severity="error">{error}</Alert>}
            </Box>

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
                <Button size="large" variant="contained" onClick={() => {
                }}>
                    <AddIcon/>Скачать План-график (не работает)
                </Button>
                <Alert severity="info">Планируется после апробирования программы</Alert>
            </Box>

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
                <Button size="large" variant="contained" onClick={() => {
                }}>
                    <AddIcon/>Скачать Образец рецензии (не работает)
                </Button>
                <Alert severity="info">Планируется после апробирования программы</Alert>
            </Box>

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
                <Button size="large" variant="contained" onClick={() => {
                }}>
                    <AddIcon/>Скачать Образец ВКР (не работает)
                </Button>
                <Alert severity="info">Планируется после апробирования программы</Alert>
            </Box>
        </Container>
    </>
}

export default UserDownloadPage;

