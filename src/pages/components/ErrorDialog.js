import Dialog from "@mui/material/Dialog";
import React from "react";
import IconButton from "@mui/material/IconButton";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import CloseIcon from '@mui/icons-material/Close';
import Alert from "@mui/material/Alert";

function ErrorDialog(props) {
    const {onClose, error, open} = props;

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


            <DialogTitle>Ошибка</DialogTitle>

            <DialogContent dividers>
                <Alert severity="error" fullWidth>{error}</Alert>
            </DialogContent>

        </Dialog>
    );
}

export default ErrorDialog