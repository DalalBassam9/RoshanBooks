"use client"
import React, { useState, useEffect } from 'react';
import axios from "axios";
import Link from 'next/link';

interface Order {
    orderId: number,
    totalPrice: number,
    status: string,
    addressId: number,
    orderItems: OrderItem[];
    address: address
}

interface OrderItem {
    id: number;
    productName: string;
    quantity: number;
    price: number;
}
interface address {
    phone: number;
    city: city;
    district: string;
    address: string;
    firstName: string;
    lastName: string;
}
interface city {
    name: string;
}

const Orders: React.FC = () => {
    const [loading, setLoading] = React.useState(false);
    const [orders, setOrders] = React.useState<Order[]>([]);

    const getUserOrders = async () => {
        try {
            setLoading(true);
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/api/my/orders`,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            setOrders(response.data.data);
        } catch (error: any) {


        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        getUserOrders();
    });


    return (
        <div>
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-base font-semibold leading-6 text-gray-900">Users</h1>
                        <p className="mt-2 text-sm text-gray-700">
                            A list of all the users in your account including their name, title, email and role.
                        </p>
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <button
                            type="button"
                            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Add user
                        </button>
                    </div>
                </div>
                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">

                                <table className="min-w-full divide-y divide-gray-300">

                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                Order Id
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Status
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Total Price
                                            </th>
                            
                                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                                <span className="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {orders.map((order) => (
                                            <tr>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">#{order.orderId}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.status}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.totalPrice}</td>
                                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">

                                                    <Link className="text-indigo-600 hover:text-indigo-900"  href={`/profile/order/${order.orderId}`} passHref>  
                                                       view order
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         
        </div>
    )
}


export default Orders;