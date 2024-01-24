"use client";
import React from "react";
import { Table, TableBody, TableCell, TableContainer, TablePagination, TableHead, Select, MenuItem, Stack, IconButton, Divider, TableRow, Paper, Box, Button, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import Swal from "sweetalert2";
import CircularProgress from '@mui/material/CircularProgress';
import moment from 'moment';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import Layout from '../components/AdminLayout';
import useAuth from '../useAuth';

interface User {
    userId: any;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

type Users =  User[];
export default function Users() {

    const [loading, setLoading] = React.useState(false);
    const [users, setUsers] = React.useState<Users>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);


    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const getUsers = async () => {
        try {
            setLoading(true);
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/api/admin/users?page=${page + 1}&per_page=${rowsPerPage}`
            );
            setUsers(response.data.data);
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
   


    React.useEffect(() => {
        getUsers();
    }, [page, rowsPerPage]);
    return (
        <div>
            <Layout>

                {users.length > 0 && (
                    <Paper sx={{ width: "98%", overflow: "hidden", padding: "12px" }}>
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            sx={{ padding: "20px" }}
                        >
                            Users List
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
                                            First Name
                                        </TableCell>
                                        <TableCell align="left" style={{ minWidth: "100px" }}>
                                            Last Name
                                        </TableCell>
                                        <TableCell align="left" style={{ minWidth: "100px" }}>
                                            Email
                                        </TableCell>
                                        <TableCell align="left" style={{ minWidth: "100px" }}>
                                            phone
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
                                    {users
                                        .map
                                        ((user: any) => {
                                            return (
                                                <TableRow
                                                    hover
                                                    role="checkbox"
                                                    tabIndex={-1}
                                                    key={user.userId}
                                                >
                                                    <TableCell align="left">{user.userId}</TableCell>
                                                    <TableCell align="left">{user.firstName}</TableCell>
                                                    <TableCell align="left">{user.lastName}</TableCell>
                                                    <TableCell align="left">{user.email}</TableCell>
                                                    <TableCell align="left">{user.phone}</TableCell>
                                                    <TableCell align="left">{moment(user.created_at).format("DD MMM YYYY hh:mm A")}</TableCell>
                                                    <TableCell align="left">{moment(user.updated_at).format("DD MMM YYYY hh:mm A")}</TableCell>

                                                    <TableCell align="left">
                                                    <Stack spacing={2} direction="row">
                                                            <EditIcon
                                                                style={{
                                                                    fontSize: "20px",
                                                                    marginTop: "10px",
                                                                    color: "primary",
                                                                    cursor: "pointer",
                                                                }}
                                                                className="cursor-pointer"
                                                                
                                                            />
                                                            <IconButton
                                                             
                                                            >
                                                                    <DeleteIcon
                                                                    />
                                                            </IconButton>
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
                                count={users.length}
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
