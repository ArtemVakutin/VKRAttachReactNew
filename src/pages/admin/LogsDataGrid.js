import React, {useContext} from 'react';
import {randomId} from "@mui/x-data-grid-generator";
import {AuthContext} from "../../context/Contexts";
import ConfigDataGridTable from "./ConfigDataGridTable";
import {CONFIG_TYPES} from "../../constants/SimpleConstants";
import LogsDataGridTable from "./LogsDataGridTable";


export const LogsDataGrid = (props) => {

    const columns = [
        {
            field: 'logName',
            headerName: 'Имя файла',
            flex: 150,
            minWidth: 150,
            align: 'left',
            headerAlign: 'left',
            editable: false,
        },
        {
            field: 'logTime',
            headerName: 'Дата создания',
            flex: 150,
            minWidth: 150,
            align: 'left',
            headerAlign: 'left',
            editable: false,
        }
    ]

    return <LogsDataGridTable dataGridColumns={columns} {...props}/>

}

export default LogsDataGrid;