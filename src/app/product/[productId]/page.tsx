"use client";
import React, { useState, useEffect } from 'react';
import ProductReview from '../../../components/Product/ProductReview';
import axios from 'axios';
import { addToCart, removeFromCart } from '../../../redux/cartSlice';
import { AnyAction } from 'redux';
import WishlistState from '../../../redux/wishlistSlice';
import { useSelector } from 'react-redux';
import useAuth from "../../lib/useAuth";
import Rating from '@mui/material/Rating';
import { Provider, useDispatch } from 'react-redux';
import { getMyWishlist, removeFromWishlist, addToWishlist, isProductInWishlist } from '../../../redux/wishlistSlice';
import { Product } from "../../../interfaces";
import Swal from "sweetalert2";
import { RootState } from '../../../redux/store';
import { fetchWishlist } from './wishlistSlice'; // adjust the import path to your file structure
import { AnyCnameRecord } from 'dns';
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function product({ params }: { params: any }) {
    const router = useRouter();
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const token = localStorage.getItem('token'); // Import RootState type
    const wishlistItems = useSelector(state => state.wishlist.items);
    const handleQuantityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setQuantity(Number(event.target.value));
    };
    const handleAddToWishlist = (productId: any) => {
        try {
            dispatch(addToWishlist(
                { productId: productId }
            ));

            getProduct();
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message || error.message,
            })
        }
    };

    const handleAddToCart = (productId: any, quantity: number) => {
        dispatch(
            addToCart({
                productId: productId,
                quantity: quantity,
            })
        );
    };

    const [product, setProduct] = React.useState<Product>({
        productId: '',
        name: '',
        description: '',
        price: '',
        image: '',
        Wishlisted: ''
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
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message || error.message,
            })

        } finally {
            setLoading(false);
        }
    };
    const handleRemoveFromWishlist = (productId: any) => {
        dispatch(removeFromWishlist(productId));
    };


    const checkIsWishlisted = (productId: any) => {
        if (Array.isArray(wishlistItems) || !params) {
            console.error(wishlistItems);
        }
        return wishlistItems.some(item => item && item.productId === productId);
    };



    useEffect(() => {
        getProduct()
    }, []); // Add an empty dependency array to run the effect only once



    return (
        <div className="overflow-hidden rounded-lg bg-white mt-8
          max-w-6xl
          mx-auto
          grid grid-cols-1
          gap-6
          sm:px-6
          lg:max-w-7xl  shadow">
            {product ? (
                <div>
                    <div>
                        <ToastContainer />
                        <section className="">
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
                                                            color: "#E5BEA0"
                                                        }} size="small"

                                                    />

                                                    <span className="text-gray-600 ml-3">  {product?.countRatings} Reviews</span>
                                                </span>

                                            </div>
                                            <div className="flex-shrink-0">

                                                {checkIsWishlisted(product.productId) ? (

                                                    <button onClick={() =>
                                                        dispatch(
                                                            removeFromWishlist({
                                                                productId: product.productId
                                                            }) as unknown as AnyAction
                                                        )

                                                    }  >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:opacity-70 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                        </svg>
                                                    </button>
                                                ) : (
                                                    <button onClick={() => {
                                                        handleAddToWishlist(product.productId);

                                                    }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:opacity-70 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                        </svg>
                                                    </button>
                                                )}


                                            </div>

                                        </div>
                                        <p className="mt-3 text-lg text-3xl leading-relaxed">{product.isWishlisted}</p>
                                        <div className=" mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                                            <div className="my-4">
                                                <span className="title-font font-medium text-2xl text-gray-900">${product.price}</span>
                                            </div>


                                            <div className="flex items-center">
                                                <div>
                                                    <label htmlFor="quantity" className="mr-2">Quantity</label>
                                                    <select
                                                        id="quantity"
                                                        name="quantity"
                                                        className="w-24 text-black border-2 rounded px-4 py-2 hover:bg-gray-200  focus:outline-none focus:border-beige focus:ring focus:ring-beige
                                                      "
                                                        value={quantity}
                                                        onChange={handleQuantityChange}
                                                    >
                                                        {[...Array(10)].map((_, i) => (
                                                            <option key={i} value={i + 1}>{i + 1}</option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <div className="mx-4">
                                                    <button
                                                        onClick={() => {
                                                            handleAddToCart(product.productId, quantity);
                                                        }
                                                        }
                                                        className="flex-none rounded-full bg-beige px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-beige focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-beige"
                                                    >
                                                        Add to cart
                                                    </button>
                                                    <button className="flex-none rounded-full bg-beige px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-beige focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-beige" onClick={() => router.push("/cart")}>
                                                        View Cart
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

            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}