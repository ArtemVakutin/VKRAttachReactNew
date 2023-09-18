import Dialog from "@mui/material/Dialog";
import React from "react";
import IconButton from "@mui/material/IconButton";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from '@mui/icons-material/Close';
import Alert from "@mui/material/Alert";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function DeleteDialog(props) {
    const {onClose, rowForDelete, open, handleAccept} = props;

    return (
        <Dialog onClose={onClose} open={open}>
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


            <DialogTitle>Подтвердите удаление</DialogTitle>

            <DialogContent dividers>
                <Alert severity="warning" fullWidth> Вы действительно хотите удалить {rowForDelete.label} </Alert>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Не удалять</Button>
                <Button onClick={handleAccept(rowForDelete.id)} autoFocus>
                    Удалить
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteDialog