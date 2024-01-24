"use client";
import React from 'react';
import SidebarProfile from '../../../components/Profile/SidebarProfile';
import AddressForm from "../../../components/Profile/AddressForm";
import AddressCard from "../../../components/Profile/AddressCard";
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import Swal from "sweetalert2";
import useAuth from '../../lib/useAuth';
import FrontLayout from '../../../components/FrontLayout';


const Addresses: React.FC = () => {


    const [loading, setLoading] = React.useState(false);
    const [loadingForDelete, setLoadingForDelete] = React.useState(false);
    const [showAddressForm, setShowAddressForm] = React.useState(false);
    const [selectedAddress, setSelectedAddress] = React.useState<any>(null);
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

    React.useEffect(() => {
        getAddresses();
    }, []);

    return (
        <div>
            <FrontLayout>
                <SidebarProfile>
                    <ToastContainer />
                    {showAddressForm && (
                        <AddressForm
                            showAddressForm={showAddressForm}
                            setShowAddressForm={setShowAddressForm}
                            selectedAddress={selectedAddress}
                            reloadData={() => getAddresses()}
                            setSelectedAddress={setSelectedAddress}
                        />

                    )}
                    <div className="bg-white  mx-4 shadow sm:rounded-lg">
                        <div className="px-4 py-2 sm:p-6">
                            <div className="flex justify-between">
                                <h3 className="text-base font-semibold leading-6 text-gray-900">Addressess</h3>

                                <button
                                    onClick={() => { setShowAddressForm(true) }}
                                    className="rounded-xl  px-3 py-2 bg-beige px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-beige focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                                >
                                    Add new address
                                </button>
                            </div>
                        </div>
                    </div>

                    {addresses.length > 0 && (
                        addresses && addresses.map((address: any,index:any) => (
                            <AddressCard
                                key={index}
                                address={address}
                                setShowAddressForm={setShowAddressForm}
                                reloadData={() => getAddresses()}
                                setSelectedAddress={setSelectedAddress}

                            />

                        ))

                    )}
                    {addresses.length === 0 && (
                        <div className="flex flex-col items-center justify-center gap-5 mt-10">
                            <i className="text-5xl"></i>
                            <h1 className="text-xl">No there Addressess</h1>
                        </div>
                    )}

                </SidebarProfile>
            </FrontLayout>
        </div>

    )

}




export default Addresses;