"use client";
import React from 'react';
import { toast } from 'react-toastify';
import {
    fetchUser,
    logoutUser
} from '../../redux/userSlice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from "axios";
import Swal from "sweetalert2";
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
interface InfoUserData {
    firstName: any;
    lastName: any;
    email: string;
    phone: string

}

const userSchema = Yup.object().shape({
    firstName: Yup.string().required('first Name  is required'),
    lastName: Yup.string().required('last Name  is required'),
    phone: Yup.string().required('phone is required'),
    email: Yup.string().required('email is required'),

});


const UpdateAccountInformation = () => {

    const dispatch = useDispatch();
    const user = useSelector((state: { user: any }) => state.user.user);

    const token = useSelector((state: any) => state.user.token);

    const [userData, setUserData] = useState<InfoUserData>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",

    });

    const [errors, setErrors] = React.useState<Record<string, string>>({});
    const [loading = false, setLoading] = React.useState<boolean>(false);


    const validateField = async (field: string, value: string) => {
        try {
            await userSchema.validateAt(field, { [field]: value });
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
        setUserData((prevData) => ({
            ...prevData,
            [field]: value,
        }));

        validateField(field, value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            setLoading(true);

            await userSchema.validate(userData, { abortEarly: false });

            const response = await axios.put(process.env.NEXT_PUBLIC_API_URL + "/api/my/update-Information", userData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            toast.success('Info User Updated successfully');

        }
        catch (error: any) {
            if (error instanceof Yup.ValidationError) {
                const errors: { [key: string]: string } = {}; // Specify the type of 'errors' as an object with string keys and string values
                error.inner.forEach((error: any) => {
                    errors[error.path] = error.message;
                });
                setErrors(errors);
            } else {
                toast.error(error.response?.data?.message || error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleUserCancel = () => {
        setUserData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
        });

    };

    useEffect(() => {
        dispatch(fetchUser() as any)
            .then((action: any) => {
                if (action.payload) {
                    setUserData(action.payload);
                }
            });
    }, [dispatch]);

    return (
        <div>

            <form noValidate autoComplete="off" onSubmit={handleSubmit} >
                <div className="mt-8  border-t border-gray-900/10">
                    <h2 className="text-base my-4  font-semibold leading-7 text-gray-900">Personal Information</h2>
                    <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                        <div className="sm:col-span-3">
                            <label htmlFor="first-name" className="block  text-sm font-medium leading-6 text-gray-900">
                                First name
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="firstName"
                                    id="first-name"
                                    value={userData.firstName}
                                    onChange={(e) => handleChange('firstName', e.target.value)}
                                    className={`block w-full form-input rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-beige sm:text-sm ${errors.firstName ? 'border-red-500' : ''}`}
                                    autoComplete="given-name"
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
                                    id="last-name" value={userData.lastName}
                                    onChange={(e) => handleChange('lastName', e.target.value)}
                                    className={`form-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-beige  sm:text-sm ${errors.lastName ? 'border-red-500' : ''}`}


                                />

                                <div className="text-red-500 text-sm mt-2">{errors.lastName}</div>
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                Phone
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    value={userData.phone}
                                    onChange={(e) => handleChange('phone', e.target.value)}
                                    className={` block  form-input w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-beige  sm:text-sm ${errors.phone ? 'border-red-500' : ''}`}

                                />

                                <div className="text-red-500 text-sm mt-2">{errors.phone}</div>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    value={userData.email}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    className={`block form-input w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-beige  sm:text-sm ${errors.email ? 'border-red-500' : ''}`}

                                />

                                <div className="text-red-500 text-sm mt-2">{errors.email}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button"
                        onClick={handleUserCancel} className="text-sm  px-3 py-2   bg-gray-200 rounded-xl  font-semibold leading-6 text-gray-900">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`rounded-xl bg-beige px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-beige focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${loading ? 'opacity-50' : ''}`}
                    >
                        {loading ? 'Loading...' : 'Update'}
                    </button>
                </div>
            </form>

        </div>

    );
}

export default UpdateAccountInformation;