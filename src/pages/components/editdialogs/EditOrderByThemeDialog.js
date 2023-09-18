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
import OrdersDataGrid from "../../admin/OrdersDataGrid";

const EditOrderByThemeDialog = (props) => {
    const {onClose, open, themeId = null} = props
    const [error, setError] = useState("")
    const [orders, setOrders] = useState([])

    useEffect(() => {
        themeId && fetchOrders(setOrders, setError, {themeId})
    }, [themeId])

    const close = () => {
        cleanAll()
        onClose()
    }

    const cleanAll = () => {
        setError("")
        setOrders([])
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


                {error && <Alert severity="error" fullwidth>{error}</Alert>}

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

export default EditOrderByThemeDialog