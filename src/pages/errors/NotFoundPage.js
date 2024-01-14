import React from 'react';
import Button from '@mui/material/Button';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import {useNavigate} from "react-router-dom";
import Alert from "@mui/material/Alert";

const NotFoundPage = () => {
    const navigate = useNavigate();
    const reloadPage = () => {
        navigate("/")
    };

    return (
        <Container maxWidth={"md"}>
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
                <Alert severity="error"><h2>Запрашиваемая страница не найдена</h2></Alert>
                <Button sx={{mt: 3, mb: 2}} variant="contained" color="primary" onClick={reloadPage}>
                    Перейти на основную страницу
                </Button>
            </Box>
        </Container>
    );
};

export default NotFoundPage;