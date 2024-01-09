"use client";
import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Modal from 'react-modal';
import Rating from '@mui/material/Rating';
import * as Yup from 'yup';
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface Product {
    productId: number;
}
interface ProductProps {
    product: Product;
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



function ProductReviews({ product }: ProductProps) {
    const router = useRouter();
    const token = localStorage.getItem('token');
    const [loading = false, setLoading] = React.useState<boolean>(false);
    const [errors, setErrors] = React.useState<Record<string, string>>({});
    const [formData, setFormData] = React.useState<FormData>({
        rating: '',
        review: '',

    });
    const [showReviewForm, setShowReviewForm] = React.useState(false);
    const [reviews, setReviews] = React.useState([]);

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

        // Validate the field using Yup
        validateField(field, value);
    };

    const handleClose = () => {
        setShowReviewForm(false);
        setFormData({ rating: '', review: '' });

    };


    useEffect(() => {
        getReviews();
    }, []);

    const getReviews = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/get-ratings/" + 1);
            setReviews(response.data.data);
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response?.data?.message || error.message, // Use optional chaining to access nested properties
            });
        }
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
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: ' "Rating successful , please login to continue"',
                })
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
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error.response?.data?.message || error.message, // Use optional chaining to access nested properties
                    });

                }
            } finally {
                setLoading(false);
            }
        }
    };



    return (
        <div className="mt-5 p-4  bg-white">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Reviews</h1>
                <button onClick={() => {
                    setShowReviewForm(true);
                }}>
                    Write a review
                </button>
            </div>
            {reviews.length === 0 && (
                <div className="text-gray-500">
                    <span>No reviews yet. Be the first to review this product.</span>
                </div>
            )}
            {product.productId}
            <div className="flex flex-col gap-5 mt-5">
                {reviews.map((review: any) => (
                    <div
                        key={review.ratingId}
                        className="flex flex-col   gap-2 border-t border-b border-gray-200 p-3"
                    >

                        <div className="flex justify-between ">
                            <div className="flex gap-2 items-center">
                                <div className="flex p-3 items-centter justify-center  rounded-full h-20 w-20 text-white">
                                    <div className="md:w-full h-full">
                                        <img src={review.user.image} alt="bag" className="w-full h-full object-fit object-cover" />
                                    </div>
                                </div>
                                <div>
                                    <span className="text-sm">{review.user.firstName}</span>
                                    <div>
                                        <span className="text-sm leading-none text-gray-900 ">14 July 2021</span>
                                    </div>
                                </div>
                            </div>

                            <Rating
                                readOnly
                                precision={0.5}
                                name="read-only"
                                value={review.rating}
                                style={{
                                    color: "#E5BEA0"
                                }}
                                size="small"

                            />

                        </div>
                        <span className="text-sm mt-4 text-gray-500">{review.review}</span>
                    </div>
                ))}
            </div>

            <Modal
                isOpen={showReviewForm}
                onRequestClose={handleClose}
                className="m-auto p-4 bg-white rounded shadow-lg w-1/3 my-4  min-w-1xl flex flex-col rounded-xl shadow-lg  "
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex"

            >
                <form className="space-y-6" noValidate autoComplete="off" onSubmit={handleSubmit} >

                    <div className=" py-6 flex flex-col justify-center sm:py-12">

                        <div className="py-3 relative  sm:mx-auto">

                            <div className="">
                                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                                    <button type="button" onClick={handleClose} className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">

                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>


                                </div>


                                <div className="px-12 py-5">
                                    <h2 className="text-gray-800 text-xl font-semibold">Your opinion matters to us!</h2>
                                </div>
                                <div className="w-full flex flex-col items-center">
                                    <div className="flex flex-col items-center py-6 space-y-3">
                                        <span className="text-lg text-gray-800">How was quality of the call?</span>
                                        <div className="flex space-x-3">
                                            <Rating
                                                name="size-small"
                                                precision={1}
                                                onChange={(event, newValue: any) => {
                                                    handleChange('rating', newValue);
                                                }}
                                                size="small"
                                            />

                                        </div>

                                        <div className="text-red-500 text-sm mt-2">{errors.rating}</div>
                                    </div>
                                    <div className="w-3/4 flex flex-col">
                                        <textarea
                                            value={formData.review}
                                            onChange={(e) => handleChange('review', e.target.value)} rows="3" class="p-4 text-gray-500 rounded-xl resize-none">Leave a message, if you want</textarea>

                                        <div className="text-red-500 text-sm mt-2">{errors.review}</div>
                                        <button
                                            type="submit" className="py-3 my-8 text-lg  bg-beige rounded-xl text-white">Rate now</button>
                                    </div>
                                </div>
                                <div className="h-20 flex items-center justify-center">
                                    <button onClick={handleClose} className="text-gray-600">Maybe later</button>
                                </div>
                            </div>


                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default ProductReviews;
