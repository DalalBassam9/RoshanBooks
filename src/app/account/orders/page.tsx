"use client"
import React, { useState } from 'react';
import axios from "axios";
import SidebarProfile from '../../../components/Profile/SidebarProfile';
import { Order } from "../../../interfaces";
import { useRouter } from "next/navigation";
import useAuth from '../../lib/useAuth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import FrontLayout from '../../../components/FrontLayout';
import moment from 'moment';

const Orders: React.FC = () => {
    const router = useRouter();
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
            toast.error(error.response?.data?.message || error.message);

        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        getUserOrders();
    }, []);


    return (
        <div>
            <FrontLayout>
                <SidebarProfile>
                    <ToastContainer />
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="sm:flex sm:items-center">
                            {orders.length > 0 && (
                                <div className="sm:flex-auto">
                                    <h1 className="text-base font-semibold leading-6 text-gray-900">Orders</h1>
                                    <p className="mt-2 text-sm text-gray-700">
                                        A list of all my orders.
                                    </p>


                                </div>
                            )}

                        </div>
                        {orders.length > 0 && (

                            <div className="mt-4">
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
                                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                            Created At
                                                        </th>
                                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                                            <span className="sr-only">Edit</span>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200 bg-white">
                                                    {orders && orders.map((order) => (
                                                        <tr key={order.orderId}>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">#{order.orderId}</td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.status}</td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.totalPrice} JD</td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{moment(order.created_at).format("DD MMM YYYY hh:mm A")}</td>
                                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">

                                                                <button className="text-beige hover:text-beige" onClick={() => router.push(`./orders/order/${order.orderId}`)}>
                                                                    view order
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {orders.length === 0 && (
                            <div className="flex flex-col items-center justify-center gap-5 mt-10">
                                <i className="text-5xl"></i>
                                <h1 className="text-xl">My orders is empty</h1>
                            </div>
                        )}

                    </div>

                </SidebarProfile>

            </FrontLayout>
        </div>
    )
}


export default Orders;