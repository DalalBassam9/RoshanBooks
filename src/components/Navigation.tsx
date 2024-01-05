"use client"
import React, { useEffect, useState } from "react";
import CartState from "../redux/cartSlice"; // Add this import
import { useDispatch } from "react-redux";
import { Fragment } from 'react'
import axios from 'axios';
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, ShoppingBagIcon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import {
    fetchUser, UserState,
    logoutUser } from '../redux/userSlice'; // Add this import
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}


interface Category {
    categoryId: number;
    name: string;
}
const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Logout', href: '#' },
]


function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}


export default function Navigation() {
    const user = useSelector((state: { user: UserState }) => state.user.user);
    const router = useRouter();
    const cartItems = useSelector((state: any) => state.cart.items);
    const [categories, setCategories] = useState<Category[]>([]);
    const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
    const dispatch: ThunkDispatch<UserState, unknown, AnyAction> = useDispatch();

    useEffect(() => {
        fetchUser();
        fetchCategories();
       logoutUser();

        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    const fetchCategories = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/admin/categories-lookups")
            setCategories(response.data.categories)
        } catch (error: any) {
            console.error('Failed to fetch categories', error);
        }
    };
    return (
        <Disclosure as="header" className="bg-white shadow">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:divide-y lg:divide-gray-200 lg:px-8">
                        <div className="relative flex h-16 justify-between">
                            <div className="relative z-10 flex px-2 lg:px-0">
                                <div className="flex flex-shrink-0 items-center">
                                    <img
                                        className="h-8 w-auto"
                                        src="https://tailwindui.com/img/logos/mark.svg?color=Purpl&shade=600"
                                        alt="Your Company"
                                    />
                                </div>
                            </div>
                            <div className="relative z-0 flex flex-1 items-center justify-center px-2 sm:absolute sm:inset-0">
                                <div className="w-full sm:max-w-xs">
                                    <label htmlFor="search" className="sr-only">
                                        Search
                                    </label>
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </div>
                                        <input
                                            id="search"
                                            name="search"
                                            className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="Search"
                                            type="search"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="relative z-10 flex items-center lg:hidden">
                                {/* Mobile menu button */}
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
                                <button
                                    type="button"
                                    className="relative flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                                </button>

                                {/* Profile dropdown */}
                                <Menu as="div" className="relative ml-4 flex-shrink-0">
                                    <div>
                                        <Menu.Button className="relative flex rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">Open user menu</span>
                                            <img className="h-8 w-8 rounded-full" src={user?.image} alt="" />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            {categories.map((item) => (
                                                <Menu.Item key={item.name}>
                                                    {({ active }) => (
                                                        <Link href={`category/${item.categoryId}`} key={item.name}>
                                                            <a className={classNames(
                                                                activeCategoryId === item.categoryId ? 'bg-gray-100' : '',
                                                                'block px-4 py-2 text-sm text-gray-700'
                                                            )}
                                                            >
                                                                {item.name}
                                                            </a>
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                        <nav className="hidden lg:flex lg:space-x-8 lg:py-2  mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">

                            <div className="ml-4 flow-root lg:ml-6">
                                <a href="#" className="group -m-2 flex items-center p-2">
                                    <ShoppingBagIcon
                                        className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                        aria-hidden="true"
                                    />
                                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                                    <span >{cartItems.length}</span>
                                </a>
                            </div>

                            <div>

                                {categories.map((item) => {
                                    return (
                                        <Link href={`/category/${item.categoryId}`} key={item.name}
                                            className={classNames(
                                                activeCategoryId === item.categoryId
                                                    ? 'bg-gray-100 text-gray-900'
                                                    : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900',
                                                'inline-flex items-center rounded-md py-2 px-3 text-sm font-medium'
                                            )}


                                        >
                                            {item.name}

                                        </Link>
                                    );
                                })}
                            </div>


                            <div className="ml-auto flex items-center">
                                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                    <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                        Sign in
                                
                                    </a>
                                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                                    <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                        Create account
                                    </a>
                                </div>



                                {/* Search */}


                            </div>
                        </nav>


                    </div>

                    <Disclosure.Panel as="nav" className="lg:hidden" aria-label="Global">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {categories.map((item) => (

                                    <Link href={`/category/${item.categoryId}`} key={item.name}
                                        className={classNames(
                                            activeCategoryId === item.categoryId
                                                ? 'bg-gray-100 text-gray-900'
                                                : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900',
                                            'flex items-center rounded-md py-2 px-3 text-sm font-medium'
                                        )}
                                    >
                                        {item.name}
                                    </Link>

                            ))}
                        </div>
                        <div className="border-t border-gray-200 pb-3 pt-4">
                            <div className="flex items-center px-4">
                                <div className="flex-shrink-0">
                                    <img className="h-10 w-10 rounded-full" src={user?.image} alt="" />
                                </div>
                                <div className="ml-3">
                                    <div className="text-base font-medium text-gray-800">jgjgj</div>
                                    <div className="text-sm font-medium text-gray-500">{user?.email}</div>
                                </div>
                                <button
                                    type="button"
                                    className="relative ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>
                            <div className="mt-3 space-y-1 px-2">
                                {userNavigation.map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                        onClick={() => {
                                            if (item.name === 'Logout') {
                                                dispatch(logoutUser());
                                            }
                                        }}
                                    
                                    
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                            </div>
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}