import React, {useState} from 'react';
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';

import Box from "@mui/material/Box";
import UploadDataDialog from "./UploadDataDialog";


const UploadUsers = () => {

    const [openUsersAdd, setOpenUsersAdd] = useState(false);

        return (
            <>
                <Container maxWidth={"md"}>
                    <Box sx={{
                        marginTop: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        gap: '10px',
                        border: 1,
                        borderRadius: 2,
                        p: 2
                    }}>
                        <Button size="large" variant="contained" onClick={() => setOpenUsersAdd(true)}>
                            <AddIcon/>Добавить пользователей из файла Excel
                        </Button>

                        <UploadDataDialog onClose={() => setOpenUsersAdd(false)} open={openUsersAdd}
                                          uploadType="users"/>

                    </Box>


                </Container>
            </>
        )
    }



export default UploadUsers