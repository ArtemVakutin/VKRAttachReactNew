import * as React from 'react';
import {useEffect} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import {
    DataGrid,
    GridActionsCellItem,
    GridRowEditStopReasons,
    GridRowModes,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarFilterButton,
} from '@mui/x-data-grid';
import Container from "@mui/material/Container";
import axios from "axios";
import {CONFIG_URL, DOWNLOAD_URL, LOGS_URL} from "../../constants/LinkConstants";
import Alert from "@mui/material/Alert";
import ErrorDialog from "../components/ErrorDialog";
import DeleteDialog from "../components/DeleteDialog";
import DownloadIcon from '@mui/icons-material/Download';
import fileDownload from "js-file-download";

//Верхняя панелька
function EditToolbar({getNewRow, setRows, setRowModesModel}) {

    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton/>
            <GridToolbarFilterButton/>
            <GridToolbarDensitySelector/>
        </GridToolbarContainer>
    );
}

//Вся таблица
export default function LogsDataGridTable({dataGridColumns, initialRows}) {
    const [rows, setRows] = React.useState([]);
    const [rowModesModel, setRowModesModel] = React.useState({});
    const [error, setError] = React.useState("");
    const [errorDialog, setErrorDialog] = React.useState(false);
    const [deleteDialog, setDeleteDialog] = React.useState(false);
    const [rowDel, setRowDel] = React.useState({});
    const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
        id: false,
    });

    useEffect(() => {
        const setRowsToState = () => setRows(initialRows)
        setRowsToState()
    }, [initialRows])

    const openErrorDialog = () => {
        setErrorDialog(() => !errorDialog)
    };

    const openDeleteDialog = () => {
        setDeleteDialog(() => !deleteDialog)
    };

    //Удаляет запись
    const handleDeleteClick = (id) => () => {
        const [row] = rows.filter((row) => row.logName === id)
        const data = {
            id, label: `${row.logName} ${row.logTime}         
        УДАЛЕНИЕ ПИШУЩЕГОСЯ ЛОГ-ФАЙЛА ВЫДАСТ ОШИБКУ`
        }
        setRowDel(data)
        setDeleteDialog(() => !deleteDialog)
    };

    //Удаляет запись
    const handleAcceptDeleteClick = (id) => () => {
        const config = {params: {fileName: id}}
        axios.delete(LOGS_URL, config).then(
            () => {
                setRows(rows.filter((row) => row.logName !== id));
                setDeleteDialog(false)
                setError("")
            }).catch(err => {
            if (err.response) {
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
                setError("Невозможно удалить файл")
                openErrorDialog()
            } else if (err.request) {
                console.log((err.response.data))
                setError("сервер недоступен" + err.response.data)
                openErrorDialog()
            } else {
                console.log(err)
                setError("Что-то пошло не так" + err.response)
                openErrorDialog()
            }
        })
        setDeleteDialog(false)
    }

    const handleDownloadClick = (id) => () => {
        const logName = rows.filter((row) => row.logName === id)[0].logName
        const config = {
            responseType: 'arraybuffer',
            params: {
                fileName: logName
            }
        }
        axios.get(`${LOGS_URL}/get`, config).then(response => {
            setError("")
            const match = response.headers['content-disposition'].match(/filename=(.+)/);
            const filename = match && match[1] ? match[1] : 'logs';
            fileDownload(response.data, filename);
        }).catch(ex => {
            if (ex.response) {
                console.log(ex.response.data);
                console.log(ex.response.status);
                console.log(ex.response.headers);
                setError("Загрузка файла не удалась")
                openErrorDialog()

            } else if (ex.request) {
                console.log("SERVER IS NOT AVAILABLE");
                setError("Сервер не отвечает")
                openErrorDialog()
            } else {
                setError("Что-то в этом мире пошло не так")
                openErrorDialog()
            }
        })

    }

    //Срабатывает в конце изменения модельки
    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const actionsColumn = [
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({id}) => {

                return [
                    <GridActionsCellItem
                        icon={<DownloadIcon/>}
                        label="Скачать"
                        className="textPrimary"
                        onClick={handleDownloadClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon/>}
                        label="Удалить"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />
                ];
            },
        },
    ];

    const columns = [...actionsColumn, ...dataGridColumns]

    return (
        <Container maxWidth="md">
            <Box mt={3}
                 sx={{
                     // minHeight: 500,
                     width: '100%',
                     '& .actions': {
                         color: 'text.secondary',
                     },
                     '& .textPrimary': {
                         color: 'text.primary',
                     },
                 }}
            >
                <DataGrid
                    rows={rows}
                    columns={columns}
                    editMode="row"
                    getRowId={(row) => row.logName}
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={handleRowModesModelChange}
                    columnVisibilityModel={columnVisibilityModel}
                    onColumnVisibilityModelChange={(newModel) =>
                        setColumnVisibilityModel(newModel)}
                    slots={{
                        toolbar: EditToolbar
                    }}
                    slotProps={{
                        toolbar: {setRows, setRowModesModel},
                    }}
                    sx={{
                        '& .MuiDataGrid-columnHeader': {
                            backgroundColor: 'rgba(202,223,255,0.55)',
                        },
                        '& .MuiDataGrid-columnHeaderTitle': {
                            fontWeight: 'bold'
                        },
                    }}
                />
                {/*{error && <Alert severity="error">{error}</Alert>}*/}
            </Box>
            <DeleteDialog open={deleteDialog} onClose={openDeleteDialog} rowForDelete={rowDel}
                          handleAccept={handleAcceptDeleteClick}/>
            <ErrorDialog open={errorDialog} onClose={openErrorDialog} error={error}/>
        </Container>
    );
}