"use client";
import React from "react";
import { Table, TableBody, TableCell, TableContainer, TablePagination, TableHead, Select, MenuItem,Stack, IconButton, Divider, TableRow, Paper, Box, Button, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import Swal from "sweetalert2";
import EditIcon from "@mui/icons-material/Edit";
import CircularProgress from '@mui/material/CircularProgress';
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import VisibilityIcon from '@mui/icons-material/Visibility';
import moment from 'moment';
import axios from "axios";
import Layout from '../components/Layout';

interface Order {
    id: number;
    status: string;
    // Add other properties as needed
}

interface OrdersTableProps {
    orders: Order[];
}

export default function orders() {

    const [loading, setLoading] = React.useState(false);
    const [orders, setOrders] = React.useState([]);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [successMessage, setSuccessMessage] = React.useState('');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [localOrders, setLocalOrders] = React.useState<Order[]>(orders);


    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const getOrders = async () => {
        try {
            setLoading(true);
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/api/admin/orders?page=${page + 1}&per_page=${rowsPerPage}`
            );
            setOrders(response.data.data);
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message || error.message,
            })

        } finally {
            setLoading(false);
        }
    };
    const handleStatusChange = async (event: React.ChangeEvent<{ value: unknown }>, orderId: number) => {
        const newStatus = event.target.value as string;

        // Update the status in the local state
        const updatedOrders = localOrders.map(order => {
            if (order.orderId === orderId) {
                return { ...order, status: newStatus };
            }
            return order;
        });

        // Update the orders state
        setLocalOrders(updatedOrders);

        // Send a request to the Laravel API to update the status
        try {
            await axios.put(`https://your-api-url/orders/${orderId}`, { status: newStatus });
        } catch (error) {
            console.error('Failed to update order status:', error);
        }
    };


    React.useEffect(() => {
        getOrders();
    }, [page, rowsPerPage]);
    return (
        <div className="bgcolor">
            <Layout>

                {orders.length > 0 && (
                    <Paper sx={{ width: "98%", overflow: "hidden", padding: "12px" }}>
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            sx={{ padding: "20px" }}
                        >
                            Orders List
                        </Typography>
                        <Divider />
                        <Box height={10} />
                        <Stack direction="row" spacing={2} className="my-2 mb-2">
                            <TextField size="small" label="Search" />
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ flexGrow: 1 }}
                            ></Typography>

                        </Stack>
                        <Box height={10} />
                        <TableContainer>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left" style={{ minWidth: "100px" }}>
                                            ID
                                        </TableCell>
                                        <TableCell align="left" style={{ minWidth: "100px" }}>
                                            Status
                                        </TableCell>
                                        <TableCell align="left" style={{ minWidth: "100px" }}>
                                            User
                                        </TableCell>
                                        <TableCell align="left" style={{ minWidth: "100px" }}>
                                            Total Price
                                        </TableCell>
                                        <TableCell align="left" style={{ minWidth: "100px" }}>
                                            CreateAt
                                        </TableCell>
                                        <TableCell align="left" style={{ minWidth: "100px" }}>
                                            UpdateAt
                                        </TableCell>
                                        <TableCell align="left" style={{ minWidth: "100px" }}>
                                            Action
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orders
                                        .map
                                        ((order: any) => {
                                            return (
                                                <TableRow
                                                    hover
                                                    role="checkbox"
                                                    tabIndex={-1}
                                                    key={order.orderId}
                                                >
                                                    <TableCell align="left">{order.orderId}</TableCell>
                                                    <TableCell align="left">{order.status}</TableCell>
                                                    <TableCell align="left">{order.user.firstName}{order.user.lastName}</TableCell>
                                                    <TableCell align="left">{order.totalPrice}</TableCell>
                                                    <TableCell align="left">{moment(order.created_at).format("DD MMM YYYY hh:mm A")}</TableCell>
                                                    <TableCell align="left">{moment(order.updated_at).format("DD MMM YYYY hh:mm A")}</TableCell>

                                                    <TableCell align="left">
                                                        <Stack spacing={2} direction="row">

                                                            <VisibilityIcon
                                                                style={{
                                                                    marginTop: "10px",
                                                                    fontSize: "20px",
                                                                    color: "primary",
                                                                    cursor: "pointer",
                                                                }}
                                                                className="cursor-pointer"

                                                            />
                                                            <Select
                                                                value={order.status}
                                                                onChange={(event: any) => handleStatusChange(event, setStuts)}
                                                            >
                                                                <MenuItem value={'pending'}>Pending</MenuItem>
                                                                <MenuItem value={'Shipped'}>Shipped</MenuItem>
                                                                <MenuItem value={'Delivered'}>Delivered</MenuItem>
                
                                                            </Select>
                                                        </Stack>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={orders.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />


                        </TableContainer>

                    </Paper>
                )
                }
                {loading && (
                    <div className="flex justify-center items-center">
                        <CircularProgress />
                    </div>
                )}

            </Layout>
        </div>


    )
}
