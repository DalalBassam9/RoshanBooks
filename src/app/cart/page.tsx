"use client"
import Head from 'next/head'
import Link from 'next/link'
import React, { useState } from 'react';
import axios from 'axios';
import CartItem from '../../components/Cart/CartItem';
import Swal from "sweetalert2";
import useAuth from '../lib/useAuth';
import { getCartItems, CartState } from '../../redux/cartSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/cartSlice';
import { useSession, signIn, signOut } from 'next-auth/react';
import { ThunkDispatch } from 'redux-thunk';
import {  clearCart } from '../../redux/cartSlice';
import { AnyAction } from 'redux';
import { useRouter } from 'next/navigation';
export default function Cart() {
    const router = useRouter();
    const { user, isLoading } = useAuth({ middleware: 'auth' })
    const dispatch: ThunkDispatch<CartState, unknown, AnyAction> = useDispatch();
    const items = useSelector((state: { cart: CartState }) => state.cart.items);
    const subTotal = items.reduce(
        (acc:any, item:any) => acc + item.price * item.quantity,
        0
    );
    const total = subTotal + 3;

    useEffect(() => {
        dispatch(getCartItems());
    }, [dispatch]);

    return (
        <div>
            <div className="h-screen bg-gray-100 pt-20">
                <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
                <div className="mx-auto max-w-7xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                    {items.map((item: any) => (
                        <CartItem key={item.cartId} cartItem={item} />
                    ))}

                    <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                        <div className="mb-2 flex justify-between">
                            <p className="text-gray-700">Subtotal</p>
                            <p className="text-gray-700">{subTotal}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-gray-700">Shipping</p>
                            <p className="text-gray-700">$3</p>
                        </div>
                        <hr className="my-4" />
                        <div className="flex justify-between">
                            <p className="text-lg font-bold">Total</p>
                            <div className="">
                                <p className="mb-1 text-lg font-bold">{total} </p>
                            </div>
                        </div>
                        <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600" onClick={() => router.push('/checkout')} >Check out</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
