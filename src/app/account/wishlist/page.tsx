"use client"
import React, { useState, useEffect } from 'react';
import { useSelector as useReduxSelector } from 'react-redux';
import { WishlistState } from "../../../redux/wishlistSlice";
import { getMyWishlist, removeFromWishlist, isWishlisted } from '../../../redux/wishlistSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import ProductCard from '../../../components/Product/ProductCard';

import SidebarProfile from '../../../components/Profile/SidebarProfile';
const Wishlist: React.FC = () => {
    const products = useSelector((state: { wishlist: WishlistState }) => state.wishlist.items);
    const dispatch = useDispatch();

    const loading = useSelector((state: any) => state.wishlist.loading);

    useEffect(() => {
        dispatch(getMyWishlist());
    }, [dispatch]);

    const checkIfWishlisted = useSelector(isWishlisted);
    const handleRemoveFromWishlist = (productId: any) => {
        dispatch(removeFromWishlist(productId));
    };

    return (
        <div> 
            <SidebarProfile>
   
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 lg:col-span-3">
            {products.map((product: any) => (
                <ProductCard key={product.productId} product={product} handleRemoveFromWishlist={handleRemoveFromWishlist} />
            ))}
        </div>
        </SidebarProfile >

        </div>
    )
}



export default Wishlist;