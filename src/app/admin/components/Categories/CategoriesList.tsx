"use client";
import React from "react";
import CategoryForm from "./CategoryForm";
import { Table, TableBody, TableCell, TableContainer, TablePagination, TableHead, Stack, Skeleton, Divider, TableRow, Paper, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import Swal from "sweetalert2";
import EditIcon from "@mui/icons-material/Edit";
import CircularProgress from '@mui/material/CircularProgress';
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import axios from "axios";

function CategoriesList() {
    const [loading, setLoading] = React.useState(false);
    const [loadingForDelete, setLoadingForDelete] = React.useState(false);
    const [showCategoryForm, setShowCategoryForm] = React.useState(false);
    const [selectedCategory, setSelectedCategory] = React.useState<any>(null);
    const [categories, setCategories] = React.useState([]);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [successMessage, setSuccessMessage] = React.useState('');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleShowCategoryForm = (category: any) => {
        setSelectedCategory(category);
        setShowCategoryForm(true);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
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
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
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
            })
            setSelectedCategory(null);
            getCategories();
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
        <div>
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
                        <TextField size="small" label="Search" />
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1 }}
                        ></Typography>
                        <Button
                            variant="outlined"
                            color="primary" 
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
                                                key={category.cityId}
                                            >
                                                <TableCell align="left">{category.categoryId}</TableCell>
                                                <TableCell align="left">{category.name}</TableCell>
                                                <TableCell align="left">{String(category.created_at)}</TableCell>
                                                <TableCell align="left">{String(category.updated_at)}</TableCell>

                                                <TableCell align="left">
                                                    <Stack spacing={2} direction="row">
                                                        <EditIcon
                                                            style={{
                                                                fontSize: "20px",

                                                                color: "primary",
                                                                cursor: "pointer",
                                                            }}
                                                            className="cursor-pointer"
                                                            onClick={() => handleShowCategoryForm(category)


                                                            }
                                                        />


                                                        {loadingForDelete && selectedCategory?.categoryId === category.categoryId
                                                            ? <CircularProgress /> :
                                                            <DeleteIcon

                                                                style={{
                                                                    fontSize: "20px",
                                                                    color: "darkred",
                                                                    cursor: "pointer",
                                                                }}
                                                                onClick={() => [
                                                                    setSelectedCategory(category),
                                                                    deleteCategory(category.categoryId),
                                                                ]}
                                                            />}
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
            {
                categories.length == 0 && (
                    <>
                        <Paper sx={{ width: "98%", overflow: "hidden", padding: "12px" }}>
                            <Box height={30} >

                            </Box>
                        </Paper>
                    </>
                )
            }

        </div >

    )
}




export default CategoriesList;