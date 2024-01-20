"use client"
import React, { useState, useEffect } from 'react';
import { WishlistState } from "../../../redux/wishlistSlice";
import { getMyWishlist, removeFromWishlist } from '../../../redux/wishlistSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import ProductCard from '../../../components/Product/ProductCard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '../../lib/useAuth';
import FrontLayout from '../../../components/FrontLayout';
import SidebarProfile from '../../../components/Profile/SidebarProfile';
const Wishlist: React.FC = () => {

    useAuth({ middleware: 'auth' })
    const products = useSelector((state: { wishlist: WishlistState }) => state.wishlist.items);
    const dispatch = useDispatch();
    const loading = useSelector((state: any) => state.wishlist.loading);

    useEffect(() => {
        dispatch(getMyWishlist());
    }, [dispatch]);


    return (
        <div>

            <FrontLayout>
                <SidebarProfile>
                    <ToastContainer />
                    {products.length > 0 && (
                        <div className='my-4'>
                            <h1 className="text-center text-2xl font-bold">My Wishlist Items</h1>
                        </div>
                    )}

                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 lg:col-span-3">
                        {products.length > 0 && (
                            products.map((product: any) => (
                                <ProductCard key={product.productId} product={product} />
                            ))
                        )}
                    </div>
                    {products.length === 0 && (
                        <div className="flex flex-col items-center justify-center gap-5 mt-10">
                            <i className="text-5xl"></i>
                            <h1 className="text-xl">Your wishlist is empty</h1>
                        </div>
                    )}
                </SidebarProfile>

            </FrontLayout>

        </div>
    )
}



export default Wishlist;