"use client"
import React, { useState } from 'react';
import CartItem from '../../components/Cart/CartItem';
import useAuth from '../lib/useAuth';
import { getCartItems, CartState } from '../../redux/cartSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';
export default function Cart() {
    const router = useRouter();
    useAuth({ middleware: 'auth' })
    const dispatch = useDispatch();
    const items = useSelector((state: { cart: CartState }) => state.cart.items);

    const subTotal =
        items.reduce((acc: any, item: any) => item ? acc + item.price * item.quantity : acc, 0);


    const total = subTotal + 3;

    useEffect(() => {
        dispatch(getCartItems());
    }, [dispatch]);

    return (
        <div>
            <div className="h-screen bg-gray-100 pt-20">
                <ToastContainer position="top-center" />
                {items.length > 0 && (
                    <div>
                        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
                    </div>
                )}

                {items.length > 0 && (

                    <div className="mx-auto max-w-7xl justify-center px-6 md:flex md:space-x-6 xl:px-0">


                        <div className="rounded-lg md:w-2/3" >
                            {items && items.map((item: any) => (
                                item && <CartItem key={item.cartId} cartItem={item} />
                            ))}
                        </div>


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



                            <div className="mt-5 grid grid-flow-row-dense grid-cols-1 gap-3">
                                <div className='flex items-center justify-between gap-x-6'>
                                    <button className=" w-full rounded-full bg-beige px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-beige focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-beige" onClick={() => router.push("/")}>
                                        Continue shopping
                                    </button>
                                    <button className="w-full  rounded-full mx-2 bg-beige px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-beige focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-beige" onClick={() => router.push('/checkout')} >
                                        Checkout
                                    </button>

                                </div>
                            </div>

                        </div>

                    </div>

                )}


                {items.length === 0 && (
                    <div className="flex flex-col items-center justify-center gap-5 mt-10">
                        <i className="ri-shopping-cart-line text-5xl"></i>
                        <h1 className="text-xl">Your cart is empty</h1>
                    </div>
                )}

            </div>


        </div>
    )
}
