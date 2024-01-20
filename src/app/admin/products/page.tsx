"use client";
import Layout from '../components/AdminLayout';
import React from "react";
import { Table, TableBody, TableCell, TableContainer, TablePagination, TableHead, Stack, Skeleton, Divider, TableRow, Paper, Box, Button, IconButton, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import Swal from "sweetalert2";
import EditIcon from "@mui/icons-material/Edit";
import CircularProgress from '@mui/material/CircularProgress';
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import axios from "axios";
import moment from 'moment';
import Link from 'next/link';
import useAuth from '../useAuth';

export default function products() {
    const [loading, setLoading] = React.useState(false);
    const [loadingForDelete, setLoadingForDelete] = React.useState(false);
    const [products, setProducts] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);


    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const getProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/api/admin/products?page=${page + 1}&per_page=${rowsPerPage}`
            );
            setProducts(response.data.data);
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
        getProducts();
    }, [page, rowsPerPage]);


    const deleteProduct = (productId: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.value) {
                onDelete(productId);
            }
        });
    };


    const onDelete = async (productId: string) => {
        try {
            setLoadingForDelete(true);
            await axios.delete(process.env.NEXT_PUBLIC_API_URL + "/api/admin/products/" + productId);
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Product Deleted successfully',
            })
            getProducts();
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message || error.message,
            })
        } finally {
            setLoadingForDelete(false);
        }
    };

    return (
        <div >

            <Layout>

                {products.length > 0 && (
                    <Paper sx={{ width: "98%", overflow: "hidden", padding: "12px" }}>
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            sx={{ padding: "20px" }}
                        >
                            products List
                        </Typography>
                        <Divider />
                        <Box height={10} />
                        <Stack direction="row" spacing={2} className="my-2 mb-2">
                            <TextField size="small"
                                sx={{
                                    '& label.Mui-focused': {
                                        color: '#D5A983',
                                        fontWeight: 'bold'
                                    },
                                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#D5A983', // Change the border color
                                    },
                                }} label="Search" />
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ flexGrow: 1 }}
                            ></Typography>
                            <Link href="../admin/products/add" passHref>

                                <Button component="a"
                                    variant="contained"
                                    style={{ backgroundColor: '#D5A983', color: '#fff', fontWeight: 'bold' }}

                                    endIcon={<AddCircleIcon />

                                    }
                                >
                                    Add Product
                                </Button>
                            </Link>
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
                                            Name
                                        </TableCell>
                                        <TableCell align="left" style={{ minWidth: "100px" }}>
                                            Price
                                        </TableCell>
                                        <TableCell align="left" style={{ minWidth: "100px" }}>
                                            Quantity
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
                                    {products
                                        .map
                                        ((product: any) => {
                                            return (
                                                <TableRow
                                                    hover
                                                    role="checkbox"
                                                    tabIndex={-1}
                                                    key={product.productId}
                                                >
                                                    <TableCell align="left">{product.productId}</TableCell>
                                                    <TableCell align="left">{product.name}</TableCell>
                                                    <TableCell align="left">{product.price}</TableCell>
                                                    <TableCell align="left">{product.quantity}</TableCell>
                                                    <TableCell align="left">{moment(product.created_at).format("DD MMM YYYY hh:mm A")}</TableCell>
                                                    <TableCell align="left">{moment(product.updated_at).format("DD MMM YYYY hh:mm A")}</TableCell>

                                                    <TableCell align="left">
                                                        <Stack spacing={2} direction="row">

                                                            <Link href={`../admin/products/edit/${product.productId}`} passHref>
                                                                <EditIcon
                                                                    style={{
                                                                        marginTop: "10px",
                                                                        fontSize: "20px",
                                                                        color: "primary",
                                                                        cursor: "pointer",
                                                                    }}
                                                                    className="cursor-pointer"

                                                                />
                                                            </Link>
                                                            <IconButton
                                                                disabled={loadingForDelete}
                                                                onClick={() =>
                                                                    deleteProduct(product.productId)
                                                                }

                                                            >

                                                                {loadingForDelete
                                                                    ? <CircularProgress size={24} /> :
                                                                    <DeleteIcon

                                                                    />}
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
                                count={products.length}
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

            </Layout >
        </div>
    )
}

