"use client";
import ProductForm from '../../components/Products/ProductForm';
import axios from "axios";
import Swal from "sweetalert2";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from "next/navigation";
import * as Yup from 'yup';
import { Typography, Card, CardContent } from '@mui/material';
import { Container } from '@mui/material';
import Breadcrumbs from '../../components/Breadcrumbs';
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import AddIcon from '@mui/icons-material/Add';
import ListAltIcon from '@mui/icons-material/ListAlt';


interface FormData {
    name: any;
    description: string;
    image: File | null;
    previewUrl: string | null;
    categoryId: any;
    price: any;
    quantity: any;
}

const productSchema = Yup.object().shape({
    name: Yup.string().required('Product name is required'),
    price: Yup.number().required('Price is required').positive('Price must be a positive number'),
    description: Yup.string().required('Description is required'),
    categoryId: Yup.string().required('Category is required'),
    quantity: Yup.string().required('quantity name is required'),
    image: Yup.mixed().required('A image is required'),

});

function add() {
    const [loading = false, setLoading] = React.useState<boolean>(false);
    const router = useRouter();
    const [errors, setErrors] = React.useState<Record<string, string>>({});
    const [formData, setFormData] = useState<FormData>({
        name: '',
        description: '',
        image: null,
        previewUrl: null,
        categoryId: null,
        price: null,
        quantity: null
    });
    const breadcrumbs = [

        { path: '/admin', label: 'Home', icon: <HomeIcon />, margin: '0.5rem' },
        { path: '/admin/products', label: 'Products', icon: <ListAltIcon /> },
        { path: '/admin/products/add', label: 'Add Product', icon: <AddIcon /> },
    ];

    const validateField = async (field: string, value: string) => {
        try {
            await productSchema.validateAt(field, { [field]: value });
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


    const handleImageChange = (name: string, file: FileList) => {
        setFormData({
            ...formData,
            [name]: file[0],
            previewUrl: URL.createObjectURL(file[0])
        });
        setErrors({
            ...errors,
            image: file ? '' : 'A file is required'
        });
    };
    const deletePreview = () => {
        // Revoke the object URL
        if (formData.previewUrl) {
            URL.revokeObjectURL(formData.previewUrl);
        }

        // Update the form data
        setFormData({
            ...formData,
            image: null,
            previewUrl: null
        });
    };
    const handleCancel = () => {
        // Reset the form data
        setFormData((prevData: FormData) => ({
            ...prevData,
            name: '',
            description: '',
            price: '',
            categoryId: '',
            quantity: '',
            image: null,
            previewUrl: ''
        }));
    };


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('price', String(formData.price));
        data.append('categoryId', String(formData.categoryId));
        data.append('quantity', String(formData.quantity));

        if (formData.image) {
            data.append('image', formData.image);
        }

        try {
            setLoading(true);

            await productSchema.validate(formData, { abortEarly: false });
            const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/api/admin/products", data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Product Created successfully',
            })
            router.push("/admin/products");

        }
        catch (error: any) {
            if (error instanceof Yup.ValidationError) {
                const errors: { [key: string]: string } = {}; // Specify the type of 'errors' object
                error.inner.forEach((error: any) => {
                    errors[error.path] = error.message;
                });
                setErrors(errors);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response?.data?.message || error.message, // Use optional chaining to access nested properties
                });
            }
        } finally {
            setLoading(false);
        }

    };


    return (
        <div>
            <Container>
                <Card sx={{ width: '70%', marginBottom: '20px' }}  >
                    <CardContent>
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </CardContent>
                </Card>

                <ProductForm
                    loading={loading}
                    errors={errors}
                    formData={formData}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    handleImageChange={handleImageChange}
                    deletePreview={deletePreview}
                    setFormData={setFormData}
                    handleCancel={handleCancel}
                />
            </Container>
        </div>
    );

}

export default add;