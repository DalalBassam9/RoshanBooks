
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




    return (
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




                    <div>
                    </div>
                </div>


            </div>
        </div>

    )
}
