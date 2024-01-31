import * as React from 'react';
import {useEffect} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
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
import {CONFIG_URL, LECTURER_URL} from "../../constants/LinkConstants";
import Alert from "@mui/material/Alert";
import ErrorDialog from "../components/ErrorDialog";
import DeleteDialog from "../components/DeleteDialog";
import EditOrderDialog from "../components/editdialogs/EditOrderDialog";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

//Верхняя панелька
function EditToolbar({getNewRow, setRows, setRowModesModel}) {

    //Добавляет пользователя
    const handleClick = () => {
        //Нужно, чтобы в табличке был всегда айдишник
        const newRow = getNewRow()
        setRows((oldRows) => [...oldRows, newRow]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [newRow.id]: {mode: GridRowModes.Edit, fieldToFocus: 'value'},
        }));
    };

    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton/>
            <GridToolbarFilterButton/>
            <GridToolbarDensitySelector/>
            <GridToolbarExport/>
            <Button color="primary" startIcon={<AddIcon/>} onClick={handleClick}>
                Добавить настройку
            </Button>
        </GridToolbarContainer>
    );
}

//Вся таблица
export default function ConfigDataGridTable({dataGridColumns, getNewRow, initialRows}) {
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

    //Отменить режим редактирования
    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    //Включает режим редактирования
    const handleEditClick = (id) => () => {
        setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.Edit}});
    };

    //Отключает
    const handleSaveClick = (id) => () => {
        console.log("handleSaveClick +++ " + id);
        setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.View}});
    };

    //Удаляет запись
    const handleDeleteClick = (id) => async () => {
        const [row] = rows.filter((row) => row.id === id)
        const data = {
            id: row.id, label: `${row.type} ${row.value} 
        ${row.label}
        ОСТОРОЖНО! ЭТО МОЖЕТ ПОВЛЕЧЬ НЕВОЗМОЖНОСТЬ ДОСТУПА К УЖЕ ЗАКРЕПЛЕННЫМ ЗАЯВКАМ, ТЕМАМ И ПРЕПОДАВАТЕЛЯМ С ТАКИМИ ДАННЫМИ`
        }
        setRowDel(data)
        setDeleteDialog(() => !deleteDialog)
    };

    //Удаляет запись
    const handleAcceptDeleteClick = (id) => () => {
        const config = {params: {id}}
        axios.delete(CONFIG_URL, config).then(
            () => {
                setRows(rows.filter((row) => row.id !== id));
                setDeleteDialog(false)
                setError("")
            }).catch(err => {
            if (err.response) {
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
                setError("Невозможно удалить настройку")
            } else if (err.request) {
                console.log((err.response.data))
                setError("сервер недоступен" + err.response.data)
            } else {
                console.log(err)
                setError("Что-то пошло не так" + err.response)
            }
        })
        setDeleteDialog(false)
    }


    //Отменяет режим редактирования
    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: {mode: GridRowModes.View, ignoreModifications: true},
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    //Срабатывает для любого обновления таблицы
    const processRowUpdate = async (newRow) => {
        let success = false;
        let newObj = newRow.isNew ? {...newRow, id: ""} : newRow;
        await axios.request({
            method: newRow.isNew ? "put" : "patch",
            url: CONFIG_URL,
            data: newObj
        }).then((resp) => {
            success = true
            newObj = newRow.isNew ? {...newObj, id: resp.data.id, isNew: false} : newObj;
            // newObj = newRow.isNew ? {...newObj,isNew: false} : newObj;
        })
            .catch(err => {
                if (err.response) {
                    console.log(err.response.data);
                    console.log(err.response.status);
                    console.log(err.response.headers);
                    err.response.status === 500 ? setError("Внутренняя ошибка сервера (смотри логи)") : setError(err.response.data.message)
                } else if (err.request) {
                    console.log((err.response.data))
                    setError("сервер недоступен" + err.response.data)
                } else {
                    console.log(err)
                    setError("Что-то пошло не так" + err.response)
                }
            });
        if (success) {
            // const updatedRow = {...newRow, isNew: false};
            setError("")
            setRows(rows.map((row) => (row.id === newRow.id ? newObj: row)));
            return newObj;
        } else {
            openErrorDialog()
            setRowModesModel({...rowModesModel, [newRow.id]: {mode: GridRowModes.Edit}});
        }
    };
    //Срабатывает в конце изменения модельки
    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const rowIndexColumn = [{
        field: 'rowindex',
        headerName: 'Номер',
        type: 'number',
        width: 60,
        renderCell: (index) => index.api.getRowIndexRelativeToVisibleRows(index.row.id) + 1,
        align: 'left',
        headerAlign: 'left',
        editable: false,
        filterable: false
    }]

    const actionsColumn = [
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({id}) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon/>}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon/>}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon/>}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon/>}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />
                ];
            },
        },
    ];

    const columns = [...actionsColumn, ...rowIndexColumn, ...dataGridColumns]

    return (
        <Container maxWidth="xl">
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
                    getRowId={(row) => row.id}
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={handleRowModesModelChange}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}
                    columnVisibilityModel={columnVisibilityModel}
                    onColumnVisibilityModelChange={(newModel) =>
                        setColumnVisibilityModel(newModel)}
                    slots={{
                        toolbar: EditToolbar
                    }}
                    slotProps={{
                        toolbar: {getNewRow, setRows, setRowModesModel},
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
                {error && <Alert severity="error">{error}</Alert>}
            </Box>
            <DeleteDialog open={deleteDialog} onClose={openDeleteDialog} rowForDelete={rowDel}
                          handleAccept={handleAcceptDeleteClick}/>
            <ErrorDialog open={errorDialog} onClose={openErrorDialog} error={error}/>
        </Container>
    );
}