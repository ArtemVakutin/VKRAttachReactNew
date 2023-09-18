import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
    return {name, calories, fat, carbs, protein};
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable(props) {
    const {tableData} = props;
    // const columns = Object.keys(tableData[0])
    const rows = tableData.map(data => Object.values(data))
    console.log(rows)
    const rows1 = rows.map(data => data.filter(simpleObj => (simpleObj != null))
        .filter(simpleObj => (simpleObj !== ""))
        .map(simpleObj=><TableCell align="left">{simpleObj}</TableCell>))
    console.log(rows1)
    const row = rows1[1]
    const row2 = rows1.map((data,index) => <TableRow key={index}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>{data}</TableRow>)
    // const rows2 = rows1.reduce((prev, curr) => [prev, "", curr])
    // console.log(rows2)
    // const rows3 = rows1.map.map(row => <TableRow>{row}</TableRow>).reduce((prev, curr) => [prev, "", curr])
    // console.log(rows3)




    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} size="small" aria-label="a dense table">
                {/*<TableHead>*/}

                {/*</TableHead>*/}
                <TableBody>
                    {row2}
                </TableBody>
            </Table>
        </TableContainer>
    );
}