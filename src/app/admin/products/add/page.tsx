"use client";
import AddProduct from '../../components/Products/AddProduct';
import React, { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from 'react';
import { useRouter } from "next/navigation";
function add() {
    const [selectedFiles = [], setSelectedFiles] = React.useState([]);
    const [loading = false, setLoading] = React.useState<boolean>(false);
    const [product, setProduct] = useState({ name: '', description: '', price: '' });
    const [selectedFile, setSelectedFile] = useState(null);
    const router = useRouter();
    
    const onSave = async (values: any) => {
        try {
            setLoading(true);
            await axios.post("/api/products", values);
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Product created successfully',
            })
            router.push("/products/");
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

    useEffect(() => {
        console.log(selectedFiles);
    }, [selectedFiles]);

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800">Add Product</h1>
            <hr />
            <AddProduct
            />
        </div>
    );

}

export default AddProduct;