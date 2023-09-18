import Dialog from "@mui/material/Dialog";
import React from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import Alert from "@mui/material/Alert";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import ThemesDataGrid from "../ThemesDataGrid";
import Box from "@mui/material/Box";

function ThemesNotDeletedDialog(props) {
    const {onClose, themes, open} = props;

    return (
        <Dialog maxWidth={"xl"}  fullScreen onClose={onClose} open={open}>
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
                <Alert severity="error">Данные темы не могут быть удалены, так как уже закреплены за обучающимися или
                    находятся в заявках.
                    Нажмите на кнопку "Редактировать заявку" в последнем поле каждой темы и удалите заявки. Потом
                    закройте и попробуйте снова удалить все темы</Alert>
                <ThemesDataGrid initialRows={themes}/>
                <DialogActions>
                    <Button onClick={onClose} size="large" variant="contained">Закрыть</Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
}

export default ThemesNotDeletedDialog