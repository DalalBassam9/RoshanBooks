"use client";
import React from "react";
import axios from "axios";
import { Button, Dialog, DialogActions, Box, DialogContent, DialogTitle, IconButton, TextField } from '@mui/material';
import Swal from "sweetalert2";
import CircularProgress from '@mui/material/CircularProgress';
import CloseIcon from '@mui/icons-material/Close';
import * as Yup from 'yup';


interface CategoryFormProps {
    showCategoryForm: boolean;
    setShowCategoryForm: (show: boolean) => void;
    reloadData: () => void;
    selectedCategory: any;
    setSelectedCategory: (category: any) => void;
}
interface FormData {
    name: any;
}
const schema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
});

function CategoryForm({
    showCategoryForm,
    setShowCategoryForm,
    reloadData,
    selectedCategory,
    setSelectedCategory,
}: CategoryFormProps) {
    const [loading = false, setLoading] = React.useState<boolean>(false);
    const [errors, setErrors] = React.useState<Record<string, string>>({});
    const [formData, setFormData] = React.useState<FormData>({
        name: '',
    });


    const handleClose = () => {
        setShowCategoryForm(false);
        setSelectedCategory(null);

    };
    const validateField = async (field: string, value: string) => {
        try {
            await schema.validateAt(field, { [field]: value });
            setErrors((prevErrors) => ({
                ...prevErrors,
                [field]: '',
            }));
        } catch (error: any) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [field]: error.message,
            }));
        }
    };
    const handleChange = (field: string, value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));

        validateField(field, value);
    };



    React.useEffect(() => {
        if (selectedCategory) {
            setFormData({ name: selectedCategory.name });
        } else {
            setFormData({ name: '' });
        }
    }, [selectedCategory]);




    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            await schema.validate(formData, { abortEarly: false });
            if (selectedCategory) {
                await axios.put(process.env.NEXT_PUBLIC_API_URL + `/api/admin/categories/` + selectedCategory.categoryId, formData);
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Category updated successfully',
                    confirmButtonColor: '#D5A983'
                })
            } else {
                await axios.post(process.env.NEXT_PUBLIC_API_URL + `/api/admin/categories`, formData);
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Category Created successfully',
                    confirmButtonColor: '#D5A983'
                })
            }
            setShowCategoryForm(false);
            setSelectedCategory(null);
            reloadData();
        } catch (error: any) {
            if (error instanceof Yup.ValidationError) {
                const errors: { [key: string]: string } = {}; // Specify the type of 'errors' object
                error.inner.forEach((error: any) => {
                    errors[error.path] = error.message;
                });
                setErrors(errors);
            } else {
                Swal.fire({
                    confirmButtonColor: '#D5A983',
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response?.data?.message || error.message, // Use optional chaining to access nested properties
                });

                setShowCategoryForm(false);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
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
                                backgroundColor: '#D5A983',

                            },
                        }}
                            edge="end" style={{ backgroundColor: '#D5A983', color: "white", fontWeight: 'bold' }}
                            onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <form onSubmit={handleSubmit}>

                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="name"
                            label="Name"
                            type="text"
                            fullWidth
                            value={formData.name}
                            sx={{
                                '& label.Mui-focused': {
                                    color: '#D5A983',
                                    fontWeight: 'bold'
                                },
                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#D5A983', // Change the border color
                                },
                            }}
                            onChange={(e) => handleChange('name', e.target.value)}
                            error={Boolean(errors.name)}
                            helperText={errors.name}
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant="outlined"

                            style={{ color: '#A9A9A9', borderColor: '#A9A9A9' }}

                            onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            style={{ backgroundColor: '#D5A983', color: '#fff', fontWeight: 'bold' }}

                            type="submit"
                            disabled={loading}
                            startIcon={loading ? <CircularProgress style={{ color: '#fff' }} size={20} /> : null}
                        >
                            {selectedCategory ? 'Update' : 'Save'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

        </div>
    );


}

export default CategoryForm;

