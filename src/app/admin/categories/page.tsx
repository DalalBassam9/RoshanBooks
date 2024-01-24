
"use client";
import AdminLayout from '../components/AdminLayout';
import React from "react";
import CategoryForm from "../components/Categories/CategoryForm";
import { Table, TableBody, TableCell, TableContainer, TablePagination, TableHead, Stack, Skeleton, Divider, TableRow, Paper, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import Swal from "sweetalert2";
import EditIcon from "@mui/icons-material/Edit";
import CircularProgress from '@mui/material/CircularProgress';
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import axios from "axios";
import moment from 'moment';
import useAuth from '../useAuth';

interface Category {
    categoryId: number;
    name: string;
  }

  type Categories =  Category[];

export default function Categories() {

    const [loading, setLoading] = React.useState(false);
    const [loadingForDelete, setLoadingForDelete] = React.useState(false);
    const [showCategoryForm, setShowCategoryForm] = React.useState(false);
    const [selectedCategory, setSelectedCategory] = React.useState<any>(null);
    const [categories, setCategories] = React.useState<Categories>([]);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleShowCategoryForm = (category: any) => {
        setSelectedCategory(category);
        setShowCategoryForm(true);
    };
    6
    const handleChangePage = (event: any, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const getCategories = async () => {
        try {
            setLoading(true);
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/api/admin/categories?page=${page + 1}&per_page=${rowsPerPage}`
            );
            setCategories(response.data.data);
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
        getCategories();
    }, [page, rowsPerPage]);


    const deleteCategory = (categoryId: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#D5A983',
            cancelButtonColor: "#D5A983",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.value) {
                onDelete(categoryId);
            }
        });
    };


    const onDelete = async (categoryId: string) => {
        try {
            setLoadingForDelete(true);
            await axios.delete(process.env.NEXT_PUBLIC_API_URL + "/api/admin/categories/" + categoryId);
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Category Deleted successfully',
                confirmButtonColor: '#D5A983'
            })
            setSelectedCategory(null);
            getCategories();
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message || error.message,
                confirmButtonColor: '#D5A983'
            })
        } finally {
            setLoadingForDelete(false);
        }
    };

    return (
        <div>
            <AdminLayout>

                {showCategoryForm && (
                    <CategoryForm
                        showCategoryForm={showCategoryForm}
                        setShowCategoryForm={setShowCategoryForm}
                        selectedCategory={selectedCategory}
                        reloadData={() => getCategories()}
                        setSelectedCategory={setSelectedCategory}
                    />

                )}
                {categories.length > 0 && (
                    <Paper sx={{ width: "98%", overflow: "hidden", padding: "12px" }}>
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            sx={{ padding: "20px" }}
                        >
                            Categories List
                        </Typography>
                        <Divider />
                        <Box height={10} />
                        <Stack direction="row" spacing={2} className="my-2 mb-2">
                            <TextField size="small" sx={{
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
                            <Button
                                variant="contained"
                                style={{ backgroundColor: '#D5A983', color: '#fff', fontWeight: 'bold' }}

                                endIcon={<AddCircleIcon />}
                                onClick={() => { setShowCategoryForm(true) }}

                            >
                                Add Category
                            </Button>
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
                                    {categories
                                        .map
                                        ((category: any) => {
                                            return (
                                                <TableRow
                                                    hover
                                                    role="checkbox"
                                                    tabIndex={-1}
                                                    key={category.categoryId}
                                                >
                                                    <TableCell align="left">{category.categoryId}</TableCell>
                                                    <TableCell align="left">{category.name}</TableCell>
                                                    <TableCell align="left">{moment(category.created_at).format("DD MMM YYYY hh:mm A")}</TableCell>
                                                    <TableCell align="left">{moment(category.updated_at).format("DD MMM YYYY hh:mm A")}</TableCell>


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
                                                                onClick={() => handleShowCategoryForm(category)
                                                                }
                                                            />
                                                            <IconButton
                                                                disabled={loadingForDelete}
                                                                onClick={() => [
                                                                    setSelectedCategory(category),
                                                                    deleteCategory(category.categoryId),
                                                                ]}
                                                            >
                                                                {loadingForDelete && selectedCategory?.categoryId === category.categoryId
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
                                count={categories.length}
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
            </AdminLayout>
        </div>


    )
}
