import React, {useState} from 'react';
import Container from "@mui/material/Container";
import UploadUsers from "./upload/UploadUsers";
import UploadThemes from "./upload/UploadThemes";
import UploadLecturers from "./upload/UploadLecturers";
import UploadDownloadExamples from "./UploadDownloadExamples";


const UploadPage = () => {



    return (
        <>
            <Container maxWidth={"md"}>
                <UploadDownloadExamples/>
                <UploadUsers/>
                <UploadThemes/>
                <UploadLecturers/>
            </Container>
        </>
    )
}

export default UploadPage