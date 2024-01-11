"use client";
import React from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'



interface AddressProps {
    reloadData: any,
    address: any,
    setSelectedAddress: any,
    setShowAddressForm: any,
    handleShowAddressForm: any

}
function DeliveryAddressCard(
    {
        setSelectedAddress,
        reloadData,
        setShowAddressForm,
        handleShowAddressForm,
        address
    }: AddressProps

) {

    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(' ')
    }

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

    const [loading, setLoading] = React.useState(false);
    const [loadingForDelete, setLoadingForDelete] = React.useState(false);


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
        </div>


    )

}

export default DeliveryAddressCard;