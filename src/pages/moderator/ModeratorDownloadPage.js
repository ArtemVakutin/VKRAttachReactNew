import React, {useContext} from 'react';
import Container from "@mui/material/Container";
import DownloadOrdersPage from "../admin/DownloadOrdersPage";
import {AuthContext} from "../../context/Contexts";


const ModeratorDownloadPage = () => {
    const {user} = useContext(AuthContext)
    const {department} = user


    return (
        <>
            <Container maxWidth={"md"}>
                <DownloadOrdersPage departmentInitial={department}/>
            </Container>
        </>
    )

}


export default ModeratorDownloadPage