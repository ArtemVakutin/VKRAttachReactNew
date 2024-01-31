import * as React from 'react';
import {useContext} from 'react';
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import {Link as RouterLink} from "react-router-dom";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import CloseIcon from '@mui/icons-material/Close';
import {LINKS_BY_ROLE} from "../../constants/RouterPanelLinks";
import {AuthContext} from "../../context/Contexts";


export const LeftPanel = ({panelOpen, closePanel = Function.prototype}) => {

    const {user} = useContext(AuthContext);
    //
    // console.log(user);
    // console.log("------------------")

    let role;
    user === null ? role = "NONE" : role = user.role;
    // console.log(role)
    // console.log("------------------")
    const linkList = LINKS_BY_ROLE.filter((oneLink) => oneLink.roleName === role)

    // console.log(linkList);

    return (
        <Drawer
            anchor="left"
            open={panelOpen}
            onClose={closePanel}
        >
            <List>
                <ListItem disablePadding>
                    {/*<NavLink to="/">Войти</NavLink>*/}
                    <ListItemButton variant="contained" onClick={() => closePanel()}>
                        <ListItemIcon>
                            <CloseIcon/>
                        </ListItemIcon>
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider/>

            <List>
                {linkList.map(({to, text}) => {
                    return (<ListItem key={to} disablePadding>
                        <ListItemButton to={to} variant="contained" component={RouterLink} onClick={() => closePanel()}>
                            <ListItemText primary={text}/>
                        </ListItemButton>
                    </ListItem>)
                })}
            </List>


        </Drawer>
    )


}