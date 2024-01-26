"use client";
import React from 'react';
import SidebarProfile from '../../../../../components/Profile/SidebarProfile';
import axios from "axios";
import { Order } from "../../../../../interfaces";
import useAuth from '../../../../lib/useAuth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import orders from 'src/app/admin/orders/page';
import FrontLayout from '../../../../../components/FrontLayout';
import { useSelector } from 'react-redux';

function Order({ params }: { params: any }) {
    const [loading, setLoading] = React.useState(false);
    const [order, setOrder] = React.useState<Order | null>();
    const token = useSelector((state: any) => state.user.token);
    const getUserOrder = async () => {
        try {
            setLoading(true);
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/api/my/orders/${params.orderId}`,
            {
                headers: {
                  'Authorization': `Bearer ${token}`
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
            <FrontLayout>
                <SidebarProfile>
                    <ToastContainer />
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="sm:flex sm:items-center">
                            <div className="py-5 px-8 w-full rounded-md bg-white">

                                <h1 className='border-b py-2 mb-2 border-gray-900/10 '>Ship To</h1>
                                <ul role="list">

                                    {order && <li className="text-sm py-1 font-medium text-gray-900">{order.address.phone}</li>}
                                    {order && <li className="text-sm py-1 font-medium text-gray-900">{order.address.firstName} {order.address.lastName}</li>}
                                    {order && <li className="text-sm py-1 font-medium text-gray-900">{order.address.district}</li>}
                                    {order && <li className="text-sm py-1 font-medium text-gray-900">{order.address.address}</li>}

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
                                                        Product Price
                                                    </th>

                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                        total
                                                    </th>



                                                </tr>



                                            </thead>
                                            <tbody className="divide-y divide-gray-200 bg-white">
                                                {order && order.orderItems && order.orderItems.map((orderItem: any,index:any) => (
                                                    <tr key={index} >
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{orderItem?.product?.name}</td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{orderItem.quantity}</td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{orderItem.product.price} JD</td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{orderItem.product.price * orderItem.quantity} JD</td>
                                                    </tr>
                                                ))}
                                                {order &&
                                                    <tr>
                                                        <td colSpan={3} className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Sub Total</td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                            {order.orderItems.reduce((sum: number, item: any) => sum + (item.product.price * item.quantity), 0)} JD
                                                        </td>
                                                    </tr>
                                                }
                                                <tr>
                                                    <td colSpan={3} className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Shipping</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">3 JD</td>
                                                </tr>
                                                {order &&
                                                    <tr>
                                                        <td colSpan={3} className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Total Price</td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.totalPrice} JD</td>
                                                    </tr>
                                                }

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </SidebarProfile>
            </FrontLayout>
        </div>
    );
}

export default Order;