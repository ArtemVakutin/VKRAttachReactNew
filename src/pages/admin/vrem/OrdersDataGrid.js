import React from 'react';
import OrdersDataGridTable from "./OrdersDataGridTable";
import {REQUEST_STATUS} from "../../../constants/SimpleConstants";

export const OrdersDataGrid = (props) => {

    const columns = [
        {
            field: 'requestStatus',
            headerName: 'Статус заявки',
            width: 120,
            align: 'left',
            headerAlign: 'left',
            type: "singleSelect",
            valueOptions: REQUEST_STATUS,
            editable: false,
        },
        {
            field: 'id',
            headerName: 'ID',
            width: 60,
            editable: false
        },
        {
            field: 'userId',
            headerName: 'userId',
            width: 60,
            editable: false
        },
        {
            field: 'userName',
            headerName: 'ФИО обучающегося',
            flex: 200,
            align: 'left',
            headerAlign: 'left',
            editable: false,
        },
        {
            field: 'group',
            headerName: 'Номер группы',
            flex: 130,
            align: 'left',
            headerAlign: 'left',
            editable: false,
        },
        {
            field: 'themeId',
            headerName: 'themeId',
            width: 60,
            editable: false
        },
        {
            field: 'themeName',
            headerName: 'Название темы',
            flex: 200,
            align: 'left',
            headerAlign: 'left',
            editable: false,
        },
        {
            field: 'lecturerId',
            headerName: 'lecturerId',
            width: 60,
            editable: false
        },
        {
            field: 'lecturerName',
            headerName: 'ФИО преподавателя',
            flex: 200,
            align: 'left',
            headerAlign: 'left',
            editable: false,
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
            flex: 250,
            align: 'left',
            headerAlign: 'left',
            editable: false,
        },
    ]

    return <OrdersDataGridTable dataGridColumns={columns} {...props}/>

}

export default OrdersDataGrid;