import React, {useContext} from "react";
import {AuthContext} from "../../context/Contexts";
import ThemesPage from "../admin/ThemesPage";

export const ThemesModeratorPage = () => {

    const {user} = useContext(AuthContext)

    return <ThemesPage departmentInit={user.login} role={"MODERATOR"}/>
}

export default ThemesModeratorPage;