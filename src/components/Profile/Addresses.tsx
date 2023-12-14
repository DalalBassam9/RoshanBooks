"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AddressForm from "./AddressForm";
import axios from "axios";
import Swal from "sweetalert2";

const Addresses: React.FC = () => {
    const router = useRouter();


    const [loading, setLoading] = React.useState(false);
    const [loadingForDelete, setLoadingForDelete] = React.useState(false);
    const [showAddressForm, setShowAddressForm] = React.useState(false);
    const [selectedAddress, setSelectedAddress] = React.useState<any>(null);
    const [addresses, setِِAddresses] = React.useState([]);

    const getAddresses = async () => {
        try {
            setLoading(true);
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/api/my/addresses`,
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
            await axios.delete(process.env.NEXT_PUBLIC_API_URL + "/api/my/addresses/" + addressId,
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
        <div className="bg-white">
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

            {addresses.map((address: any) => (
                <div className="mt-5">
                    <div className="rounded-md bg-gray-50 px-6 py-5 sm:flex sm:items-start sm:justify-between">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 sm:ml-4 sm:mt-0">

                                <div className="text-sm font-medium text-gray-900">{address.phone}</div>
                                <div className="text-sm font-medium text-gray-900">{address.firstName} {address.lastName}</div>
                                <div className="mt-1 text-sm text-gray-600 sm:flex sm:items-center">
                                    <div>Expires 12/20</div>
                                    <span className="hidden sm:mx-2 sm:inline" aria-hidden="true">
                                        &middot;
                                    </span>
                                    <div className="mt-1 sm:mt-0">Last updated on 22 Aug 2017</div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 sm:ml-6 sm:mt-0 sm:flex-shrink-0">
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








        </div>








    )
}



export default Addresses;
