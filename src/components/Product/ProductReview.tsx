"use client";
import React from "react";
import axios from "axios";
import Modal from 'react-modal';
import Rating from '@mui/material/Rating';
function ProductReviews({ product }: any) {
    const [loading = false, setLoading] = React.useState<boolean>(false);
    const [review = "", setReview] = React.useState<string>("");
    const [rating = 0, setRating] = React.useState<number>(0);
    const [showReviewForm, setShowReviewForm] = React.useState(false);
    const [reviews, setReviews] = React.useState([]);

    const getReviews = async () => {
        try {
            const endPoint = process.env.NEXT_PUBLIC_API_URL + `/api/get-product-ratings/${product.productId}`;
            const response = await axios.get(endPoint);
            setReviews(response.data.data);
        } catch (error: any) {
        }
    };

    const submitReview = async () => {
        try {
            setLoading(true);
            const endPoint = process.env.NEXT_PUBLIC_API_URL +`/api/products/${product.productId}/rating`;
            const response = await axios.post(endPoint, {
                review,
                rating,
                product: product._id,
            },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            getReviews();
        } catch (error: any) {
        } finally {
            setLoading(false);
            setShowReviewForm(false);
        }
    };

    React.useEffect(() => {
        getReviews();
    }, []);

    return (
        <div className="mt-5">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Reviews</h1>
                <button onClick={() => {
                    setReview("");
                    setRating(0);
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
                        className="flex flex-col gap-2 border border-gray-400 p-3 border-solid"
                    >
                        <div className="flex justify-between ">
                            <div className="flex gap-2 items-center">
                                <div className="flex p-3 items-center justify-center bg-gray-600 rounded-full h-8 w-8 text-white">
                                    <span>
                                        {review.user.firstName}
                                    </span>
                                </div>
                                <span className="text-sm">{review.user.firstName}</span>
                            </div>

                            <Rating
                                readOnly
                                precision={0.5}
                                name="read-only"
                                value={review.rating }
                                style={{
                                    color: "#26577C"
                                }}
                                size="small"

                            />

                        </div>

                        <span className="text-sm text-gray-500">{review.review}</span>
                    </div>
                ))}
            </div>

            <Modal
                isOpen={showReviewForm}
                onRequestClose={() => setShowReviewForm(false)}
            >
                <div className="flex flex-col gap-5">
                    <div>
                        <div className="flex justify-between items-center uppercase">
                            <h1 className="text-2xl font-semibold">Write a review</h1>
                        </div>

                        <span>Comment</span>
                        <textarea
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col">
                        <span>Rating</span>
                  

                        <Rating name="size-small"
                            precision={0.5}
                            value={rating}
                            onChange={(event, newValue:any) => {
                                setRating(newValue);
                            }}
                           size="small" />
                    </div>
                </div>
                <div className=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                        onClick={submitReview}
                        className="rounded-md  px-3 py-2 bg-beige px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-beige focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Save
                    </button>

                    <button
                        type="button"
                        className="mt-3 mr-2 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => setShowReviewForm(false)}
                    >
                        Cancel
                    </button>
                </div>


            </Modal>
        </div>
    );
}

export default ProductReviews;
