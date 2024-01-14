import React from 'react';
import {REQUEST_STATUS} from "../../constants/SimpleConstants";
import OrdersDataGridTable from "./OrdersDataGridTable";

export const OrdersDataGrid = (props) => {

    const {lecturers} = props

    const empty = [{value: "", label: "Отсутствует"}];
    const  lecturersList = [...empty, ...lecturers]


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
            minWidth: 200,
            align: 'left',
            headerAlign: 'left',
            editable: false,
        },
        {
            field: 'group',
            headerName: 'Номер группы',
            flex: 130,
            minWidth: 130,
            align: 'left',
            headerAlign: 'left',
            editable: false,
        },
        {
            field: 'themeId',
            headerName: 'ID темы',
            width: 60,
            align: 'left',
            headerAlign: 'left',
            editable: false
        },
        {
            field: 'themeName',
            headerName: 'Тема',
            flex: 250,
            minWidth: 250,
            align: 'left',
            headerAlign: 'left',
            editable: false
        },
        {
            field: 'lecturerId',
            headerName: 'Научный руководитель',
            flex: 200,
            minWidth: 200,
            type: "singleSelect",
            valueOptions: lecturersList,
            editable: true
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
            flex: 130,
            minWidth: 130,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
    ]


    return <OrdersDataGridTable dataGridColumns={columns} {...props}/>

}

export default OrdersDataGrid;