import React from 'react';
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import Swal from "sweetalert2";
import { useSelector } from 'react-redux';

function useAddresses() {
    const [loading, setLoading] = React.useState(false);
    const [addresses, setAddresses] = React.useState([]);

    const getAddresses = async () => {
        setLoading(true);
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/api/addresses`,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            setAddresses(response.data.data);
        } catch (error: any) {
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };
    React.useEffect(() => { // Move the useEffect hook outside of the getUserOrders function
        getAddresses();
    }, []);

    return [addresses, loading, getAddresses];
}

export default useAddresses;