import Dialog from "@mui/material/Dialog";
import React, {useEffect, useState} from "react";
import IconButton from "@mui/material/IconButton";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from '@mui/icons-material/Close';
import Alert from "@mui/material/Alert";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import {fetchOrders} from "../../../constants/Methods";
import OrdersDataGrid from "../../admin/vrem/OrdersDataGrid";
import SimpleSelector from "../SimpleSelector";
import {REQUEST_STATUS} from "../../../constants/SimpleConstants";
import {useRouteLoaderData} from "react-router-dom";

const EditOrderDialog = (props) => {
    const statuses = REQUEST_STATUS;
    const {faculties, years, departments} = useRouteLoaderData("layout");
    const {onClose, open, themeId = null, lecturerId = null} = props
    const [error, setError] = useState("")
    const [orders, setOrders] = useState([])
    const [faculty, setFaculty] = useState("");
    const [status, setStatus] = useState("");
    const [year, setYear] = useState("");

    useEffect(() => {
        themeId && fetchOrders(setOrders, setError, {faculty, year, status, themeId})
        lecturerId && fetchOrders(setOrders, setError, {faculty, year, status, lecturerId})
    }, [themeId, lecturerId, faculty, year, status])

    const close = () => {
        cleanAll()
        onClose()
    }

    const cleanAll = () => {
        setError("")
        setOrders([])
        setFaculty("")
        setStatus("")
        setYear("")
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
                        <SimpleSelector
                            hasEmpty={true}
                            value={status}
                            onChange={event => setStatus(event.target.value)}
                            items={statuses}
                            label="Статус"/>
                    </Box>

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
                        <OrdersDataGrid initialRows={orders}/>
                    </Box>

                </Container>


                {error && <Alert severity="error">{error}</Alert>}

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

                <Button size="large" variant="contained" onClick={close}>Отмена</Button>

            </DialogActions>
        </Dialog>
    );
}

export default EditOrderDialog