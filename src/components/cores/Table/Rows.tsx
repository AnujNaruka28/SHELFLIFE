import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import type { Item } from "../../../types/Item";
import CTAButton from '../../common/CTAButton';
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { deleteItemByIdAction, updateItemStatusAction } from '../../../lib/actions/itemsAction';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../../lib/store';
import { FiCheck, FiX } from 'react-icons/fi';
import { useCallback } from 'react';
const useAppDispatch = () => useDispatch<AppDispatch>();

const LazyItemDialog = React.lazy(() => import('../../dialogs/ItemDialog'));
interface RowProps {
    row: Item;
    index: number;
    isInventory?: boolean;
    onSuccess?: () => void;
}

const statusColors = {
    "fresh": "#22c55e",
    "expiring-soon": "#eab308",
    "expired": "#ef4444",
    "used": "#3b82f6",
    "wasted": "#6b7280"
};

const Row = React.memo((props: RowProps) => {
    const { row, index, isInventory = false, onSuccess } = props;
    const [open, setOpen] = React.useState(false);
    const dispatch = useAppDispatch();

    const {user} = useSelector((state: any) => state.auth)
    
    const handleDelete = useCallback(async (id: string) => {
        const success = await dispatch(deleteItemByIdAction(id)) || false;
        if(success) {
            onSuccess?.();
        }
    }, [dispatch, onSuccess]);

    const handleStatusToggle = useCallback(async () => {
        const newStatus = row.status === "expired" ? "wasted" : "used";
        const success = await dispatch(updateItemStatusAction({ id: row._id, status: newStatus })) || false;
        if(success) {
            onSuccess?.();
        }
    }, [dispatch, onSuccess, row._id, row.status]);

    const isUsedOrWasted = row.status === "used" || row.status === "wasted";
    
    return (
        <React.Fragment>
            <TableRow sx={{ '& > .MuiTableCell-root': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {index}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.category.charAt(0).toUpperCase() + row.category.slice(1)}</TableCell>
                <TableCell>{new Date(row.expiryDate).toLocaleDateString()}</TableCell>
                <TableCell>
                    <span style={{ 
                        color: statusColors[row.status as keyof typeof statusColors],
                        fontWeight: 'bold'
                    }}>
                        {row.status.charAt(0).toUpperCase() + row.status.slice(1).replace("-", " ")}
                    </span>
                </TableCell>
                <TableCell>{row.addedBy?.name || "Unknown"}</TableCell>
                <TableCell>{row.updatedBy?.name || "Unknown"}</TableCell>

                {
                    isInventory &&
                    <TableCell>
                        <div className="flex items-center gap-2">

                            {
                                (user?.role === "admin" || row.addedBy?._id === user?._id) && ( 
                                    <>  
                                        <LazyItemDialog title="Edit Item" mode="edit" item={row} onSuccess={onSuccess}>
                                            <CTAButton
                                                reactNode={<FiEdit2 className="h-4 w-4" />}
                                                className="p-3 rounded-full"
                                            />
                                        </LazyItemDialog>
   
                                        <CTAButton
                                            reactNode={<FiTrash2 className="h-4 w-4" />}
                                            className="p-3 rounded-full bg-transparent hover:bg-destructive/10 text-destructive"
                                            onClick={() => handleDelete(row._id)}
                                        />
                                    </>
                                )
                            }


                            <button
                                onClick={handleStatusToggle}
                                disabled={isUsedOrWasted}
                                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                                    isUsedOrWasted
                                        ? row.status === 'used'
                                            ? 'bg-[var(--primary)] text-white cursor-default'
                                            : 'bg-red-500 text-white cursor-default'
                                        : 'bg-gray-200 hover:bg-gray-300 text-gray-400'
                                }`}
                                title={isUsedOrWasted ? row.status : 'Mark as used'}
                            >
                                {isUsedOrWasted ? (
                                    row.status === 'used' ? (
                                        <FiCheck className="h-4 w-4" />
                                    ) : (
                                        <FiX className="h-4 w-4" />
                                    )
                                ) : (
                                    <FiCheck className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                    </TableCell>
                }
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Details
                            </Typography>
                            <Table size="small" aria-label="details">
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Created At</TableCell>
                                        <TableCell>{new Date(row.createdAt).toLocaleString()}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Updated At</TableCell>
                                        <TableCell>{new Date(row.updatedAt).toLocaleString()}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Added By Email</TableCell>
                                        <TableCell>{row.addedBy?.email || "Unknown"}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Updated By Email</TableCell>
                                        <TableCell>{row.updatedBy?.email || "Unknown"}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Used By</TableCell>
                                        <TableCell>{row.usedBy?.name || "none"}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Wasted By</TableCell>
                                        <TableCell>{row.wastedBy?.name || "none"}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
});

export default Row;
