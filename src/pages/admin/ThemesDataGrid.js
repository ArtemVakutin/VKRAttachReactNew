import React, {useContext} from 'react';
import {randomId} from "@mui/x-data-grid-generator";
import {useRouteLoaderData} from "react-router-dom";
import ThemesDataGridTable from "./ThemesDataGridTable";
import {AuthContext} from "../../context/Contexts";


export const ThemesDataGrid = (props) => {
    const {user} = useContext(AuthContext)

    const {faculties, years, departments} = useRouteLoaderData("layout")

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 60,
            editable: false
        },
        {
            field: 'themeName',
            headerName: 'Название темы',
            flex: 200,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
        {
            field: 'department',
            headerName: 'Кафедра',
            flex: 150,
            align: 'left',
            headerAlign: 'left',
            type: "singleSelect",
            valueOptions: departments,
            editable: user.role==="ADMIN"
        },
        {
            field: 'faculty',
            headerName: 'Факультет',
            flex: 180,
            align: 'left',
            headerAlign: 'left',
            type: "singleSelect",
            valueOptions: faculties,
            editable: true
        },
        {
            field: 'yearOfRecruitment',
            headerName: 'Год набора',
            width: 100,
            align: 'left',
            headerAlign: 'left',
            type: "singleSelect",
            valueOptions: years,
            editable: true
        },
    ]

    const getId = () => randomId();

    const getNewRow = () => {
        return {
            id: randomId(),
            themeName: '',
            faculty: '',
            yearOfRecruitment: '',
            department: user.role === "ADMIN" ? "": user.login,
            isNew: true
        }
    }

    return <ThemesDataGridTable getNewRow={getNewRow} dataGridColumns={columns} {...props}/>

}

export default ThemesDataGrid;