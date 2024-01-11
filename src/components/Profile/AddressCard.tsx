"use client";
import React from 'react';
import axios from "axios";
import Swal from "sweetalert2";

interface AddressProps {
    reloadData: any,
    address: any,
    setSelectedAddress: any,
    setShowAddressForm: any

}
function AddressCard(
    {
        setSelectedAddress,
        reloadData,
        setShowAddressForm,
        address
    }: AddressProps

) {

    const [loading, setLoading] = React.useState(false);
    const [loadingForDelete, setLoadingForDelete] = React.useState(false);


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
            reloadData();
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
            reloadData();
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
            <div className="mt-5 mx-4">
                <div className="rounded-md bg-white px-6 py-5 sm:flex sm:items-start sm:justify-between">
                    <div className="sm:flex sm:items-start">
                        <div className="mt-3 sm:ml-4 sm:mt-0">

                            <div className="my-2">
                                {address.default === 1 ? (
                                    <span className="rounded-full bg-beige px-2.5 py-1 text-md font-semibold leading-5 text-white">
                                        default
                                    </span>
                                ) :
                                    null

                                }

                            </div>

                            <div>
                                <ul>
                                    <li className="text-sm py-2 font-medium text-gray-900">{address.phone}</li>
                                    <li className="text-sm py-1 font-medium text-gray-900">{address.firstName} {address.lastName}</li>
                                    <li className="text-sm py-1 font-medium text-gray-900">{address.district}</li>
                                    <li className="text-sm py-1 font-medium text-gray-900">{address.city?.name}</li>
                                    <li className="text-sm py-1 font-medium text-gray-900">{address.address}</li>

                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 sm:ml-6 sm:mt-0 sm:flex-shrink-0">
                        {address.default === 0 ? (
                            <button
                                type="button"
                                onClick={() => setDefaultAddress(address.addressId)}
                                className="inline-flex mx-1 items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                                set default
                            </button>
                        ) :
                            null

                        }

                        <button
                            type="button"
                            onClick={() => handleShowAddressForm(address)}
                            className="inline-flex mx-1 items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => [
                                setSelectedAddress(address),
                                deleteAddress(address.addressId),
                            ]}
                            type="button"
                            className="inline-flex mx-1 items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                            Delete
                        </button>
                    </div>
                </div>

            </div>

        </div>


    )

}




export default AddressCard;