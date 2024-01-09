"use client";
import React from 'react';
import { UserState } from '../../../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import SidebarProfile from '../../../components/Profile/SidebarProfile';
import AddressForm from "../../../components/Profile/AddressForm";
import AddressCard from "../../../components/Profile/AddressCard";
import axios from "axios";
import Swal from "sweetalert2";


const Addresses: React.FC = () => {
    const [loading, setLoading] = React.useState(false);
    const [loadingForDelete, setLoadingForDelete] = React.useState(false);
    const [showAddressForm, setShowAddressForm] = React.useState(false);
    const [selectedAddress, setSelectedAddress] = React.useState<any>(null);
    const [addresses, setِِAddresses] = React.useState([]);

    const getAddresses = async () => {
        try {
            setLoading(true);
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/api/addresses`,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            setِِAddresses(response.data.data);
        } catch (error: any) {


        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        getAddresses();
    });


    return (
        <div>
            {showAddressForm && (
                <AddressForm
                    showAddressForm={showAddressForm}
                    setShowAddressForm={setShowAddressForm}
                    selectedAddress={selectedAddress}
                    reloadData={() => getAddresses()}
                    setSelectedAddress={setSelectedAddress}
                />

            )}

            <SidebarProfile>

                <div className="bg-white mx-4 shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <div className="flex justify-between">
                            <h3 className="text-base font-semibold leading-6 text-gray-900">Addressess</h3>

                            <button
                                onClick={() => { setShowAddressForm(true) }}
                                className="rounded-md  px-3 py-2 bg-beige px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-beige focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Add new address
                            </button>

                        </div>


                    </div>
                </div>

                {addresses.map((address: any) => (
                    <AddressCard address={address}
                        setShowAddressForm={setShowAddressForm}
                        reloadData={() => getAddresses()}
                        setSelectedAddress={setSelectedAddress}

                    />


                ))}





            </SidebarProfile >


        </div>








    )

}




export default Addresses;