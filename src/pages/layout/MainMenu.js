import * as React from 'react';
import {useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {AuthContext} from "../../context/Contexts";
import {LeftPanel} from "./LeftPanel";
import Divider from "@mui/material/Divider";
import {useNavigate} from "react-router-dom";

export const MainMenu = () => {
    const navigate = useNavigate();
    const {user, logout} = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [panelOpen, setPanelOpen] = React.useState(false);
    const hello = user === null ? `Добрый день, гость` : `Добрый день, ${user.role === "USER" ? user.name : user.login}`;


    const closePanel = () => {
        setPanelOpen(false)
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                            onClick={() => setPanelOpen(!panelOpen)}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            {hello}
                        </Typography>
                        {user && (
                            <div>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle/>
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    {user.role === "USER" && <MenuItem onClick={() => {
                                        handleClose();
                                        navigate("/user/patch")
                                    }}>Изменить данные профиля</MenuItem>}
                                    <Divider/>
                                    <MenuItem onClick={async () => {
                                        await handleClose();
                                        await logout()
                                        navigate("/auth")
                                    }}>Выйти из профиля</MenuItem>
                                </Menu>
                            </div>
                        )}
                    </Toolbar>
                </AppBar>
            </Box>
            <LeftPanel closePanel={closePanel} panelOpen={panelOpen}/>
        </>
    );
}