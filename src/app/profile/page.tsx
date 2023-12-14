"use client";
import React from 'react';
import useAuth from '../lib/useAuth';
import Tabs from '../../components/Tabs/Tabs';
import AccountInformation from '../../components/Profile/AccountInformation';
import Addresses from '../../components/Profile/Addresses';
import Orders from '../../components/Profile/Orders';
import Ratings from '../../components/Profile/Ratings';
import Wishlist from '../../components/Profile/Wishlist';
import { UserState } from '../../redux/userSlice';
import { fetchUser } from '../../redux/userSlice';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

const Profile: React.FC = () => {

    const { isLoading } = useAuth({ middleware: 'auth' });

    const dispatch: ThunkDispatch<UserState, unknown, AnyAction> = useDispatch();
    const user = useSelector((state: { user: UserState }) => state.user.user);


    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    return (
        <div>
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
                <div className=" border-t border-gray-200 bg-gray-50 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                    <Tabs>
                        <div {...{ label: "AccountInformation" }}>
                            <AccountInformation />
                        </div>
                        <div {...{ label: "Addresses" }}>
                            <Addresses />
                        </div>
                        <div {...{ label: "Orders" }}>
                            <Orders />
                        </div>
                        <div {...{ label: "Wishlist" }}>
                            <Wishlist />
                        </div>
                        <div {...{ label: "Ratings" }}>
                            <Ratings />
                        </div>
                    </Tabs>

                </div>
            </div>
        </div>
    );
}

export default Profile;