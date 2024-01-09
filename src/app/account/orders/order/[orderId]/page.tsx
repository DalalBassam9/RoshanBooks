"use client";
import React from 'react';
import Wishlist from '../../../../../components/Profile/Wishlist';
import SidebarProfile from '../../../../../components/Profile/SidebarProfile';
import { UserState } from '../../../../../redux/userSlice';
import {
    fetchUser,
    logoutUser
} from '../../../../../redux/userSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import axios from "axios";
import { Order } from "../../../../../interfaces";

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

        } finally {
            setLoading(false);
        }
    };
    React.useEffect(() => {
        getUserOrder();
    });

    const dispatch: ThunkDispatch<UserState, unknown, AnyAction> = useDispatch();
    const user = useSelector((state: { user: UserState }) => state.user.user);

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    return (
        <div>
            <SidebarProfile>
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center">
                        <div className="py-5 px-8 w-1/2 rounded-md bg-white">
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
                                            {order && order.order_items && order.order_items.map((order: any) => (

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