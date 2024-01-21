"use client"
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Fragment } from 'react'
import axios from 'axios';
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, ShoppingBagIcon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link';
import { getCartItems, CartState } from '../redux/cartSlice';
import {
    fetchUser, UserState,
    logoutUser
} from '../redux/userSlice';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { MenuItem } from "@mui/material";
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
    const [cartCartCount, setCartCount] = useState(0);

    const cartItemsCount = useSelector((state: any) => state.cart.cartItemsCount);
    const user = useSelector((state: { user: UserState }) => state.user.user);
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);
    const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUser());
        fetchCategories();
        logoutUser();
    }, [dispatch]);

    useEffect(() => {
        const savedCartItemsCount = localStorage.getItem('cartItemsCount');
        if (savedCartItemsCount) {
            setCartCount(JSON.parse(savedCartItemsCount));
        }
    }, []);
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

                                    <h6 className=" font-bold text-2xl text-beige w-auto w-8">Rashon</h6>

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
                                            className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-beige sm:text-sm sm:leading-6"
                                            placeholder="Search"
                                            type="search"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="relative z-10 flex items-center lg:hidden">
                                {/* Mobile menu button */}
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-beige">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>

                            {user && (
                                <div className="hidden lg:relative lg:z-9 lg:ml-4 lg:flex lg:items-center">

                                    {/* Profile dropdown */}
                                    <Menu as="div" className="relative ml-4 flex-shrink-0">
                                        <div>
                                            <Menu.Button className="relative flex rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-beige focus:ring-offset-2">
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

                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link href="/account"
                                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                        >
                                                            my Profile
                                                        </Link>
                                                    )}
                                                </Menu.Item>

                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            onClick={() => {
                                                                dispatch(logoutUser());
                                                                router.push("/login");

                                                            }}
                                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                        >
                                                            Sign out
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            </Menu.Items>

                                        </Transition>

                                    </Menu>

                                </div>
                            )}
                        </div>
                        <nav className="hidden lg:flex lg:space-x-8 lg:py-2  mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">

                            <div className="ml-4 flow-root lg:ml-6">
                                <Link href="/cart" className="group -m-2 flex items-center p-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                    </svg>
                                    <span className="ml-1">{cartItemsCount}</span>
                                </Link>
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
                                {!user && (
                                    <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                        <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                            Sign in
                                        </Link>
                                        <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                                        <Link href="/register" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                            Create account
                                        </Link>
                                    </div>
                                )}
                                {user && (
                                    <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                        {/* Replace "User Name" with the actual user name */}
                                        <span className="text-sm font-medium text-gray-700">Hello {user.firstName}</span>
                                    </div>
                                )}
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
                                    <div className="text-base font-medium text-gray-800">{user?.firstName}</div>
                                    <div className="text-sm font-medium text-gray-500">{user?.email}</div>
                                </div>
                                <button
                                    type="button"
                                    className="relative ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-beige focus:ring-offset-2"
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
                                                router.push("/login");
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