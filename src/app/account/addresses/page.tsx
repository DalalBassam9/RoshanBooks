"use client";
import React from 'react';
import { UserState } from '../../../redux/userSlice';
import {
    fetchUser,
    logoutUser
} from '../../../redux/userSlice';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import Link from 'next/link';
import SidebarProfile from '../../../components/Profile/SidebarProfile';
import AddressForm from "../../../components/Profile/AddressForm";
import axios from "axios";
import Swal from "sweetalert2";


const Addresses: React.FC = () => {
    const [loading, setLoading] = React.useState(false);
    const [loadingForDelete, setLoadingForDelete] = React.useState(false);
    const [showAddressForm, setShowAddressForm] = React.useState(false);
    const [selectedAddress, setSelectedAddress] = React.useState<any>(null);
    const [addresses, setِِAddresses] = React.useState([]);

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

    const handleShowAddressForm = (address: any) => {
        setSelectedAddress(address);
        setShowAddressForm(true);
    };
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



    return (
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

            <SidebarProfile>

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

                {addresses.map((address: any) => (
                    <div className="mt-5">
                        <div className="rounded-md bg-gray-50 px-6 py-5 sm:flex sm:items-start sm:justify-between">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 sm:ml-4 sm:mt-0">
                                    {address.default === 1 ? (
                                        <p className="rounded-full bg-beige px-2.5 py-1 text-md font-semibold leading-5 text-white">
                                            default
                                        </p>
                                    ) :
                                        null

                                    }

                                    <ul>
                                        <li className="text-sm font-medium text-gray-900">{address.phone}</li>
                                        <li className="text-sm font-medium text-gray-900">{address.firstName} {address.lastName}</li>
                                        <li className="text-sm font-medium text-gray-900">{address.district}</li>
                                        <li className="text-sm font-medium text-gray-900">{address.city?.name}</li>
                                        <li className="text-sm font-medium text-gray-900">{address.address}</li>

                                    </ul>

                                </div>
                            </div>
                            <div className="mt-4 sm:ml-6 sm:mt-0 sm:flex-shrink-0">
                                {address.default === 0 ? (
                                    <button
                                        type="button"
                                        onClick={() => setDefaultAddress(address.addressId)}
                                        className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                    >
                                        set default
                                    </button>
                                ) :
                                    null

                                }

                                <button
                                    type="button"
                                    onClick={() => handleShowAddressForm(address)}
                                    className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => [
                                        setSelectedAddress(address),
                                        deleteAddress(address.addressId),
                                    ]}
                                    type="button"
                                    className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>

                    </div>





                ))}






            </SidebarProfile >


        </div>








    )

}




export default Addresses;