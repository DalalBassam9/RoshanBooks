"use client";
import React from 'react';
import SidebarProfile from '../../../../../components/Profile/SidebarProfile';
import { UserState } from '../../../../../redux/userSlice';
import {
    fetchUser,
    logoutUser
} from '../../../../../redux/userSlice';
import axios from "axios";
import { Order } from "../../../../../interfaces";
import useAuth from '../../../../lib/useAuth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

function Order({ params }: { params: any }) {
    const [loading, setLoading] = React.useState(false);
    const [order, setOrder] = React.useState<Order | null>();


    const getUserOrder = async () => {
        try {
            setLoading(true);
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/api/my/orders/${params.orderId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            setOrder(response.data.data);
        } catch (error: any) {
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };


    React.useEffect(() => {
        getUserOrder();
    }, []);

    return (
        <div>
            <SidebarProfile>
                <ToastContainer />
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center">
                        <div className="py-5 px-8 w-full rounded-md bg-white">
                            <h1>Ship To</h1>
                            <ul role="list">

                                {order && <li className="text-sm font-medium text-gray-900">{order.address.phone}</li>}
                                {order && <li className="text-sm font-medium text-gray-900">{order.address.firstName} {order.address.lastName}</li>}
                                {order && <li className="text-sm font-medium text-gray-900">{order.address.district}</li>}
                                {order && <li className="text-sm font-medium text-gray-900">{order.address.address}</li>}

                            </ul>
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
                                                    Product Name
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    quantity
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Price
                                                </th>

                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    total
                                                </th>
                                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                                    <span className="sr-only">Edit</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {order && order.orderItems && order.orderItems.map((order: any) => (

                                                <tr>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order?.product?.name}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.quantity}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.product.price}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.price}</td>
                                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
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

            </SidebarProfile>
        </div>
    );
}

export default Order;