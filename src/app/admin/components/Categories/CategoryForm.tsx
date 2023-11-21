"use client";
import React from "react";
import axios from "axios";
import { Button, Dialog, DialogActions, Box, DialogContent, DialogTitle, IconButton, TextField } from '@mui/material';
import Swal from "sweetalert2";
import CloseIcon from '@mui/icons-material/Close';

interface CategoryFormProps {
    showCategoryForm: boolean;
    setShowCategoryForm: (show: boolean) => void;
    reloadData: () => void;
    selectedCategory: any;
    setSelectedCategory: (category: any) => void;
}

function CategoryForm({
    showCategoryForm,
    setShowCategoryForm,
    reloadData,
    selectedCategory,
    setSelectedCategory,
}: CategoryFormProps) {
    const [loading, setLoading] = React.useState(false);
    const [formData, setFormData] = React.useState({ name: '' });
    const [errorMessage, setErrorMessage] = React.useState('');
    const [successMessage, setSuccessMessage] = React.useState('');

    React.useEffect(() => {
        if (selectedCategory) {
            setFormData({ name: selectedCategory.name });
        } else {
            setFormData({ name: '' });
        }
    }, [selectedCategory]);


    const handleClose = () => {
        setShowCategoryForm(false);
        setSelectedCategory(null); 
        
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSubmit = async () => {
        try {
            setLoading(true);
            if (selectedCategory) {
                await axios.put(process.env.NEXT_PUBLIC_API_URL + `/api/admin/categories/` + selectedCategory.categoryId, formData);
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Category updated successfully',
                })
            } else {
                await axios.post(process.env.NEXT_PUBLIC_API_URL + `/api/admin/categories`, formData);
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Category Created successfully',
                })
            }
            setShowCategoryForm(false);
            setSelectedCategory(null);
            reloadData();
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message || error.message,
            });

        } finally {
            setLoading(false);
        }
    };


    return (
        <Dialog open={showCategoryForm} onClose={handleClose}
            sx={{
                '& .MuiDialog-paper': {
                    width: '80%',
                    maxHeight: 435,

                },
            }}   >
            <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">

                    {selectedCategory ? 'Update Category' : 'Add Category'}
                    <IconButton sx={{
                        color: 'primary.main',
                        '&:hover': {
                            backgroundColor: 'primary.light',

                        },
                    }}
                        edge="end" color="inherit" onClick={handleClose } aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="name"
                    label="Name"
                    type="text"
                    fullWidth
                    value={formData.name}
                    onChange={handleInputChange}
                />

            </DialogContent>
            <DialogActions>
                <Button onClick={ handleClose } color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    {selectedCategory ? 'Update' : 'Add'}
                </Button>
            </DialogActions>
        </Dialog>


    );


}

export default CategoryForm;

