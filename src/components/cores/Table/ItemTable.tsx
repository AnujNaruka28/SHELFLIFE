import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import type { Item } from "../../../types/Item";
import { Row } from "./Rows";

interface ItemTableProps {
    data: Item[];
    itemsLoading: boolean;
    itemsError: boolean;
}

const ItemTable = ({ data, itemsLoading, itemsError }: ItemTableProps) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const tableColumns = data.length > 0 ? Object.keys(data[0]) : [];

    return (
        <Paper sx={{ width: '100%', height: '100%' }}>
            <TableContainer sx={{ height: '80%' }}>
                <Table stickyHeader aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            {tableColumns.map((column) => (
                                <TableCell key={column}>{column}</TableCell>
                            ))}
                            {/* <TableCell align="right">Quantity</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Expiry Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Added By</TableCell>
                            <TableCell>Updated By</TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => (
                                <Row key={row._id} row={row} />
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination 
                className='h-[20%]'
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default ItemTable;