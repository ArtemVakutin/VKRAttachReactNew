import React, {useContext} from 'react';
import {randomId} from "@mui/x-data-grid-generator";
import {useRouteLoaderData} from "react-router-dom";
import LecturersDataGridTable from "./LecturersDataGridTable";
import {AuthContext} from "../../context/Contexts";


export const LecturersDataGrid = (props) => {
    const {departments, lecturerRanks, academicDegrees, academicTitles, rankTypes, lecturerPositions} = useRouteLoaderData("layout")

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
            flex: 170,
            minWidth: 170,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
        {
            field: 'name',
            headerName: 'Имя',
            flex: 150,
            minWidth: 150,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
        {
            field: 'patronymic',
            headerName: 'Отчество',
            flex: 150,
            minWidth: 150,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
        {
            field: 'email',
            headerName: 'Электронная почта',
            flex: 170,
            minWidth: 170,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
        {
            field: 'telephone',
            headerName: 'Телефон',
            flex: 170,
            minWidth: 100,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
        {
            field: 'department',
            headerName: 'Кафедра',
            flex: 150,
            minWidth: 150,
            align: 'left',
            headerAlign: 'left',
            type: "singleSelect",
            valueOptions: departments,
            editable: user.role==="ADMIN"
        },
        {
            field: 'academicDegree',
            headerName: 'Ученая степень',
            flex: 100,
            minWidth: 100,
            align: 'left',
            headerAlign: 'left',
            type: "singleSelect",
            valueOptions: academicDegrees,
            editable: true
        },
        {
            field: 'academicTitle',
            headerName: 'Ученое звание',
            flex: 100,
            minWidth: 100,
            align: 'left',
            headerAlign: 'left',
            type: "singleSelect",
            valueOptions: academicTitles,
            editable: true
        },
        {
            field: 'rank',
            headerName: 'Специальное звание',
            flex: 100,
            minWidth: 100,
            align: 'left',
            headerAlign: 'left',
            type: "singleSelect",
            valueOptions: lecturerRanks,
            editable: true
        },
        {
            field: 'rankType',
            headerName: 'Вид звания',
            flex: 80,
            minWidth: 80,
            align: 'left',
            headerAlign: 'left',
            type: "singleSelect",
            valueOptions: rankTypes,
            editable: true
        },
        {
            field: 'position',
            headerName: 'Должность',
            flex: 100,
            minWidth: 100,
            align: 'left',
            headerAlign: 'left',
            type: "singleSelect",
            valueOptions: lecturerPositions,
            editable: true
        },

    ]

    const getNewRow = () => {
        return {
            id: randomId(),
            surname: '',
            name: '',
            patronymic: '',
            email: '',
            telephone: '',
            department: user.role==="ADMIN"? "": user.department,
            academicDegree: '',
            academicTitle: '',
            rank: '',
            rankType: 'полиции',
            position: '',
            isNew: true
        }
    }

    return <LecturersDataGridTable getNewRow={getNewRow} dataGridColumns={columns} {...props}/>

}

export default LecturersDataGrid;