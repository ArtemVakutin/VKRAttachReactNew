import * as React from 'react';
import {useEffect} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import CheckIcon from '@mui/icons-material/Check';
import {
    GridActionsCellItem,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarFilterButton,
} from '@mui/x-data-grid';
import Container from "@mui/material/Container";
import axios from "axios";
import {ORDER_URL} from "../../constants/LinkConstants";
import Alert from "@mui/material/Alert";
import ErrorDialog from "../components/ErrorDialog";
import DeleteDialog from "../components/DeleteDialog";
import OrdersStyledDataGrid from "../admin/vrem/OrdersStyledDataGrid";
import AddOrderByUserDialog from "./AddOrderByUserDialog";

//Верхняя панелька
function EditToolbar({openAddOrderDialog}) {

    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton/>
            <GridToolbarFilterButton/>
            <GridToolbarDensitySelector/>
            <Button color="primary" variant="contained" startIcon={<AddIcon/>} onClick={openAddOrderDialog}>
                <b>Добавить заявку</b>
            </Button>
        </GridToolbarContainer>
    );
}

//Вся таблица
export default function UserOrdersDataGridTable({dataGridColumns, initialRows}) {

    const [rows, setRows] = React.useState([]);
    const [rowModesModel, setRowModesModel] = React.useState({});
    const [error, setError] = React.useState("");
    const [errorDialog, setErrorDialog] = React.useState(false);
    const [deleteDialog, setDeleteDialog] = React.useState(false);
    const [addOrderDialog, setAddOrderDialog] = React.useState(false);
    const [rowDel, setRowDel] = React.useState({});

    const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
        id: false,
        userId: false,
        themeId: false,
        lecturerId: false
    });

    useEffect(() => {
        setRows(initialRows)
    }, [initialRows])

    const openErrorDialog = () => {
        setErrorDialog(() => !errorDialog)
    };

    const openAddOrderDialog = () => {
        setAddOrderDialog(!addOrderDialog)
    };

    const openDeleteDialog = () => {
        setDeleteDialog(() => !deleteDialog)
    };

    //Удаляет запись
    const handleDeleteClick = (id) => async () => {
        const [row] = rows.filter((row) => row.id == id)
        const data = {
            id: row.id, label: ` заявку:
             ФИО обучающегося: ${row.userName},
        № Группы: ${row.group}, кафедра: ${row.department}, название темы: ${row.themeName}`
        }
        setRowDel(data)
        setDeleteDialog(() => !deleteDialog)
    };

    //Удаляет запись
    const handleAcceptDeleteClick = (id) => () => {
        const config = {params: {id}}
        axios.delete(ORDER_URL, config).then(
            () => {
                setRows(rows.filter((row) => row.id !== id));
                setDeleteDialog(false)
                setError("")
            }).catch(err => {
            if (err.response) {
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
                setError("Невозможно удалить заявку")
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
            headerName: 'Действия',
            width: 100,
            cellClassName: 'actions',
            getActions: ({row}) => {
                if (row.requestStatus === "ACCEPTED") {
                    return [<GridActionsCellItem
                        icon={<CheckIcon/>}
                        label="Registered"
                        onClick={() => {
                            setError("Заявка уже зарегистрирована. Удалить заявку может только представитель кафедры")
                            openErrorDialog()
                        }}
                        color="inherit"
                    />]
                }
                return [
                    <GridActionsCellItem
                        icon={<DeleteIcon/>}
                        label="Delete"
                        onClick={handleDeleteClick(row.id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    const columns = [...actionsColumn, ...rowIndexColumn, ...dataGridColumns]

    return (
        <Container maxWidth="false">
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
                <OrdersStyledDataGrid
                    rows={rows}
                    columns={columns}
                    editMode="row"
                    rowModesModel={rowModesModel}
                    columnVisibilityModel={columnVisibilityModel}
                    onColumnVisibilityModelChange={(newModel) =>
                        setColumnVisibilityModel(newModel)}
                    slots={{
                        toolbar: EditToolbar
                    }}
                    slotProps={{
                        toolbar: {openAddOrderDialog},
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
            <AddOrderByUserDialog open={addOrderDialog} onClose={openAddOrderDialog} rows={rows} setRows={setRows}
                                  handleAccept={Function.prototype}/>
            <ErrorDialog open={errorDialog} onClose={openErrorDialog} error={error}/>
        </Container>
    );
}