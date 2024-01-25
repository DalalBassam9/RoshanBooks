"use client";
import React from "react";
import { useState } from 'react';
import { updateQuantity, removeFromCart, CartItem } from '../../redux/cartSlice';
import { useDispatch } from 'react-redux';
import Swal from "sweetalert2";

interface Cart {
    cartId: number;
    productId: number;
    quantity: number;
    name: string;
    price: number;
    image: string;
}


interface CartItemProps {
    cartItem: Cart;
}

function CartItem({ cartItem }: CartItemProps) {

    const [quantity, setQuantity] = useState(cartItem.quantity);
    const dispatch = useDispatch();

    const handleIncrement = () => {
        const newQuantity: number = quantity + 1;
        setQuantity(newQuantity);
        const payload: CartItem = { productId: cartItem.productId, quantity: newQuantity };
        dispatch(updateQuantity(payload) as any);
    };

    const handleDecrement = async () => {
        let newQuantity = quantity - 1;
        if (newQuantity <= 0) {
            newQuantity = 0;
            await dispatch(removeFromCart(cartItem.cartId) as any);
            Swal.fire({
                title: 'Removed',
                text: 'Product removed from cart',
                icon: 'success',
                confirmButtonColor: '#D5A983' // Change this to your desired color
            });
        } else {
            setQuantity(newQuantity);
            const payload: CartItem = { productId: cartItem.productId, quantity: newQuantity };
            await dispatch(updateQuantity(payload) as any);
        }
    };


    const handleRemove = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this item!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#D5A983', // Change this to your desired color
            cancelButtonColor: '#D5A983',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it',

        });

        if (result.isConfirmed) {
            await (dispatch as any)(removeFromCart(cartItem.cartId));
            Swal.fire({
                title: 'Deleted!',
                text: 'Your Product has been deleted.',
                icon: 'success',
                confirmButtonColor: '#D5A983' // Change this to your desired color
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('Cancelled', 'Your Product is safe :)', 'error');
        }
    };

    return (

        <div >
            <div className="justify-between mb-6 rounded-lg mb-8 bg-white p-6 shadow-md sm:flex sm:justify-start">
                <img src={cartItem.image} alt="product-image" className="rounded-lg w-full sm:h-40 sm:w-40" />
                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-8 sm:mt-0">
                        <h2 className="text-lg font-bold text-gray-900">{cartItem.name}</h2>
                        <p className="text-sm mt-4">{cartItem.price} JD</p>
                    </div>
                    <div className="mt-4 flex justify-between im sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                        <div className="flex items-center border-gray-100">
                            <div className="flex items-center">
                                <button onClick={handleDecrement} className="border rounded-md py-2 px-4 mr-2">-</button>
                                <span className="text-center w-8">{quantity}</span>
                                <button onClick={handleIncrement} className="border rounded-md py-2 px-4 ml-2">+</button>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button onClick={handleRemove} type="button" className="flex bg-gray-200 rounded p-2 text-center text-gray-500 focus:shadow ">
                                <span className="pt-1"> Remove</span>
                                <svg className="h-8  pt-1 w-8 rounded-full p-1 hover:bg-gray-100 hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     
    );
}

export default CartItem;

