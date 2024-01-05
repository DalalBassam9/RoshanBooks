"use client";
import React from 'react';
import useAuth from '../lib/useAuth';
import Tabs from '../../components/Tabs/Tabs';
import { UserState } from '../../redux/userSlice';

import {
    fetchUser,
    logoutUser
} from '../../redux/userSlice';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

import SidebarProfile from '../../components/Profile/SidebarProfile';
import { Fragment } from 'react'
import axios from "axios";
import { Dialog, Transition } from '@headlessui/react'
import Modal from 'react-modal';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import Swal from "sweetalert2";
import * as Yup from 'yup';

interface InfoUserData {
    firstName: any;
    lastName: any;
    email: string;
    phone: string

}

interface PasswordUserData {
    password: string;
    passwordConfirmation: string;

}

const userSchema = Yup.object().shape({
    firstName: Yup.string().required('firstName  is required'),
    lastName: Yup.string().required('lastName  is required'),
    phone: Yup.string().required('phone is required'),
    email: Yup.string().required('email is required'),

});


const passwordSchema = Yup.object().shape({
    password: Yup.string()
        .required('Password is required'),
    passwordConfirmation: Yup.string()
        .required('Password confirmation is required'),

});


const AccountInformation: React.FC = () => {
    const [userData, setUserData] = useState<InfoUserData>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",

    });
    const [passwordData, setPasswordData] = useState<PasswordUserData>({
        password: "",
        passwordConfirmation: "",

    });


    const dispatch: ThunkDispatch<UserState, unknown, AnyAction> = useDispatch();
    const user = useSelector((state: { user: UserState }) => state.user.user);
    const [image, setImage] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [errors, setErrors] = React.useState<Record<string, string>>({});
    const [loading = false, setLoading] = React.useState<boolean>(false);
    const [loadingPassword = false, setLoadingPassword] = React.useState<boolean>(false);

    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleImageRemove = () => {
        setImage(null);
    };

    const openModal = () => {
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setModalIsOpen(false);
    }


    const handleImageUpload = async () => {
        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/api/my/update-image", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Image update successfully',
            })

            setModalIsOpen(false);
            dispatch(fetchUser());

            // Handle success, e.g., update user profile with the image URL.
        } catch (error) {
            console.error('Error uploading image:', error);
            // Handle error
        }
    };


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

    const validatePasswordField = async (field: string, value: string) => {
        try {
            await passwordSchema.validateAt(field, { [field]: value });
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
    const handlePasswordChange = (field: string, value: string) => {
        setPasswordData((prevData) => ({
            ...prevData,
            [field]: value,
        }));

        validatePasswordField(field, value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            setLoading(true);
            await userSchema.validate(userData, { abortEarly: false });

            const response = await axios.put(process.env.NEXT_PUBLIC_API_URL + "/api/my/update-Information", userData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            //handleUserCancel(); 
            // setUserData(response.data.data);

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Info User Updated successfully',
            });
        }
        catch (error: any) {
            if (error instanceof Yup.ValidationError) {
                const errors: { [key: string]: string } = {}; // Specify the type of 'errors' as an object with string keys and string values
                error.inner.forEach((error: any) => {
                    errors[error.path] = error.message;
                });
                setErrors(errors);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response?.data?.message || error.message, // Use optional chaining to access the 'message' property
                });
            }
        } finally {
            setLoading(false);
        }
    };
    const handlePasswordSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            setLoadingPassword(true);
            await passwordSchema.validate(passwordData, { abortEarly: false });

            const response = await axios.put(process.env.NEXT_PUBLIC_API_URL + "/api/my/update-password", passwordData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Password Updated successfully',
            })
        }
        catch (error: any) {
            if (error instanceof Yup.ValidationError) {
                const errors: { [key: string]: string } = {}; // Specify the type of 'errors' as an object with string keys and string values
                error.inner.forEach((error: any) => {
                    errors[error.path] = error.message;
                });
                setErrors(errors);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response?.data?.message || error.message, // Use optional chaining to access the 'message' property
                });
            }
        } finally {
            setLoadingPassword(false);
        }
    };
    const handlePasswordCancel = () => {
        setPasswordData({
            password: "",
            passwordConfirmation: "",
        });

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
        dispatch(fetchUser())
            .then((action) => {
                if (action.payload) {
                    setUserData(action.payload);
                }
            });
    }, [dispatch]);

    return (
        <div>
            <SidebarProfile>

                <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
                    <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
                        <div className="ml-4 mt-4">
                            <div className="overflow-hidden  mt-8
          max-w-6xl
          mx-auto
          grid grid-cols-1
          gap-6
          sm:px-6
          lg:max-w-7xl ">
                                <div className="flex items-center">
                                    <div className="sm:flex sm:items-center sm:justify-between">
                                        <div className="sm:flex sm:space-x-5">
                                            <div className="flex-shrink-0">
                                                {user?.image ? (
                                                    <img
                                                        className="mx-auto h-40 w-40 rounded-full border-beige border-4"
                                                        src={user?.image}
                                                    />
                                                ) : (
                                                    <img
                                                        className='rounded-full h-44 w-44 border-beige border-4'
                                                        src="https://www.ubuy.com.jo/skin/frontend/default/ubuycom-v1/images/default-avatar.jpg"
                                                    />
                                                )}


                                            </div>
                                            <div className="mt-4 text-center sm:mt-4 sm:pt-1 sm:text-left">
                                                <p className="text-xl font-medium text-gray-600">Welcome back,</p>
                                                <p className="text-xl font-bold text-gray-900 sm:text-2xl">{user?.firstName}</p>
                                                <p className="text-xl font-medium text-gray-600">{user?.email}</p>

                                            </div>
                                        </div>
                                    </div>
                                    <div>

                                        <Modal
                                            isOpen={modalIsOpen}
                                            onRequestClose={closeModal}
                                            className="m-auto p-4 bg-white rounded shadow-lg lg:w-1/3  w-1/2 "
                                            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex"
                                        >

                                            <div className="bg-white relative   px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                                <div className="sm:flex sm:items-start">

                                                    <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                                                        <button type="button" onClick={closeModal} className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">

                                                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                    <div className="mt-3 mx-auto text-center ">

                                                        <div className=" flex rounded-lg  border my-6 border-dashed border-gray-900/25 px-20 py-14">
                                                            <div className="text-center">
                                                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                                    {image ? (
                                                                        <div>
                                                                            <img src={URL.createObjectURL(image)} className="h-40 w-40" alt="Preview" />
                                                                            <button onClick={handleImageRemove}>Remove Image</button>

                                                                        </div>
                                                                    ) : (

                                                                        <div>
                                                                            <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                                                            <label
                                                                                htmlFor="file-upload"
                                                                                className="relative cursor-pointer  rounded-md bg-white font-semibold text-beige focus-within:outline-none focus-within:ring-2 focus-within:ring-beige focus-within:ring-offset-2"
                                                                            >
                                                                                <span>Upload a file</span>
                                                                                <input
                                                                                    onChange={handleImageChange}
                                                                                    id="file-upload"
                                                                                    name="file-upload"
                                                                                    type="file"
                                                                                    className="sr-only"
                                                                                />
                                                                            </label>
                                                                        </div>
                                                                    )}

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                    <button
                                                        onClick={handleImageUpload}
                                                        className="rounded-md  px-3 py-2 bg-beige px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-beige focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                    >
                                                        Update
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="mt-3 mr-2 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                        onClick={closeModal}

                                                    >
                                                        Cancel
                                                    </button>
                                                </div>








                                            </div>

                                        </Modal>
                                    </div>


                                </div>



                                <div>

                                </div>
                            </div>
                        </div>
                        <div className="ml-4 mt-4 flex flex-shrink-0">

                            <button
                                onClick={openModal}
                                type="button"
                                className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                                <span>Update Picture</span>
                            </button>
                        </div>
                    </div>
                    <form noValidate autoComplete="off" onSubmit={handleSubmit} >


                        <div className="mt-8  border-t border-gray-900/10">

                            <h2 className="text-base my-4  font-semibold leading-7 text-gray-900">Personal Information</h2>


                            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                                <div className="sm:col-span-3">
                                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                        First name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="firstName"
                                            id="first-name"
                                            value={userData.firstName}
                                            onChange={(e) => handleChange('firstName', e.target.value)}
                                            className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm ${errors.firstName ? 'border-red-500' : ''}`}
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
                                            onChange={(e) => handleChange('firstName', e.target.value)}
                                            className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm ${errors.lastName ? 'border-red-500' : ''}`}


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
                                            className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm ${errors.phone ? 'border-red-500' : ''}`}

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
                                            onChange={(e) => handleChange('firstName', e.target.value)}
                                            className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm ${errors.email ? 'border-red-500' : ''}`}

                                        />

                                        <div className="text-red-500 text-sm mt-2">{errors.email}</div>
                                    </div>
                                </div>




                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button type="button"
                                onClick={handleUserCancel} className="text-sm font-semibold leading-6 text-gray-900">
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="rounded-md bg-beige px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-beige focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Update
                            </button>
                        </div>
                    </form>

                    <form noValidate autoComplete="off" onSubmit={handlePasswordSubmit} >
                        <div className="mt-8  border-t border-gray-900/10">

                            <h2 className="text-base my-4  font-semibold leading-7 text-gray-900"> Change Password</h2>


                            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">


                                <div className="sm:col-span-3">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                        New Password
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            onChange={(e) => handlePasswordChange('password', e.target.value)}
                                            className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm ${errors.password ? 'border-red-500' : ''}`}


                                        />

                                        <div className="text-red-500 text-sm mt-2">{errors.password}</div>

                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="passwordConfirmation" className="block text-sm font-medium leading-6 text-gray-900">
                                        Confirm New Password
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="password"
                                            name="passwordConfirmation"
                                            id="password"
                                            onChange={(e) => handlePasswordChange('passwordConfirmation', e.target.value)}
                                            className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm ${errors.password ? 'border-red-500' : ''}`}

                                        />

                                        <div className="text-red-500 text-sm mt-2">{errors.passwordConfirmation}</div>
                                    </div>
                                </div>





                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button type="button"
                                onClick={handlePasswordCancel} className="text-sm font-semibold leading-6 text-gray-900">
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="rounded-md bg-beige px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-beige focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                change password
                            </button>
                        </div>
                    </form>

                </div>





                <div className="px-4 sm:px-6 ">

                    <div className="overflow-hidden rounded-lg bg-white mt-8
          max-w-6xl
          mx-auto
          grid grid-cols-1
          gap-6
          sm:px-6
          lg:max-w-7xl  shadow">
                        <div className="bg-white p-6">
                            <div className="sm:flex sm:items-center sm:justify-between">
                                <div className="sm:flex sm:space-x-5">
                                    <div className="flex-shrink-0">
                                        {user?.image ? (
                                            <img
                                                className="mx-auto h-40 w-40 rounded-full border-beige border-4"
                                                src={user?.image}
                                            />
                                        ) : (
                                            <img
                                                className='rounded-full h-44 w-44 border-beige border-4'
                                                src="https://www.ubuy.com.jo/skin/frontend/default/ubuycom-v1/images/default-avatar.jpg"
                                            />
                                        )}


                                    </div>
                                    <div className="mt-4 text-center sm:mt-4 sm:pt-1 sm:text-left">
                                        <p className="text-xl font-medium text-gray-600">Welcome back,</p>
                                        <p className="text-xl font-bold text-gray-900 sm:text-2xl">{user?.firstName}</p>
                                        <p className="text-xl font-medium text-gray-600">{user?.email}</p>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarProfile>
        </div>
    );
}

export default AccountInformation;