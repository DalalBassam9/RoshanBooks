"use client";
import React from "react";
import { Table, TableBody, TableCell, TableContainer, TablePagination, TableHead, Select, MenuItem, Stack, IconButton, Divider, TableRow, Paper, Box, Button, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import Swal from "sweetalert2";
import CircularProgress from '@mui/material/CircularProgress';
import VisibilityIcon from '@mui/icons-material/Visibility';
import moment from 'moment';
import axios from "axios";
import Layout from '../components/AdminLayout';
import useAuth from '../useAuth';
import Badge from '@mui/material/Badge';
import Chip from '@mui/material/Chip';

interface Order {
    map(arg0: (order: any) => React.JSX.Element): React.ReactNode;
    orderId: number;
    status: string;
    user: {
        firstName: string;
        lastName: string;
    };
    totalPrice: number;
}

type Orders = Order[];

export default function orders() {

    const [loading, setLoading] = React.useState(false);
    const [orders, setOrders] = React.useState<Orders>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);


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
                confirmButtonColor: '#D5A983'
            })

        } finally {
            setLoading(false);
        }
    };
    const handleStatusChange = async (event: React.ChangeEvent<{ value: unknown }>, orderId: number) => {

    };


    React.useEffect(() => {
        getOrders();
    }, [page, rowsPerPage]);
    return (
        <div>
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
                            <TextField size="small" label="Search" sx={{
                                '& label.Mui-focused': {
                                    color: '#D5A983',
                                    fontWeight: 'bold'
                                },
                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#D5A983', // Change the border color
                                },
                            }} />
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
                                            status
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
                                                    <TableCell align="left">
                                                      
                                                        <Chip label={order.status} />

                                                    </TableCell>
                                                    <TableCell align="left">{order.user.firstName}{order.user.lastName}</TableCell>
                                                    <TableCell align="left">{order.totalPrice} JD</TableCell>
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
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <CircularProgress style={{ color: '#D5A983' }} />
                    </div>
                )}

            </Layout>
        </div>


    )
}
