"use client";
import React from 'react';
import useAuth from '../lib/useAuth';
import { UserState } from '../../redux/userSlice';
import {
    fetchUser,
    logoutUser
} from '../../redux/userSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import UpdateAccountInformation from '../../components/Profile/UpdateAccountInformation';
import UpdatePassword from '../../components/Profile/UpdatePassword';
import UpdateUserImage from '../../components/Profile/UpdateUserImage';
import SidebarProfile from '../../components/Profile/SidebarProfile';
import Modal from 'react-modal';
import * as Yup from 'yup';

interface InfoUserData {
    firstName: any;
    lastName: any;
    email: string;
    phone: string

}

const AccountInformation: React.FC = () => {

    useAuth({ middleware: 'auth' })

    const [userData, setUserData] = useState<InfoUserData>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",

    });
    const dispatch: ThunkDispatch<UserState, unknown, AnyAction> = useDispatch();
    const user = useSelector((state: { user: UserState }) => state.user.user);
    const [modalIsOpen, setModalIsOpen] = React.useState<boolean>(false);
 

    const openModal = () => {
        setModalIsOpen(true);
    }

    const handleCloseModal = () => {
        setModalIsOpen(false);
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
                                
                                </div>

                                <div>
                                </div>
                            </div>
                        </div>
                        <div className="ml-4 mt-4 flex flex-shrink-0">
                            <div>
                                <Modal
                                    isOpen={modalIsOpen}
                                    onRequestClose={handleCloseModal}
                                    className="m-auto p-4 bg-white rounded shadow-lg lg:w-1/3  w-1/2 "
                                    overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex"
                                >
                                    <UpdateUserImage setModalIsOpen={setModalIsOpen} />
                                </Modal>
                            </div>
                            <button
                                onClick={openModal}
                                type="button"
                                className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                                <span>Update Picture</span>
                            </button>
                        </div>
                    </div>

                    <UpdateAccountInformation />
                    <UpdatePassword />
                </div>
            </SidebarProfile>
        </div>
    );
}

export default AccountInformation;