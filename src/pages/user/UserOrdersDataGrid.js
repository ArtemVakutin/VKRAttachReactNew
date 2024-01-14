import React from 'react';
import {REQUEST_STATUS} from "../../constants/SimpleConstants";
import UserOrdersDataGridTable from "./UserOrdersDataGridTable";

export const UserOrdersDataGrid = (props) => {

    const {lecturers} = props

    const columns = [
        {
            field: 'requestStatus',
            headerName: 'Статус заявки',
            width: 120,
            align: 'left',
            headerAlign: 'left',
            type: "singleSelect",
            valueOptions: REQUEST_STATUS,
            editable: true,
        },
        {
            field: 'id',
            headerName: 'ID',
            hideable: false,
            width: 50,
            editable: false
        },
        {
            field: 'userId',
            headerName: 'userId',
            hideable: false,
            width: 50,
            editable: false
        },
        {
            field: 'userName',
            headerName: 'ФИО обучающегося',
            flex: 180,
            minWidth: 180,
            align: 'left',
            headerAlign: 'left',
            editable: false,
        },
        {
            field: 'group',
            headerName: 'Номер группы',
            flex: 130,
            minWidth: 140,
            align: 'left',
            headerAlign: 'left',
            editable: false,
        },
        {
            field: 'themeId',
            headerName: 'ID темы',
            hideable: false,
            width: 50,
            align: 'left',
            headerAlign: 'left',
            editable: false
        },
        {
            field: 'themeName',
            headerName: 'Тема',
            flex: 300,
            minWidth: 300,
            align: 'left',
            headerAlign: 'left',
            editable: false
        },
        {
            field: 'lecturerName',
            headerName: 'Научный руководитель',
            flex: 150,
            minWidth: 150,
            align: 'left',
            headerAlign: 'left',
            editable: false
        },
        {
            field: 'department',
            headerName: 'Кафедра',
            flex: 100,
            align: 'left',
            headerAlign: 'left',
            editable: false,
        },
        {
            field: 'comment',
            headerName: 'Комментарий',
            flex: 150,
            minWidth: 100,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
    ]


    return <UserOrdersDataGridTable dataGridColumns={columns} {...props}/>

}

export default UserOrdersDataGrid;