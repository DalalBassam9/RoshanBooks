"use client";
import ProductForm from '../../../components/Products/ProductForm';
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import CircularProgress from '@mui/material/CircularProgress';
import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { Card, CardContent } from '@mui/material';
import { Container } from '@mui/material';
import Breadcrumbs from '../../../components/Breadcrumbs';
import HomeIcon from "@mui/icons-material/Home";
import EditIcon from '@mui/icons-material/Edit';
import ListAltIcon from '@mui/icons-material/ListAlt';
import Layout from '../../../components/AdminLayout';
import useAuth from '../../../useAuth';

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


function Edit({ params }: { params: any }) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    image: null,
    previewUrl: '',
    categoryId: '',
    price: '',
    quantity: ''

  });

  const router = useRouter();
  const [loadingProduct = false, setLoadingProduct] =
    React.useState<boolean>(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [loading = false, setLoading] = React.useState<boolean>(false);


  const breadcrumbs = [

    { path: '/admin', label: 'Home', icon: <HomeIcon />, margin: '0.5rem' },
    { path: '/admin/products', label: 'Products', icon: <ListAltIcon /> },
    { path: `/admin/products/edit/${params.productId}`, label: 'Edit Product', icon: <EditIcon /> },
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



  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

      const response = await axios.put(process.env.NEXT_PUBLIC_API_URL + "/api/admin/products/" + params.productId, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Product Created successfully',
        confirmButtonColor: '#D5A983'
      })
      router.refresh();
      router.back();
    }
    catch (error: any) {
      if (error instanceof Yup.ValidationError) {
        const errors: { [key: string]: string } = {}; // Specify the type of 'errors' as an object with string keys and string values
        error.inner.forEach((error: any) => {
          errors[error.path] = error.message;
        });
        setErrors(errors);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response?.data?.message || error.message, 
          confirmButtonColor: '#D5A983'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const getProduct = async () => {
    try {
      setLoadingProduct(true);
      const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/admin/products/" + params.productId);
      setFormData({ ...response.data.data, previewUrl: response.data.data.image });
    } catch (error: any) {
    } finally {
      setLoadingProduct(false);
    }
  };
  React.useEffect(() => {
    getProduct();
  }, []);


  return (
    <div>
      <Layout>
        <Container>
          {loadingProduct &&
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
              <CircularProgress style={{ color: '#D5A983' }} />
            </div>
          }

          <Card sx={{ width: '70%', marginBottom: '20px' }}  >
            <CardContent>
              <Breadcrumbs breadcrumbs={breadcrumbs} />
            </CardContent>
          </Card>

          {formData && (
            <ProductForm
              loading={loading}
              formData={formData}
              errors={errors}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              handleImageChange={handleImageChange}
              deletePreview={deletePreview}
              handleCancel={handleCancel}
              setFormData={setFormData}
            />
          )}
        </Container>
      </Layout>
    </div>
  );
}

export default Edit;
