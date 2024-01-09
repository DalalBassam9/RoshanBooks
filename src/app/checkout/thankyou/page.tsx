"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { RadioGroup } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSession, signIn, signOut } from 'next-auth/react';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { useRouter } from 'next/navigation';
import OrderItemSummary from "../../../components/Order/OrderItemSummary";
import OrderAddressCard from "../../../components/Order/OrderAddressCard";



interface Order {
    orderId: number,
    totalPrice: number,
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
const ThankYou = () => {
    const [addresses, setِِAddresses] = React.useState([]);
    const [items, setِItems] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [order, setِِOrder] = React.useState<Order>({
        orderId: '',
        totalPrice: '',
        orderItems: '',
        address: '',
    });
    const getPlacedOrder = async () => {
        try {
            setLoading(true);
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/api/checkout/success`,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            setِِOrder(response.data.order);
        } catch (error: any) {
        } finally {
            setLoading(false);
        }
    };
    React.useEffect(() => {
        getPlacedOrder();
    });
    return (
        <div>
            <div className="mt-4 grid grid-cols-2 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
                <div className="lg:col-span-2 col-span-3 bg-indigo-50 space-y-8 px-12">

                    <div className="mt-8 p-4  bg-white shadow rounded-md">
                        <div className="py-5  rounded-md bg-white">
                            <h1>Thank You Page</h1>
                            <p>Your order was successful. Thank you for shopping with us!</p>
                        </div>
                    </div>

                    <div className="mt-8 p-4 relative flex flex-col  bg-white shadow rounded-md">

                        <div className="py-5  rounded-md bg-white">
                            <h1>Ship To</h1>
                           <OrderAddressCard order={order} />
                        </div>
                    </div>
                </div>
                <div className="md:col-span-1 col-span-3  bg-indigo-50 space-y-8 px-12">
                    <div className="mt-8 p-4 relative flex flex-col sm:flex-row sm:items-center bg-white shadow rounded-md">
                        <div className="">
                            <div className="px-3">
                                {order && order.order_items && order.order_items.map((orderItem: any) => (
                                    <OrderItemSummary orderItem={orderItem} />
                                ))}
                                <div className="mb-6 pb-6 border-b border-gray-200 md:border-none text-gray-800 text-xl">
                                    <div className="w-full flex items-center">
                                        <div className="flex-grow">
                                            <span className="text-gray-600">Total</span>
                                        </div>
                                        <div className="pl-3">
                                            <span className="font-semibold text-gray-400 text-sm">AUD</span> <span className="font-semibold">{order.totalPrice}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThankYou;