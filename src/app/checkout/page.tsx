"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { RadioGroup } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { getCartItems, CartState, clearCart } from '../../redux/cartSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/cartSlice';
import { useSession, signIn, signOut } from 'next-auth/react';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { useRouter } from 'next/navigation';
import AddressForm from "../../components/Profile/AddressForm";

import Swal from "sweetalert2";
export default function Checkout() {
    const router = useRouter();
    const [addresses, setِِAddresses] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const dispatch: ThunkDispatch<CartState, unknown, AnyAction> = useDispatch();

    const state = useSelector((state: { cart: CartState }) => state);
    const items = useSelector((state: { cart: CartState }) => state.cart.items);
    const subTotal = items.reduce(
        (acc: any, item: any) => acc + item.price * item.quantity,
        0
    );
    const total = subTotal + 3;
    const [loadingForDelete, setLoadingForDelete] = React.useState(false);
    const [showAddressForm, setShowAddressForm] = React.useState(false);
    const [selectedAddress, setSelectedAddress] = React.useState<any>(null);


    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(' ')
    }


    React.useEffect(() => {
        getAddresses();
    });

    const handleShowAddressForm = (address: any) => {
        setSelectedAddress(address);
        setShowAddressForm(true);
    };


    const deleteAddress = (addressId: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.value) {
                onDelete(addressId);
            }
        });
    };


    const onDelete = async (addressId: string) => {
        try {
            setLoadingForDelete(true);
            await axios.delete(process.env.NEXT_PUBLIC_API_URL + "/api/addresses/" + addressId,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Address Deleted successfully',
            })
            setSelectedAddress(null);
            getAddresses();
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message || error.message,
            })
        } finally {
            setLoadingForDelete(false);
        }
    };

    useEffect(() => {
        dispatch(getCartItems());
    }, [dispatch]);


    const setDefaultAddress = async (addressId: string) => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await axios.put(process.env.NEXT_PUBLIC_API_URL + "/api/set-default-address/" + addressId, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            getAddresses();
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data?.message || error.message,
            })
        }
    };


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
    });

    const handlePlaceOrder = async () => {
        try {
            setLoading(true);
            const defaultAddressId = addresses.find((address: any) => address.default === 1) as any;
            const response = await axios.post(
                process.env.NEXT_PUBLIC_API_URL + '/api/checkout',
                {
                    items: items, // Your cart items
                    subTotal: subTotal, // The subtotal price
                    totalPrice: total, // The total price
                    addressId: defaultAddressId.addressId,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            router.push('/checkout/thankyou');
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
    return (
        <div className="mt-4 grid grid-cols-2 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
            <div className="lg:col-span-2 col-span-3 bg-indigo-50 space-y-8 px-12">
                <div className="mt-8 p-4 relative flex flex-col  bg-white shadow rounded-md">
                    <div className="py-5  rounded-md bg-white">
                        <div>
                            {showAddressForm && (
                                <AddressForm
                                    showAddressForm={showAddressForm}
                                    setShowAddressForm={setShowAddressForm}
                                    selectedAddress={selectedAddress}
                                    reloadData={() => getAddresses()}
                                    setSelectedAddress={setSelectedAddress}
                                />

                            )}

                            <div className="bg-white shadow sm:rounded-lg">
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
                        <ul role="list" className="divide-y divide-gray-100">
                            {addresses.map((address: any) => (
                                <li key={address.addressId} className="flex items-center justify-between gap-x-6 py-5">
                                    <div className="min-w-0">
                                        <div className="items-start gap-x-3">
                                            <p className="text-sm font-semibold leading-6 text-gray-900">{address.phone}</p>
                                            <p className="text-sm font-semibold leading-6 text-gray-900">{address.firstName}{address.lastName}</p>
                                            <p className="text-sm font-medium text-gray-900">{address.district}</p>
                                            <p className="text-sm font-medium text-gray-900">{address.city?.name}</p>
                                            <p className="text-sm font-medium text-gray-900">{address.address}</p>


                                        </div>

                                    </div>
                                    <div className="flex flex-none items-center gap-x-4">

                                        <div className="ml-3 flex h-6 items-center">
                                            <input
                                                onClick={() => setDefaultAddress(address.addressId)}
                                                id={`account-${address.addressId}`}
                                                aria-describedby={`account-${address.addressId}-description`}
                                                name="account"
                                                type="radio"
                                                defaultChecked={address.default === 1}
                                                className="h-4 w-4 border-gray-300 text-beige focus:ring-beige"
                                            />
                                        </div>
                                        <Menu as="div" className="relative flex-none">
                                            <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                                                <span className="sr-only">Open options</span>
                                                <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
                                            </Menu.Button>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                                    <Menu.Item>

                                                        <a
                                                            onClick={() => handleShowAddressForm(address)}
                                                            href="#"
                                                            className={classNames(
                                                                'block px-3 py-1 text-sm leading-6 text-gray-900'
                                                            )}
                                                        >
                                                            Edit
                                                        </a>

                                                    </Menu.Item>

                                                    <Menu.Item>

                                                        <button
                                                            onClick={() => [
                                                                setSelectedAddress(address),
                                                                deleteAddress(address.addressId),
                                                            ]}
                                                            className={classNames(
                                                                'block px-3 py-1 text-sm leading-6 text-gray-900'
                                                            )}
                                                        >
                                                            Delete
                                                        </button>

                                                    </Menu.Item>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>



            </div>
            <div className="md:col-span-1 col-span-3  bg-indigo-50 space-y-8 px-12">
                <div className="mt-8 p-4 relative flex flex-col sm:flex-row sm:items-center bg-white shadow rounded-md">
                    <div className="">
                        <div className="px-3">
                            {items.map((item: any) => (
                                <div className="w-full mx-auto text-gray-800 font-light mb-6 border-b border-gray-200 pb-6">
                                    <div className="w-full flex items-center">
                                        <div className="overflow-hidden rounded-lg w-16 h-16 bg-gray-50 border border-gray-200">
                                            <img src={item.image} alt="" />
                                        </div>
                                        <div className="flex-grow pl-3">
                                            <h6 className="font-semibold uppercase text-gray-600">{item.name}</h6>
                                            <p className="text-gray-400">x {item.quantity}</p>
                                        </div>
                                        <div>
                                            <span className="font-semibold text-gray-600 text-xl">{item.price * item.quantity}</span><span className="font-semibold text-gray-600 text-sm">.00</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="mb-6 pb-6 border-b border-gray-200 text-gray-800">
                                <div className="w-full flex mb-3 items-center">
                                    <div className="flex-grow">
                                        <span className="text-gray-600">Subtotal</span>
                                    </div>
                                    <div className="pl-3">
                                        <span className="font-semibold">{subTotal}</span>
                                    </div>
                                </div>

                            </div>
                            <div className="mb-6 pb-6 border-b border-gray-200 md:border-none text-gray-800 text-xl">
                                <div className="w-full flex items-center">
                                    <div className="flex-grow">
                                        <span className="text-gray-600">Total</span>
                                    </div>
                                    <div className="pl-3">
                                        <span className="font-semibold text-gray-400 text-sm">AUD</span> <span className="font-semibold">{total}</span>
                                    </div>
                                </div>
                            </div>

                            <button className="flex-none rounded-full bg-beige px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-beige focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-beige" onClick={handlePlaceOrder}>Complete Order</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
