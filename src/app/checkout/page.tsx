"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { getCartItems, CartState, clearCart } from '../../redux/cartSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import AddressForm from "../../components/Profile/AddressForm";
import DeliveryAddressCard from "../../components/Checkout/DeliveryAddressCard";
import CartItemSummary from "../../components/Checkout/CartItemSummary";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import Swal from "sweetalert2";
import FrontLayout from '../../components/FrontLayout';
import useAuth from '../lib/useAuth';

export default function Checkout() {
    useAuth({ middleware: 'auth' })
    const router = useRouter();
    const [addresses, setِِAddresses] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const dispatch = useDispatch();

    const state = useSelector((state: { cart: CartState }) => state);
    const items = useSelector((state: { cart: CartState }) => state.cart.items);
    const subTotal = items.reduce(
        (acc: any, item: any) => acc + item.price * item.quantity,
        0
    );
    const total = subTotal + 3;
    const [showAddressForm, setShowAddressForm] = React.useState(false);
    const [selectedAddress, setSelectedAddress] = React.useState<any>(null);


    const handleShowAddressForm = (address: any) => {
        setSelectedAddress(address);
        setShowAddressForm(true);
    };

    useEffect(() => {
        dispatch(getCartItems());
    }, [dispatch]);



    const getAddresses = async () => {
        try {
            setLoading(true);
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/api/addresses`,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            setِِAddresses(response.data.data);
        } catch (error: any) {
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        getAddresses();
    }, []);

    const handlePlaceOrder = async () => {
        try {
            setLoading(true);
            const defaultAddressId = addresses.find((address: any) => address.default === 1) as any;
            const response = await axios.post(
                process.env.NEXT_PUBLIC_API_URL + '/api/checkout',
                {
                    items: items,
                    price: subTotal,
                    totalPrice: total,
                    addressId: defaultAddressId.addressId,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            dispatch(clearCart());
            router.push('/checkout/thankyou');
        } catch (error: any) {
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };
    return (

        <div>

            <FrontLayout>
                {items.length > 0 && (


                    <div className="mt-4 grid grid-cols-2 gap-y-6 sm:grid-cols-3  my-4 sm:gap-x-4">
                        <div className="lg:col-span-2 col-span-3  space-y-4 px-12">
                            <div className="mt-8 p-4 relative flex flex-col  bg-white shadow rounded-md">
                                <div className="py-5  rounded-md bg-white">
                                    <div>
                                        <ToastContainer />

                                        {showAddressForm && (
                                            <AddressForm
                                                showAddressForm={showAddressForm}
                                                setShowAddressForm={setShowAddressForm}
                                                selectedAddress={selectedAddress}
                                                reloadData={() => getAddresses()}
                                                setSelectedAddress={setSelectedAddress}
                                            />

                                        )}


                                        <div className="bg-white   border-b  border-gray-900/10  my-2 sm:rounded-lg">
                                            <div className="px-4 py-5 sm:p-6">
                                                <div className="flex justify-between">
                                                    <h3 className="text-base font-semibold leading-6 text-gray-900">Addressess</h3>

                                                    <button
                                                        onClick={() => { setShowAddressForm(true) }}
                                                        className="rounded-md  px-3 py-2 bg-beige px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-beige focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                    >
                                                        Add new address
                                                    </button>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {addresses.length > 0 && (
                                        <ul role="list" className="divide-y divide-gray-300">
                                            {addresses.map((address: any) => (
                                                <DeliveryAddressCard
                                                    address={address}
                                                    setShowAddressForm={setShowAddressForm}
                                                    reloadData={() => getAddresses()}
                                                    setSelectedAddress={setSelectedAddress}
                                                    handleShowAddressForm={handleShowAddressForm} />
                                            ))}
                                        </ul>

                                    )}
                                    {addresses.length === 0 && (
                                        <div className="flex flex-col items-center justify-center gap-5 mt-10">
                                            <i className="text-5xl"></i>
                                            <h1 className="text-xl"> no there address to ship
                                                add new address   </h1>
                                        </div>
                                    )}

                                </div>
                            </div>



                        </div>

                        <div className="lg:col-span-1 col-span-3 mt-4 space-y-4 mr-6 mb-8 px-4">
                            <div className="mt-4 p-4 relative flex flex-col  bg-white shadow rounded-md">
                                <div className="py-5  rounded-md bg-white">
                                    <div className="px-3">
                                        {items.map((item: any) => (
                                            <CartItemSummary
                                                cartItem={item}
                                            />
                                        ))}
                                        <div className="mb-6 pb-6 border-b border-gray-200 text-gray-800">
                                            <div className="w-full flex mb-3 items-center">
                                                <div className="flex-grow">
                                                    <span className="text-gray-600">Subtotal</span>
                                                </div>
                                                <div className="pl-3">
                                                    <span className="font-semibold">{subTotal} JD</span>
                                                </div>
                                            </div>
                                            <div className="w-full flex mb-3 items-center">
                                                <div className="flex-grow">
                                                    <span className="text-gray-600">Shipping</span>
                                                </div>
                                                <div className="pl-3">
                                                    <span className="font-semibold">3 JD</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-6 pb-6 border-b border-gray-200 md:border-none text-gray-800 text-xl">
                                            <div className="w-full flex items-center">
                                                <div className="flex-grow">
                                                    <span className="text-gray-600">Total</span>
                                                </div>
                                                <div className="pl-3">
                                                    <span className="font-semibold">{total} JD</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="w-full flex-none rounded-full bg-beige px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-beige focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-beige" onClick={handlePlaceOrder}>Complete Order</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                )}


            </FrontLayout>
        </div>
    )
}
