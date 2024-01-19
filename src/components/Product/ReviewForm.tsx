"use client";
import React from "react";
import axios from "axios";
import Rating from '@mui/material/Rating';
import * as Yup from 'yup';
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

interface Product {
    productId: number;
}
interface ReviewProps {
    product: Product;
    getReviews: any;
    handleClose: any;
    setShowReviewForm: any;
}

interface FormData {
    review: string;
    rating: string;

}

const schema = Yup.object({
    rating: Yup.string()
        .required('Rating is required'),
    review: Yup.string()
        .required('Review is required'),
});


function ReviewForm({ getReviews, setShowReviewForm, handleClose, product }: ReviewProps) {
    const router = useRouter();
    const token = localStorage.getItem('token');
    const [loading = false, setLoading] = React.useState<boolean>(false);
    const [errors, setErrors] = React.useState<Record<string, string>>({});
    const [formData, setFormData] = React.useState<FormData>({
        rating: '',
        review: '',

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
        if (!token) {
            router.push("/login");
        } else {
            try {
                setLoading(true);
                await schema.validate(formData, { abortEarly: false });
                await axios.post(process.env.NEXT_PUBLIC_API_URL + `/api/products/${product.productId}/rating`, formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
                );

                toast.success('Rating successfully added');
                setFormData({ rating: '', review: '' });
                setShowReviewForm(false);
                getReviews();
            } catch (error: any) {
                if (error instanceof Yup.ValidationError) {
                    const errors: { [key: string]: string } = {}; // Specify the type of 'errors' object
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
        }
    };



    return (
        <div>
            <form className="space-y-6" noValidate autoComplete="off" onSubmit={handleSubmit} >
                <div className="py-3 relative xs:w-full  sm:mx-auto flex flex-col justify-center sm:py-12">
                    <div>
                        <div>
                            <div className="px-12 py-2">
                                <h2 className="text-gray-800 text-center text-xl font-semibold"> Add new Reiview</h2>
                            </div>
                            <div className="w-full flex flex-col items-center">
                                <div className="flex flex-col items-center py-6 space-y-3">
                                    <div className="flex space-x-3">
                                        <Rating
                                            name="size-small"
                                            precision={1}
                                            onChange={(event, newValue: any) => {
                                                handleChange('rating', newValue);
                                            }}
                                            style={{
                                                color: "#E5BEA0"
                                            }}
                                            size="medium"
                                        />

                                    </div>

                                    <div className="text-red-500 text-sm mt-2">{errors.rating}</div>
                                </div>
                                <div className="w-3/4 flex flex-col">
                                    <textarea
                                        value={formData.review}
                                        onChange={(e) => handleChange('review', e.target.value)} rows={4} className="p-4 form-textarea block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-beige    ">Leave a message, if you want</textarea>

                                    <div className=" text-red-500 text-sm mt-2">{errors.review}</div>

                                    <button
                                        type="submit"
                                        className={`py-3 my-4 text-lg bg-beige rounded-xl text-white  ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        disabled={loading}
                                    >
                                        {loading ? 'Loading...' : 'Rate now'}
                                    </button>

                                </div>
                            </div>
                            <div className="h-20 flex items-center justify-center">
                                <button onClick={handleClose} className="text-gray-600">Maybe later</button>
                            </div>
                        </div>


                    </div>
                </div>
            </form>

        </div>
    );
}

export default ReviewForm;
