"use client"
import React, { useState } from 'react';
import axios from 'axios';
import OrderItemSummary from "../../../components/Order/OrderItemSummary";
import OrderAddressCard from "../../../components/Order/OrderAddressCard";
import { Order } from "../../../interfaces";
import { useRouter } from "next/navigation";
import FrontLayout from '../../../components/FrontLayout';
import useAuth from '../../lib/useAuth';

const ThankYou = () => {
    useAuth({ middleware: 'auth' })
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const [order, setِِOrder] = React.useState<Order>();
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
            setِِOrder(response.data.data);
        } catch (error: any) {
        } finally {
            setLoading(false);
        }
    };
    React.useEffect(() => {
        getPlacedOrder();
    }, []);
    return (
        <div>

            <FrontLayout>
                <div className="mt-4 mb-6 grid grid-cols-2 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
                    <div className="lg:col-span-2 col-span-3 space-y-8 px-12">

                        <div className="mt-8 p-4  bg-white shadow rounded-md">
                            <div className="py-5  rounded-md bg-white">
                                <h1>Thank You Page</h1>
                                <p>Your order was successful. Thank you for shopping with us!</p>
                            </div>
                        </div>

                        <div className="mt-4 p-4 relative flex flex-col  bg-white shadow rounded-md">

                            <div className="py-5 my-4 rounded-md bg-white">
                                <h1 className='border-b py-2 mb-2 border-gray-900/10 '>Ship To</h1>
                                {order &&
                                    <OrderAddressCard order={order} />
                                }
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-1 col-span-3 mt-4 space-y-4 mr-6 mb-8 px-4">
                        <div className="mt-4 p-4 relative flex flex-col  bg-white shadow rounded-md">
                            <div className="py-5  rounded-md bg-white">

                                <div className="px-3">
                                    {order && order.orderItems && order.orderItems.map((orderItem: any) => (
                                        <OrderItemSummary key={orderItem.orderItemsId} orderItem={orderItem} />
                                    ))}
                                    <div className="mb-6 pb-6 border-b border-gray-200 md:border-none text-gray-800 text-xl">
                                        <div className="w-full flex items-center">
                                            <div className="flex-grow">
                                                <span className="text-gray-600">Total</span>
                                            </div>
                                            <div className="pl-3">
                                                <span className="font-semibold">{order && order.totalPrice} JD</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button className="w-full flex-none rounded-full bg-beige px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-beige focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-beige"  onClick={() => order && router.push(`/account/orders/order/${order.orderId}`)}>View Order</button>
                            </div>
                        </div>
                    </div>
                </div>

            </FrontLayout>
        </div>
    );
};

export default ThankYou;