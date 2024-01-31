import React, {useContext} from 'react';
import {randomId} from "@mui/x-data-grid-generator";
import {AuthContext} from "../../context/Contexts";
import ConfigDataGridTable from "./ConfigDataGridTable";
import {CONFIG_TYPES} from "../../constants/SimpleConstants";


export const ConfigDataGrid = (props) => {
    const {initialRows, type} = props
    const {configTypes} = CONFIG_TYPES
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
            field: 'type',
            headerName: 'Вид настройки',
            flex: 150,
            minWidth: 150,
            align: 'left',
            headerAlign: 'left',
            type: "singleSelect",
            valueOptions: configTypes,
            editable: false
        },
        {
            field: 'value',
            headerName: 'Название (сокращенное)',
            flex: 150,
            minWidth: 150,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
        {
            field: 'label',
            headerName: 'Надпись (для селекторов и рапортов)',
            flex: 250,
            minWidth: 150,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        }
    ]

    const getNewRow = () => {
        return {
            id: randomId(),
            type,
            value: '',
            label: '',
            isNew: true
        }
    }

    return <ConfigDataGridTable getNewRow={getNewRow} dataGridColumns={columns} {...props}/>

}

export default ConfigDataGrid;