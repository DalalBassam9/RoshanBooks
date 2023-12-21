"use client";
import React, { useState, useEffect } from 'react';
import ProductDetail from '../../../components/Product/ProductDetail';
import ProductReview from '../../../components/Product/ProductReview';
import axios from 'axios';
import { addToCart, removeFromCart } from '../../../redux/cartSlice';
import { AnyAction } from 'redux';
import WishlistState from '../../../redux/wishlistSlice';
import { useSelector } from 'react-redux';
import useAuth from "../../lib/useAuth";
import Rating from '@mui/material/Rating';
import { Provider, useDispatch } from 'react-redux';
import Swal from "sweetalert2";

let user = {
    name: 'Some User'
};

interface Product {
    productId: number | any;
    name: string;
    description: string;
    price: number | any;
    image: string;
    sumRatings: any;
    countRatings: any

}

export default function product({ params }: { params: any }) {
    const dispatch = useDispatch();
    const { user, isLoading } = useAuth({ middleware: 'auth' })
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setQuantity(Number(event.target.value));
    };
    const [product, setProduct] = React.useState<Product>({
        productId: '',
        name: '',
        description: '',
        price: '',
        image: '',
    });
    const [loading, setLoading] = React.useState(false);

    const getProduct = async () => {
        try {
            setLoading(true);
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/api/products/${params.productId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
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
                    <div>
                        <section className="text-gray-700 body-font overflow-hidden bg-white">
                            <div className="container px-5 py-24 mx-auto">
                                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                                    <img alt="ecommerce" className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src="https://unibookjo.com/images/Books/58/358362588_6501157333240536_2453742449784912702_n.jpg" />
                                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">

                                        <div className="flex  justify-between ">
                                            <div className="flex-1 truncate">

                                                <h1 className="text-gray-900 text-2xl title-font font-medium mb-1">{product.name}</h1>
                                                <span className="flex items-center">
                                                    <Rating
                                                        readOnly
                                                        precision={0.5}
                                                        name="read-only"
                                                        value={product?.sumRatings || 0}
                                                        style={{
                                                            color: "#26577C"
                                                        }} size="small"

                                                    />

                                                    <span className="text-gray-600 ml-3">  {product?.countRatings} Reviews</span>
                                                </span>

                                            </div>
                                            <div className="
 flex-shrink-0">   <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <p className="mt-3 text-lg text-3xl leading-relaxed">{product.description}</p>
                                        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                                            <div className="flex">
                                                <span className="title-font font-medium text-2xl text-gray-900">${product.price}</span>

                                            </div>
                                            <div className="flex ml-6 items-center">

                                                <div className="flex items-center">
                                                    <div className="flex items-center">
                                                        <label htmlFor="quantity" className="mr-2">Quantity</label>
                                                        <select
                                                            id="quantity"
                                                            name="quantity"
                                                            className="w-24 border-2 border-blue-500 p-2 rounded-md shadow-md"
                                                            value={quantity}
                                                            onChange={handleQuantityChange}
                                                        >
                                                            {[...Array(10)].map((_, i) => (
                                                                <option key={i} value={i + 1}>{i + 1}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={() => {
                                                        dispatch(
                                                            addToCart({
                                                                productId: product.productId,
                                                                quantity: quantity,
                                                            }) as unknown as AnyAction
                                                        );
                                                    }}
                                                    className="flex ml-auto text-white bg-beige border-0"
                                                >
                                                    Add to cart
                                                </button>


                                            </div>
                                        </div>



                                        <div className="pt-10">
                                            <hr />
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </section>

                    </div>

                    <ProductReview product={product} />
                </div>
                
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}