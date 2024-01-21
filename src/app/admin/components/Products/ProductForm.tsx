import { useEffect } from "react";
import Swal from "sweetalert2";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { TextField, Grid, Box } from '@mui/material';
import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useRouter } from "next/navigation";
import { FormControl, FormHelperText, Select, MenuItem, InputLabel, CircularProgress } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";

interface ProductFormProps {
    loading: any,
    formData: any,
    errors: any,
    setFormData: any;
    handleSubmit: any;
    handleChange: any;
    handleImageChange: any;
    deletePreview: any;
    handleCancel: any

}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});
function ProductForm({
    loading,
    formData,
    errors,
    setFormData,
    handleSubmit,
    handleImageChange,
    handleChange,
    deletePreview,
    handleCancel


}: ProductFormProps) {
    const router = useRouter();
    const [categories, setCategories] = React.useState([]);


    const getCategories = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/admin/categories-lookups");
            setCategories(response.data.categories);
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message || error.message,
                confirmButtonColor: '#D5A983'
                
            })
        }
    };

    React.useEffect(() => {
        getCategories();
    }, []);
    return (
        <div>
            <div >
                <Box sx={{ width: '100%', maxWidth: 800, p: 2, bgcolor: 'background.paper' }}>

                    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    error={Boolean(errors.name)}
                                    helperText={errors.name}
                                    fullWidth
                                    sx={{
                                        '& label.Mui-focused': {
                                            color: '#D5A983',
                                            fontWeight: 'bold'
                                        },
                                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#D5A983',
                                        },
                                    }}

                                />



                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Description"
                                    name="description"
                                    multiline
                                    rows={4}
                                    value={formData.description}
                                    onChange={(e) => handleChange('description', e.target.value)}
                                    error={Boolean(errors.description)}
                                    helperText={errors.description}
                                    fullWidth
                                    sx={{
                                        '& label.Mui-focused': {
                                            color: '#D5A983',
                                            fontWeight: 'bold'
                                        },
                                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#D5A983',
                                        },
                                    }}
                                />

                            </Grid>


                            <Grid item xs={12} sm={6}>
                                <div>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', border: '1px solid lightgrey', minWidth: 300, width: '100%', padding: "20px" }}>

                                        {formData.previewUrl && (
                                            <Card style={{ maxWidth: 300, paddingRight: 20, marginTop: 20, marginBottom: 20, marginRight: 10 }}>
                                                <CardContent>
                                                    <img
                                                        src={formData.previewUrl}
                                                        alt="Preview"
                                                        style={{ width: '100%', height: 'auto' }}
                                                    />
                                                </CardContent>

                                            </Card>

                                        )}

                                        {formData.previewUrl && (
                                            <Button startIcon={< DeleteIcon />} component="label" sx={{ marginBottom: "6px", marginTop: "6px" }} variant="outlined" color="inherit" onClick={deletePreview}>
                                                delete Image
                                            </Button>

                                        )}
                                        <Button component="label" variant="outlined" color="inherit"
                                            startIcon={<CloudUploadIcon />}>
                                            Upload Image
                                            <FormControl error={Boolean(errors.image)}>
                                                <VisuallyHiddenInput type="file"
                                                    onChange={(e) => handleImageChange('image', e.target.files)}

                                                />
                                                {errors.image && <FormHelperText>{errors.image}</FormHelperText>}
                                            </FormControl>
                                        </Button>
                                    </Box>

                                </div>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    name="price"
                                    value={formData.price}
                                    onChange={(e) => handleChange('price', e.target.value)}
                                    error={Boolean(errors.price)}
                                    helperText={errors.price}
                                    label="Product Price" fullWidth
                                    sx={{
                                        '& label.Mui-focused': {
                                            color: '#D5A983',
                                            fontWeight: 'bold'
                                        },
                                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#D5A983',
                                        },
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    name="quantity"
                                    label="quantity"
                                    value={formData.quantity}
                                    onChange={(e) => handleChange('quantity', e.target.value)}
                                    error={Boolean(errors.quantity)}
                                    helperText={errors.quantity}
                                    fullWidth
                                    sx={{
                                        '& label.Mui-focused': {
                                            color: '#D5A983',
                                            fontWeight: 'bold'
                                        },
                                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#D5A983',
                                        },
                                    }} />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl fullWidth  >
                                    <InputLabel
                                        id="category-label"
                                        sx={{
                                            '&.Mui-focused': {
                                                color: '#D5A983', // Change the color when focused
                                            },
                                        }}
                                    >
                                        Category
                                    </InputLabel>
                                    <Select
                                        labelId="category-label"
                                        id="category-label"
                                        label="Category"
                                        error={Boolean(errors.categoryId)}
                                        value={formData.categoryId}
                                        onChange={(e) => handleChange('categoryId', e.target.value)}
                                        sx={{

                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#D5A983',
                                                fontWeight: 'bold'

                                            },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#D5A983',
                                                fontWeight: 'bold'
                                            },

                                        }}
                                    >
                                        {categories.map((category: any) => (
                                            <MenuItem key={category.categoryId} value={category.categoryId}>
                                                {category.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText error >{errors.categoryId}</FormHelperText>

                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>

                                    <Button
                                        variant="outlined"
                                        style={{ color: '#A9A9A9', borderColor: '#A9A9A9' }}
                                        sx={{ marginRight: '10px' }}
                                        onClick={handleCancel}>Cancel</Button>
                                    <Button
                                        variant="contained"
                                        style={{ backgroundColor: '#D5A983', color: '#fff', fontWeight: 'bold' }}

                                        type="submit"
                                        disabled={loading}
                                        endIcon={loading ? <CircularProgress  style={{ color: '#fff' }}   size={20} /> : null}

                                    >
                                        Save
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </div>
        </div>

    );
}

export default ProductForm;

