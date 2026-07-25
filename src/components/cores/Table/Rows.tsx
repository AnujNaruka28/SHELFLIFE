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

interface RowProps {
    row: Item;
}

export function Row(props: RowProps) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    const statusColors = {
        "fresh": "#22c55e",
        "expiring-soon": "#eab308",
        "expired": "#ef4444",
        "used": "#3b82f6",
        "wasted": "#6b7280"
    };
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
                    {row._id}
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
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}
