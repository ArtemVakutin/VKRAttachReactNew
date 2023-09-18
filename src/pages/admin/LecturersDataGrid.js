import React, {useContext} from 'react';
import {randomId} from "@mui/x-data-grid-generator";
import {useRouteLoaderData} from "react-router-dom";
import LecturersDataGridTable from "./LecturersDataGridTable";
import {AuthContext} from "../../context/Contexts";


export const LecturersDataGrid = (props) => {
    const {departments, ranks, academicDegrees, academicTitles} = useRouteLoaderData("layout")

    const {user} = useContext(AuthContext)

    console.info(user)
    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 60,
            editable: false
        },
        {
            field: 'surname',
            headerName: 'Фамилия',
            flex: 200,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
        {
            field: 'name',
            headerName: 'Имя',
            flex: 200,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
        {
            field: 'patronymic',
            headerName: 'Отчество',
            flex: 200,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
        {
            field: 'email',
            headerName: 'Электронная почта',
            flex: 200,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
        {
            field: 'telephone',
            headerName: 'Телефон',
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
            field: 'academicDegree',
            headerName: 'Ученая степень',
            flex: 150,
            align: 'left',
            headerAlign: 'left',
            type: "singleSelect",
            valueOptions: academicDegrees,
            editable: true
        },
        {
            field: 'academicTitle',
            headerName: 'Ученое звание',
            flex: 150,
            align: 'left',
            headerAlign: 'left',
            type: "singleSelect",
            valueOptions: academicTitles,
            editable: true
        },
        {
            field: 'rank',
            headerName: 'Специальное звание',
            flex: 150,
            align: 'left',
            headerAlign: 'left',
            type: "singleSelect",
            valueOptions: ranks,
            editable: true
        },

    ]

    const getId = () => randomId();

    const getNewRow = () => {
        return {
            id: randomId(),
            surname: 'adafdafasdfa',
            name: '',
            patronymic: '',
            email: '',
            telephone: '',
            department: user.role==="ADMIN"? "": user.login,
            academicDegree: 'NONE',
            academicTitle: 'NONE',
            rank: 'NONE',
            isNew: true
        }
    }

    return <LecturersDataGridTable getNewRow={getNewRow} dataGridColumns={columns} {...props}/>

}

export default LecturersDataGrid;