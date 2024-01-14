import React, {useContext} from 'react';
import {randomId} from "@mui/x-data-grid-generator";
import {useRouteLoaderData} from "react-router-dom";
import ThemesDataGridTable from "./ThemesDataGridTable";
import {AuthContext} from "../../context/Contexts";


export const ThemesDataGrid = (props) => {
    const {user} = useContext(AuthContext)
    const {departmentInit, yearInit, facultyInit} = props;

    const {faculties, years, departments} = useRouteLoaderData("layout")

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 50,
            editable: false
        },
        {
            field: 'themeName',
            headerName: 'Название темы',
            flex: 450,
            minWidth: 450,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
        {
            field: 'busy',
            headerName: 'Занято/свободно',
            flex: 60,
            minWidth: 60,
            align: 'left',
            headerAlign: 'left',
            valueFormatter: ({ value }) => value ? "ЗАНЯТО" : "",
            editable: false
        },
        {
            field: 'department',
            headerName: 'Кафедра',
            flex: 100,
            minWidth: 100,
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
            minWidth: 180,
            align: 'left',
            headerAlign: 'left',
            type: "singleSelect",
            valueOptions: faculties,
            editable: user.role === "ADMIN"
        },
        {
            field: 'year',
            headerName: 'Год набора',
            width: 70,
            align: 'left',
            headerAlign: 'left',
            type: "singleSelect",
            valueOptions: years,
            editable: user.role === "ADMIN"
        },
    ]

    const getId = () => randomId();

    const getNewRow = () => {
        return {
            id: randomId(),
            themeName: '',
            faculty: facultyInit,
            year: yearInit,
            department: user.role === "ADMIN" ? "": user.department,
            isNew: true
        }
    }

    return <ThemesDataGridTable getNewRow={getNewRow} dataGridColumns={columns} {...props}/>

}

export default ThemesDataGrid;