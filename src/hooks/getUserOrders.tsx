import React, { useState, useEffect } from 'react'; // Add the missing import statement for React
import axios from "axios";
import { Order } from "../interfaces";
import { useRouter } from "next/navigation";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import moment from 'moment';
import { useSelector } from 'react-redux';

function getUserOrders()  {
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState<Order[]>([]);

    const getOrders = async () => {
        try {
            setLoading(true);
            const ls = typeof window !== "undefined" ? window.localStorage : null;
            const token= ls?.getItem('token') ? ls?.getItem('token')  : null

            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/api/my/orders`,
                {
                    headers: {
                        'Authorization': `Bearer ${ls?.getItem('token') }`
                    }
                }
            );
            setOrders(response.data.data);
        } catch (error: any) {
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { // Move the useEffect hook outside of the getUserOrders function
        getOrders();
    }, []);

    return  [orders, loading, getOrders] ;
}

export default getUserOrders;