"use client";
import React, { useState, useEffect } from 'react';
import ProductDetail from '../../components/Product/ProductDetail';
import axios from 'axios';
import Swal from "sweetalert2";

interface Product {
    productId: number|any;
    name: string;
    description: string;
    price: number|any;
    image:string
}

export default function product({ params }: { params: any }) {
    const [product, setProduct] = React.useState<Product>({
        productId: '',
        name: '',
        description: '',
        price: '',
        image: ''
    });
    const [loading, setLoading] = React.useState(false);

    const getProduct = async () => {
        try {
            setLoading(true);
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/api/products/${params.productId}`
            );
            setProduct(response.data.data);
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
        getProduct();
    }, []); // Add an empty dependency array to run the effect only once

    return (
        <div>
            {product ? (
                <div>
                    <ProductDetail product={product} />
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}