"use client"
import { addToCart } from '../../redux/cartSlice';
import { useDispatch } from 'react-redux';
import { WishlistState } from "../../redux/wishlistSlice";
import { removeFromWishlist, addToWishlist } from '../../redux/wishlistSlice';
import { useSelector } from 'react-redux';
import Rating from '@mui/material/Rating';
import { Product } from "../../interfaces";
import React, { useEffect } from 'react';
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import Swal from "sweetalert2";

interface ProductCardProps {
    product: Product;
}

function ProductCard({
    product,
}: ProductCardProps) {
    const dispatch = useDispatch();
    const router = useRouter();
    const products = useSelector((state: { wishlist: WishlistState }) => state.wishlist.items);
    const token: any = localStorage.getItem('token');


    const isWishlisted = (productId: any) => {
        if (Array.isArray(products)) {
            console.error(products);
        }
        return products.some((item: Product) => item && item.productId === productId);
    };

    const handleAddToWishlist = (productId: any) => {

        if (!token) {
            router.push("/login");
        } else {

            try {
                dispatch(addToWishlist(
                    { productId: productId }
                ));
                toast.success('Product added to  wihlist!');

            } catch (error: any) {
                toast.error(error.response.data.message || error.message);
            }
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
    const handleAddToCart = (productId: any) => {
        if (!token) {
            router.push("/login");
        } else {
            dispatch(
                addToCart({
                    productId: productId,
                    quantity: 1,
                })
            );
            router.push('/cart');
        }
    };




    return (
        <div>
            <div className="relative  bg-white shadow-md rounded-3xl p-2 my-3 cursor-pointer">
                <div className="overflow-x-hidden rounded-2xl relative aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md  lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img className="h-full rounded-2xl w-full object-cover" src={product.image} />
                    <p className="absolute right-2 top-2 bg-white rounded-full p-2 cursor-pointer group">

                        {isWishlisted(product.productId) ? (

                            <button onClick={() =>

                                handleRemoveFromWishlist(product.productId)
                            } >

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

                    </p>

                </div>
                <div className="mt-4 pl-2 mb-2 flex justify-between ">
                    <div>
                        <p className="text-lg font-semibold text-gray-900 mb-0">{product.name}</p>
                        <span className="mt-2">
                            <Rating
                                readOnly
                                precision={0.5}
                                name="read-only"
                                value={product?.sumRatings || 0}
                                style={{
                                    color: "#E5BEA0"
                                }} size="small"
                            />
                        </span>
                        <p className="text-xl  text-Purpl mt-0">${product.price}</p>
                    </div>
                    <div className="flex flex-col-reverse mb-1 mr-4 group cursor-pointer">
                        <button
                            onClick={() => {
                                handleAddToCart(product.productId);

                            }}
                            disabled={product.quantity === 0}
                            className={`p-2 rounded-full bg-beige   focus:outline-none ${product.quantity === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}>

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-5 text-white mx-2 w-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>

                        </button>
                    </div>
                </div>
            </div>

        </div >
    );


}
export default ProductCard;