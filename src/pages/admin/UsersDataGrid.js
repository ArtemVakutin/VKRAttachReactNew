import React from 'react';
import {randomId} from "@mui/x-data-grid-generator";
import UsersDataGridTable from "./UsersDataGridTable";
import {useRouteLoaderData} from "react-router-dom";
import {ROLES} from "../../constants/SimpleConstants";


export const UsersDataGrid = (props) => {
    const {faculties, years, ranks, rankTypes, userPositions, departments} = useRouteLoaderData("layout")
    const {role} = props;

    let columns;

    if (role === "USER") {
        columns = [
            {
                field: 'id',
                headerName: 'ID',
                width: 60,
                editable: false
            },
            {
                field: 'login',
                headerName: 'Логин',
                flex: 130,
                minWidth: 130,
                align: 'left',
                headerAlign: 'left',
                editable: true,
            },

            {
                field: 'surname',
                headerName: 'Фамилия',
                flex: 180,
                minWidth: 180,
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
                flex: 180,
                minWidth: 180,
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
                minWidth: 180,
                align: 'left',
                headerAlign: 'left',
                type: "singleSelect",
                valueOptions: faculties,
                editable: true
            },
            {
                field: 'year',
                headerName: 'Год набора',
                width: 100,
                align: 'left',
                headerAlign: 'left',
                type: "singleSelect",
                valueOptions: years,
                editable: true
            },
            {
                field: 'password',
                headerName: 'Пароль (текущий не отображается)',
                width: 90,
                align: 'left',
                headerAlign: 'left',
                editable: true,
            },
            {
                field: 'rank',
                headerName: 'Звание',
                flex: 100,
                minWidth: 100,
                align: 'left',
                headerAlign: 'left',
                type: "singleSelect",
                valueOptions: ranks,
                editable: true
            },
            {
                field: 'rankType',
                headerName: 'Вид звания',
                flex: 100,
                minWidth: 100,
                align: 'left',
                headerAlign: 'left',
                type: "singleSelect",
                valueOptions: rankTypes,
                editable: true
            },
            {
                field: 'position',
                headerName: 'Вид звания',
                flex: 100,
                minWidth: 100,
                align: 'left',
                headerAlign: 'left',
                type: "singleSelect",
                valueOptions: userPositions,
                editable: true
            },

            {
                field: 'email',
                headerName: 'E-mail',
                flex: 140,
                minWidth: 140,
                align: 'left',
                headerAlign: 'left',
                editable: true,
            },
            {
                field: 'telephone',
                headerName: 'Телефон',
                flex: 140,
                minWidth: 140,
                align: 'left',
                headerAlign: 'left',
                editable: true,
            },
            {
                field: 'role',
                headerName: 'Права доступа',
                flex: 100,
                minWidth: 100,
                align: 'left',
                headerAlign: 'left',
                type: "singleSelect",
                valueOptions: ROLES,
                editable: true
            },
        ]
    } else if (role === "MODERATOR") {
        columns = [{
            field: 'id',
            headerName: 'ID',
            width: 60,
            editable: false
        },
            {
                field: 'login',
                headerName: 'Логин',
                flex: 130,
                minWidth: 130,
                align: 'left',
                headerAlign: 'left',
                editable: true,
            },
            {
                field: 'department',
                headerName: 'Кафедра',
                flex: 130,
                minWidth: 130,
                align: 'left',
                headerAlign: 'left',
                type: "singleSelect",
                valueOptions: departments,
                editable: true
            },

            {
                field: 'password',
                headerName: 'Пароль',
                flex: 100,
                minWidth: 100,
                align: 'left',
                headerAlign: 'left',
                editable: true,
            },
            {
                field: 'role',
                headerName: 'Права доступа',
                flex: 100,
                minWidth: 100,
                align: 'left',
                headerAlign: 'left',
                type: "singleSelect",
                valueOptions: ROLES,
                editable: true
            },
        ]

    } else if (role === "ADMIN") {
        columns = [{
            field: 'id',
            headerName: 'ID',
            width: 60,
            editable: false
        },
            {
                field: 'login',
                headerName: 'Логин',
                flex: 130,
                minWidth: 130,
                align: 'left',
                headerAlign: 'left',
                editable: true,
            },

            {
                field: 'password',
                headerName: 'Пароль',
                flex: 100,
                minWidth: 130,
                align: 'left',
                headerAlign: 'left',
                editable: true,
            },
            {
                field: 'role',
                headerName: 'Права доступа',
                flex: 100,
                minWidth: 100,
                align: 'left',
                headerAlign: 'left',
                type: "singleSelect",
                valueOptions: ROLES,
                editable: true
            },
        ]

    }


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
            rank: '',
            rankType: '',
            position: '',
            yearOfRecruitment: '',
            role: role,
            password: '',
            isNew: true
        }
    }

    return <UsersDataGridTable getNewRow={getNewRow} dataGridColumns={columns} {...props}/>

}

export default UsersDataGrid;