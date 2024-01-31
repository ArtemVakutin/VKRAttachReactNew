import React, {useContext} from "react";
import LecturersPage from "../admin/LecturersPage";
import {AuthContext} from "../../context/Contexts";

export const LecturersModeratorPage = () => {

    const {user} = useContext(AuthContext)

    return <LecturersPage departmentInitial={user.department} role={"MODERATOR"}/>
}

export default LecturersModeratorPage;