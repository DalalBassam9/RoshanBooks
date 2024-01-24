"use client";
import React, { useState, useEffect } from 'react';
import ProductReview from '../../../components/Product/ProductReview';
import axios from 'axios';
import { addToCart, removeFromCart } from '../../../redux/cartSlice';
import WishlistState from '../../../redux/wishlistSlice';
import { useSelector } from 'react-redux';
import useAuth from "../../lib/useAuth";
import Rating from '@mui/material/Rating';
import { useDispatch } from 'react-redux';
import { getMyWishlist, removeFromWishlist, addToWishlist } from '../../../redux/wishlistSlice';
import { Product } from "../../../interfaces";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import FrontLayout from '../../../components/FrontLayout';


export default function Product({ params }: { params: any }) {
    const router = useRouter();
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const token = localStorage.getItem('token');
    const wishlistItems = useSelector(state => state.wishlist.items);
    const handleQuantityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setQuantity(Number(event.target.value));
    };
    const handleAddToWishlist = (productId: any) => {

        if (!token) {
            router.push("/login");
        } else {

            try {
                dispatch(addToWishlist(
                    { productId: productId }
                ));

                getProduct();
                toast.success('Product added to  wihlist!');

            } catch (error: any) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response.data.message || error.message,
                })
            }
        }
    };

    const handleAddToCart = (productId: any, quantity: number) => {
        if (!token) {
            router.push("/login");
        } else {
            dispatch(
                addToCart({
                    productId: productId,
                    quantity: quantity,
                })
            );
        }
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
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/api/products/${params.productId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }

            );
            setProduct(response.data.data);
            dispatch(getMyWishlist());
        } catch (error: any) {
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };


    const handleRemoveFromWishlist = (productId: any) => {
        if (!token) {
            router.push("/login");
        } else {
            dispatch(
                removeFromWishlist({
                    productId: productId
                })
            )
            toast.success('Product removed to  wihlist!');
        }
    };


    const checkIsWishlisted = (productId: any) => {
        if (Array.isArray(wishlistItems) || !params) {
            console.error(wishlistItems);
        }
        return wishlistItems.some((item) => item && item.productId === productId);
    };


    useEffect(() => {
        getProduct()
    }, []);



    return (
        <div>

            <FrontLayout>


                <div className="overflow-hidden rounded-lg bg-white mt-8 mb-8
          max-w-6xl
          mx-auto
          grid grid-cols-1
          gap-6
          sm:px-6
          lg:max-w-7xl  shadow">
                    {product && (
                        <div>
                            <div>
                                <ToastContainer />
                                <section className="my-4">
                                    <div className="container px-5 py-24 mx-auto">
                                        <div className="lg:w-4/5 mx-auto flex flex-wrap">
                                            <img alt="ecommerce" className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src={product.image} />
                                            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">

                                                <div className="flex  justify-between ">
                                                    <div className="flex-1 truncate">

                                                        <h1 className="text-gray-900 text-2xl title-font font-medium mb-1 py-2">{product.name}</h1>
                                                        <span className="flex items-center">
                                                            <Rating
                                                                readOnly
                                                                precision={0.5}
                                                                name="read-only"
                                                                value={product?.sumRatings || 0}
                                                                style={{
                                                                    color: "#E5BEA0"
                                                                }} size="medium"

                                                            />

                                                            <span className="text-gray-600 ml-3">  {product?.countRatings} Reviews</span>
                                                        </span>

                                                    </div>
                                                    <div className="flex-shrink-0">

                                                        {checkIsWishlisted(product.productId) ? (

                                                            <button onClick={() =>

                                                                handleRemoveFromWishlist(product.productId)
                                                            }  >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-beige" viewBox="0 0 20 20"
                                                                    fill="currentColor">
                                                                    <path fill-rule="evenodd"
                                                                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                                                        clip-rule="evenodd" />
                                                                </svg>
                                                            </button>
                                                        ) : (
                                                            <button onClick={() => {
                                                                handleAddToWishlist(product.productId);

                                                            }}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 group-hover:opacity-70 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                                </svg>
                                                            </button>
                                                        )}


                                                    </div>

                                                </div>
                                                <p className="mt-3 text-lg text-3xl leading-relaxed">{product.description}</p>
                                                <div className=" mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                                                    <div className="my-4">
                                                        <span className="title-font  text-2xl font-bold text-beige">{product.price} JD</span>
                                                    </div>

                                                    <span className="text-gray-500 my-2 ml-1">
                                                        {product.quantity > 0
                                                            ? `in stock`
                                                            : "Out of stock"}
                                                    </span>
                                                    <div className="my-4">
                                                        <div>
                                                            <label htmlFor="quantity" className="mr-2">Quantity</label>
                                                            <select
                                                                id="quantity"
                                                                name="quantity"
                                                                className="w-24 form-select text-black border-2 rounded px-4 py-2 hover:bg-gray-200  focus:outline-none focus:border-beige focus:ring focus:ring-beige
                                                      "
                                                                value={quantity}
                                                                onChange={handleQuantityChange}
                                                            >
                                                                {[...Array(10)].map((_, i) => (
                                                                    <option key={i} value={i + 1}>{i + 1}</option>
                                                                ))}
                                                            </select>
                                                        </div>

                                                        <div className="flex my-8">
                                                            <button
                                                                disabled={product.quantity === 0}
                                                                onClick={() => {
                                                                    handleAddToCart(product.productId, quantity);
                                                                }}
                                                                className={`flex mx-2 rounded-full bg-beige px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-beige focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-beige ${product.quantity === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-6 mx-2 w-6">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                                                </svg>
                                                                <span className="pr-2"> Add to cart</span>
                                                            </button>
                                                            <button className="flex mx-2 rounded-full bg-beige px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-beige focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-beige" onClick={() => router.push("/cart")}>
                                                                <svg className="w-5  pt-1 mx-2 h-5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                                                </svg>

                                                                <span className="pr-2"> View Cart </span>

                                                            </button>
                                                        </div>

                                                    </div>




                                                </div>

                                                <div className="pt-10">

                                                </div>

                                            </div>

                                            <div className="pt-10">
                                                <hr />
                                            </div>

                                        </div>

                                        <ProductReview product={params} />
                                    </div>
                                </section>

                            </div>

                        </div>

                    )}
                </div>
            </FrontLayout>
        </div>
    );
}