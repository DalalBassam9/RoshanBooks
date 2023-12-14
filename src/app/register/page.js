"use client";
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import axios from 'axios';
import Swal from "sweetalert2";
export default function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState([])

    const [formData, setFormData] = useState({
        password: '',
        password_confirmation:'',
        email: '',
        firstName: '',
        lastName: '',
        phone: '',

        // Add other form fields here
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const submitForm = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/api/register", formData);
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Product Created successfully',
            })
        }
        catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response || error.message,
            })
        }
    }
        return (
            <div>
                <div className="w-1/2 mx-auto bg-white p-5 rounded-lg">
             

                    <form onSubmit={submitForm} autoComplete="off">
                        <div>
                            <input
                                type="text"
                                name="firstName"
                                className=
                                "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"

                                value={formData.firstName}
                                onChange={handleChange}
                            />

                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                className=
                                "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"

                                onChange={handleChange}
                            />

                            <input
                                type="text"
                                name="email"
                                className=
                                "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"

                                value={formData.email}
                                onChange={handleChange}
                            />

                            <input
                                type="password"
                                name="password" className=
                                "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"


                                value={formData.password}
                                onChange={handleChange}
                            />

                            <input
                                type="password"
                                name="password_confirmation"
                                className=
                                "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"

                                value={formData.password_confirmation}
                                onChange={handleChange}
                            />

                            <input
                                type="text"
                                name="phone" className=
                                "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"


                                value={formData.phone}
                                onChange={handleChange}
                            />
                        
                        </div>

                        <div className="flex items-center justify-end mt-4">
                      

                            <button type="submit" className="ml-3">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        )
}