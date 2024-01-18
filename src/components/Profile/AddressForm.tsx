"use client"
import React, { useEffect } from 'react';
import * as Yup from 'yup';
import axios from "axios";
import Swal from "sweetalert2";
import Modal from 'react-modal';
import { toast } from 'react-toastify';

interface AddressFormProps {
    showAddressForm: boolean;
    setShowAddressForm: (show: boolean) => void;
    reloadData: () => void;
    selectedAddress: any;
    setSelectedAddress: (category: any) => void;
}
interface FormData {
    phone: string;
    cityId: string;
    address: string;
    firstName: any;
    lastName: string;
    district: string;

}

const schema = Yup.object({
    phone: Yup.string()
        .required('Phone is required'),
    cityId: Yup.string()
        .required('City ID is required'),
    address: Yup.string()
        .required('Address is required'),
    firstName: Yup.string()
        .required('First name is required'),
    lastName: Yup.string()
        .required('Last name is required'),
    district: Yup.string()
        .required('District is required'),
});

function AddressForm({
    showAddressForm,
    setShowAddressForm,
    reloadData,
    selectedAddress,
    setSelectedAddress,
}: AddressFormProps) {
    const [loading = false, setLoading] = React.useState<boolean>(false);
    const [errors, setErrors] = React.useState<Record<string, string>>({});
    const [cities, setCities] = React.useState([]);
    const [formData, setFormData] = React.useState<FormData>({
        phone: "",
        cityId: "",
        address: "",
        firstName: "",
        lastName: "",
        district: "",
    });

    const handleClose = () => {
        setShowAddressForm(false);
        setSelectedAddress(null);

    };
    const validateField = async (field: string, value: string) => {
        try {
            await schema.validateAt(field, { [field]: value });
            setErrors((prevErrors) => ({
                ...prevErrors,
                [field]: '',
            }));
        } catch (error: any) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [field]: error.message,
            }));
        }
    };
    const handleChange = (field: string, value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));

        validateField(field, value);
    };

    const getCities = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/admin/cities-lookups");
            setCities(response.data.cities);
        } catch (error: any) {
            toast.error(error.response?.data?.message || error.message);
        }
    };


    React.useEffect(() => {
        getCities();

        if (selectedAddress) {
            setFormData({
                firstName: selectedAddress.firstName,
                lastName: selectedAddress.lastName,
                phone: selectedAddress.phone,
                cityId: selectedAddress.cityId,
                address: selectedAddress.address,
                district: selectedAddress.district
            });
        } else {
            setFormData({
                firstName: '',
                lastName: '',
                phone: '',
                cityId: '',
                address: '',
                district: '',
            });
        }
    }, [selectedAddress]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            await schema.validate(formData, { abortEarly: false });
            if (selectedAddress) {
                await axios.put(process.env.NEXT_PUBLIC_API_URL + `/api/addresses/` + selectedAddress.addressId, formData,
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    }

                );
                toast.success('Address updated successfully');
            } else {
                await axios.post(process.env.NEXT_PUBLIC_API_URL + `/api/addresses`, formData,
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    }

                );
                toast.success('Address Created successfully');
            }
            setShowAddressForm(false);
            setSelectedAddress(null);
            reloadData();
        } catch (error: any) {
            if (error instanceof Yup.ValidationError) {
                const errors: { [key: string]: string } = {}; // Specify the type of 'errors' object
                error.inner.forEach((error: any) => {
                    errors[error.path] = error.message;
                });
                setErrors(errors);
            } else {
                toast.error(error.response?.data?.message || error.message);
                setShowAddressForm(false);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Modal
                isOpen={showAddressForm}
                onRequestClose={handleClose}
                className="m-auto p-4 my-4 bg-white rounded shadow-lg w-full h-full overflow-auto sm:h-auto sm:w-3/4 md:w-1/2"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex"
            >
                <form noValidate autoComplete="off" onSubmit={handleSubmit} >
                    <div className="p-6 pb-12">
                        <h2 className="text-base  pb-4  border-b  border-gray-900/10  font-semibold leading-7 text-gray-900">
                            {selectedAddress ? 'Update Address' : 'Add Address'}</h2>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    First name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="firstName"
                                        id="first-name"
                                        value={formData.firstName}
                                        onChange={(e) => handleChange('firstName', e.target.value)}
                                        autoComplete="given-name"
                                        className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-beige  sm:text-sm ${errors.firstName} 'border-red-500' : ''}`}
                                    />
                                    <div className="text-red-500 text-sm mt-2">{errors.firstName}</div>

                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Last name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="lastName"
                                        id="last-name"
                                        value={formData.lastName}
                                        onChange={(e) => handleChange('lastName', e.target.value)}
                                        autoComplete="family-name"
                                        className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-beige  sm:text-sm ${errors.lastName} 'border-red-500' : ''}`}

                                    />
                                    <div className="text-red-500 text-sm mt-2">{errors.lastName}</div>

                                </div>
                            </div>



                            <div className="sm:col-span-2 sm:col-start-1">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    City
                                </label>
                                <div className="mt-2">

                                    <select
                                        className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-beige  sm:text-sm ${errors.cityId ? 'border-red-500' : ''}`}
                                        value={formData.cityId}
                                        onChange={(e) => handleChange('cityId', e.target.value)}
                                    >
                                        <option value="">Select a city</option>
                                        {cities.map((city: any) => (
                                            <option key={city.cityId} value={city.cityId}>
                                                {city.name}
                                            </option>
                                        ))}
                                    </select>

                                    <div className="text-red-500 text-sm mt-2">{errors.cityId}</div>

                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                    phone
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        value={formData.phone}
                                        onChange={(e) => handleChange('phone', e.target.value)}

                                        autoComplete="phone"

                                        className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-beige  sm:text-sm ${errors.phone ? 'border-red-500' : ''}`}



                                    />
                                    <div className="text-red-500 text-sm mt-2">{errors.phone}</div>

                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="district" className="block text-sm font-medium leading-6 text-gray-900">
                                    district
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="district"
                                        id="district"
                                        value={formData.district}
                                        onChange={(e) => handleChange('district', e.target.value)}
                                        autoComplete="district"
                                        className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-beige  sm:text-sm ${errors.district ? 'border-red-500' : ''}`}


                                    />
                                    <div className="text-red-500 text-sm mt-2">{errors.district}</div>


                                </div>
                            </div>

                            <div className="sm:col-span-5">
                                <label htmlFor="address" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Address
                                </label>
                                <div className="mt-2.5">
                                    <textarea
                                        name="address"
                                        id="address"
                                        value={formData.address}
                                        onChange={(e) => handleChange('address', e.target.value)}
                                        rows={4}
                                      
                                        className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-beige  sm:text-sm ${errors.address ? 'border-red-500' : ''}`}

                                        defaultValue={''}
                                    />

                                    <div className="text-red-500 text-sm mt-2">{errors.address}</div>
                                </div>
                            </div>



                        </div>
                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button type="button"
                                onClick={handleClose}
                                className="text-sm rounded-xl px-3 py-2   bg-gray-200 font-semibold leading-6 text-gray-900">
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`rounded-xl bg-beige px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-beige focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-beige ${loading ? 'opacity-50' : ''}`}
                            >
                                {loading ? 'Loading...' : 'Save'}
                            </button>
                        </div>

                    </div>
                </form>
            </Modal>
        </div>


    )
}


export default AddressForm;