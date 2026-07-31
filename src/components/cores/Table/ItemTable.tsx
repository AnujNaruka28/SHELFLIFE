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
import Loader from '../../common/Loader';

interface ItemTableProps {
    data: Item[];
    itemsLoading: boolean;
    itemsError: boolean;
    onPageChange?: (page: number) => void;
    onRowsPerPageChange?: (limit: number) => void;
    currentPage?: number;
    currentLimit?: number;
    totalItems?: number;
    isInventory?: boolean;
    onSuccess?: () => void;
}

const ItemTable = ({ data, itemsLoading, itemsError, onPageChange, onRowsPerPageChange, currentPage, currentLimit, totalItems, isInventory = false, onSuccess }: ItemTableProps) => {
    const [page, setPage] = React.useState((currentPage || 1)-1);
    const [rowsPerPage, setRowsPerPage] = React.useState(currentLimit || 10);

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
        onPageChange?.(newPage + 1);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRowsPerPage = +event.target.value;
        setRowsPerPage(newRowsPerPage);
        setPage(0);
        onRowsPerPageChange?.(newRowsPerPage);
    };

    const tableColumns = ["Id", "Name", "Quantity", "Category", "Expiry","Status", "Added By", "Updated By", ...(isInventory ? ["Actions"] : [])];

    return (
        <Paper sx={{ width: '100%', height: '100%' }}>


            {
                itemsLoading ? (<Loader/>) : 
                itemsError ? (
                    <></> 
                ) : (
                    data.length > 0 ? (
                    
                    <> 
                        <TableContainer sx={{ height: '80%' }}>
                            <Table stickyHeader aria-label="collapsible table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell />
                                        {tableColumns.map((column) => (
                                            <TableCell key={column}>{column}</TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        data.map((row, index) => (
                                                <Row key={row._id} row={row} index={index+1} isInventory={isInventory} onSuccess={onSuccess} />
                                            ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination 
                            className='h-[20%]'
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={totalItems || 0}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        /> 
                    </>
                    ) : (
                        <div className='h-full flex items-center justify-center'>
                            No data available
                        </div>
                    )
                )
            }
        </Paper>
    );
};

export default ItemTable;