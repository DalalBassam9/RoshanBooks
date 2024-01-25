"use client";
import Head from 'next/head'
import React, { useEffect } from 'react';
import * as Yup from 'yup';
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { ToastContainer } from 'react-toastify';
import Link from 'next/link';

interface FormData {
    email: string;
    password: string;

}

const schema = Yup.object({
    password: Yup.string()
        .required('Password is required'),
    email: Yup.string()
        .required('Email is required'),
});


export default function Login() {
    const router = useRouter();
    const [loading = false, setLoading] = React.useState<boolean>(false);
    const [errors, setErrors] = React.useState<Record<string, string>>({});
    const [formData, setFormData] = React.useState<FormData>({
        password: "",
        email: ""
    });
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            await schema.validate(formData, { abortEarly: false });
            const response = axios.post(process.env.NEXT_PUBLIC_API_URL + `/api/login`, formData,

            );
            const token = (await response).data.access_token
            if (typeof window !== 'undefined') {
                localStorage.setItem("token", token);
            }

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: ' login  successfully',
                confirmButtonColor: '#D5A983'
            })

            router.push("/admin");
        } catch (error: any) {
            if (error instanceof Yup.ValidationError) {
                const errors: { [key: string]: string } = {}; // Specify the type of 'errors' object
                error.inner.forEach((error: any) => {
                    errors[error.path] = error.message;
                });
                setErrors(errors);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response?.data?.message || error.message,
                    confirmButtonColor: '#D5A983'
                });

            }
        } finally {
            setLoading(false);
        }

    };

    return (
        <>
            <Head>
                <title>ergodnc — Login</title>
            </Head>
            <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">


                <ToastContainer />
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">

                    <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">

                        <div className="sm:mx-auto my-6 sm:w-full sm:max-w-md">

                            <Link href="/" passHref>
                                <h2 className="text-3xl  text-center font-bold tracking-tight  text-beige">Roshan Books</h2>
                            </Link>

                            <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Sign in to your account
                            </h2>
                        </div>



                        <form className="space-y-6" noValidate autoComplete="off" onSubmit={handleSubmit} >
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleChange('email', e.target.value)}
                                        autoComplete="email"
                                        required
                                        className="form-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-beige sm:text-sm sm:leading-6"
                                    />
                                    <div className="text-red-500 text-sm mt-2">{errors.email}</div>

                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) => handleChange('password', e.target.value)}
                                        autoComplete="current-password"
                                        required
                                        className="form-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-beige sm:text-sm sm:leading-6"
                                    />
                                    <div className="text-red-500 text-sm mt-2">{errors.password}</div>

                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4  form-radio rounded border-gray-300 text-beige focus:ring-beige"
                                    />
                                    <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-900">
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm leading-6">
                                    <a href="#" className="font-semibold text-beige hover:text-beige">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>

                            <div>
                                <button
                                    disabled={loading}
                                    type="submit"
                                    className={`flex w-full justify-center rounded-md bg-beige px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-beige focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-beige  ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >

                                    {loading ? 'Loading...' : 'Sign in'}
                                </button>
                            </div>
                        </form>

                        <div>
                        </div>
                    </div>


                </div>
            </div>

        </>
    )
}
