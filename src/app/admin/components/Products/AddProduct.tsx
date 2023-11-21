"use client";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Box } from '@mui/material';

interface FormData {
    name: string;
    description: string;
    image: File | null;
    previewUrl: string | null;
    categoryId: number | null,
    price: number | null,
    quantity: number | null
}

function AddProduct({ }
) {

    const [formData, setFormData] = useState<FormData>({
        name: '',
        description: '',
        image: null,
        previewUrl: null,
        categoryId: null,
        price: null,
        quantity: null


    });

    const router = useRouter();
    const [categories, setCategories] = React.useState([]);

    const [errorMessage, setErrorMessage] = React.useState('');
    const getCategories = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/admin/categories-lookups");
            setCategories(response.data.data);
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message || error.message,
            })
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];

        if (file) {
            setFormData({
                ...formData,
                image: file,
                previewUrl: URL.createObjectURL(file),
            });
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('categoryId', formData.categoryId);
        data.append('quantity', formData.quantity);

        if (formData.image) {
            data.append('image', formData.image);
        }

        try {
            const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/api/admin/products", data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'City Created successfully',
            })

        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message || error.message,
            })
        }
    };

    React.useEffect(() => {
        getCategories();
    }, []);


    return (
        <div className="bgcolor">
            <Box sx={{ width: '100%', maxWidth: 800, p: 2, bgcolor: 'background.paper' }}>

                <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                fullWidth
                            />

                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                fullWidth
                            />

                        </Grid>


                        <Grid item xs={12} sm={6}>

                            <TextField
                                variant="outlined"
                                type="file"
                                onChange={handleImageChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                            />


                            {formData.previewUrl && (
                                <div>
                                    <p>Image Preview:</p>
                                    <img src={formData.previewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                                </div>
                            )}
                        </Grid>

                        <Grid item xs={12}>
                            <TextField id="productPrice"
                                name="price"

                                value={formData.price}
                                onChange={handleInputChange} label="Product Price" variant="outlined" fullWidth />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField id="quantity"
                                name="quantity"

                                value={formData.quantity}
                                onChange={handleInputChange} label="quantity" variant="outlined" fullWidth />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField id="categoryId"
                                name="categoryId"

                                value={formData.categoryId}
                                onChange={handleInputChange} label="categoryId" variant="outlined" fullWidth />
                        </Grid>

                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" type="submit" fullWidth>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>


        </div>
    );
}

export default AddProduct;

interface ProductFormProps {
    setSelectedFiles: any;
    loading: boolean;
    onSave: any;
    initialValues?: any;
    existingImages?: any;
    setExistingImages?: any;
}
