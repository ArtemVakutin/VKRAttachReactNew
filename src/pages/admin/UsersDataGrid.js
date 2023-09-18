import React from 'react';
import {randomId} from "@mui/x-data-grid-generator";
import UsersDataGridTable from "./UsersDataGridTable";
import {useRouteLoaderData} from "react-router-dom";
import {ROLES} from "../../constants/SimpleConstants";


export const UsersDataGrid = (props) => {
    const {faculties, years} = useRouteLoaderData("layout")

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 60,
            editable: false
        },
        {
            field: 'login',
            headerName: 'Логин',
            width: 130,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },

        {
            field: 'surname',
            headerName: 'Фамилия',
            flex: 180,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
        {
            field: 'name',
            headerName: 'Имя',
            flex: 150,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
        {
            field: 'patronymic',
            headerName: 'Отчество',
            flex: 180,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
        {
            field: 'email',
            headerName: 'E-mail',
            flex: 140,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
        {
            field: 'telephone',
            headerName: 'Телефон',
            flex: 140,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
        {
            field: 'group',
            headerName: 'Группа',
            width: 70,
            align: 'left',
            headerAlign: 'left',
            editable: true,
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
        {
            field: 'role',
            headerName: 'Права доступа',
            width: 100,
            align: 'left',
            headerAlign: 'left',
            type: "singleSelect",
            valueOptions: ROLES,
            editable: true
        },
        {
            field: 'password',
            headerName: 'Пароль',
            width: 90,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        }]

    const getId = () => randomId();

    const getNewRow = () => {
        return {
            id: randomId(),
            login: '',
            surname: '',
            name: '',
            patronymic: '',
            email: '',
            faculty: '',
            yearOfRecruitment: '',
            role: 'USER',
            password: '',
            isNew: true
        }
    }

    return <UsersDataGridTable getNewRow={getNewRow} dataGridColumns={columns} {...props}/>

}

export default UsersDataGrid;