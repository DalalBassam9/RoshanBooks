"use client";
import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Modal from 'react-modal';
import Rating from '@mui/material/Rating';
import * as Yup from 'yup';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ReviewForm from "./ReviewForm";
import {Product} from "../../interfaces";

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

    const handleClose = () => {
        setShowReviewForm(false);
        setFormData({ rating: '', review: '' });

    };


    useEffect(() => {
        getReviews();
        console.log(product);
    }, []);
    const url = process.env.NEXT_PUBLIC_API_URL + `/api/get-ratings/${product.productId}`
    const getReviews = async () => {
        try {
            const response = await axios.get(url);
            setReviews(response.data.data);
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response?.data?.message || error.message, // Use optional chaining to access nested properties
            });
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
                <ReviewForm handleClose={handleClose} product={product} setShowReviewForm={setShowReviewForm} getReviews={getReviews} />
            </Modal>
        </div>
    );
}

export default ProductReviews;
