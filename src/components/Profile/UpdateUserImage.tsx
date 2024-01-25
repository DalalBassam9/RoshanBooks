import React from 'react';
import { fetchUser } from '../../redux/userSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from "axios";
import { PhotoIcon } from '@heroicons/react/24/solid'
import Swal from "sweetalert2";
import { toast } from 'react-toastify';

interface ImageFormProps {
    setModalIsOpen: (isOpen: boolean) => void;

}

function UpdateUserImage(
    {
        setModalIsOpen
    }: ImageFormProps

) {
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    const [loading = false, setLoading] = React.useState<boolean>(false);

    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleImageRemove = () => {
        setImage(null);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    }


    const handleImageUpload = async () => {
        const formData = new FormData();
        if (image) {
            formData.append('image', image);
        }

        try {

            setLoading(true);
            const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/api/my/update-image", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });

            toast.success('Image update successfully');
            setModalIsOpen(false);
            dispatch(fetchUser() as any);

        } catch (error:any) {
            toast.error(error.response?.data?.message || error.message);
        }
        finally {
            setLoading(false);
        }
    };


    return (

        <div>


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
                        disabled={loading}
                        onClick={handleImageUpload}
                        className={`rounded-md  px-3 py-2 bg-beige px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-beige focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600  ${loading ? 'opacity-50' : ''}`}

                    >

                        {loading ? (
                            <span className="flex">
                                <svg className="animate-spin pt-2 -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Loading...
                            </span>

                        ) : 'Update'}

                    </button>

                    <button
                        type="button"
                        className="mt-3 mr-2 inline-flex w-full justify-center rounded-xl bg-gray-200 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto"
                        onClick={() => setModalIsOpen(false)}

                    >
                        Cancel
                    </button>
                </div>

            </div>


        </div>


    );
}

export default UpdateUserImage;