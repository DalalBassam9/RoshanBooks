"use client";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { TextField, Grid, Box, CardMedia } from '@mui/material';
import { Button, IconButton } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


interface FormData {
    name: string;
    description: string;
    image: File | null;
    previewUrl: string | null;
    categoryId: number | null,
    price: number | null,
    quantity: number | null
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

function EditProduct({
    product
}: ProductFormProps
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
    const [loadingProduct = false, setLoadingProduct] =
        React.useState<boolean>(false);
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


    const getProduct = async () => {
        try {
            setLoadingProduct(true);
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/admin/products/" + product.productId);
            setFormData({ ...response.data.data, previewUrl: response.data.data.image });
        } catch (error: any) {
        } finally {
            setLoadingProduct(false);
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
        getProduct();
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

                            <TextField
                                id="outlined-basic"
                                label="Outlined"
                                variant="outlined"
                                sx={{
                                    '& label.Mui-focused': {
                                        color: 'green',
                                    },
                                    '& .MuiOutlinedInput-root': {
                                   
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'darkgreen',
                                        },
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Description"
                                name="description"
                                multiline
                                rows={4}
                                value={formData.description}
                                onChange={handleInputChange}
                                fullWidth
                            />

                        </Grid>


                        <Grid item xs={12} sm={6}>


                            <div>




                                <Box sx={{ display: 'flex', flexWrap: 'wrap', border: '1px solid lightgrey', minWidth: 300, width: '100%' }}>


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

                                    <Button component="label" variant="outlined" color="inherit" startIcon={<CloudUploadIcon />}>
                                        Upload Image
                                        <VisuallyHiddenInput type="file"
                                            onChange={handleImageChange} />
                                    </Button>

                                </Box>
                            </div>










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

export default EditProduct;

interface ProductFormProps {
    product: any;

}
