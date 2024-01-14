"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Swal from "sweetalert2";
import Pagination from '../../../components/Pagination';
import { Fragment } from 'react'
import ProductCard from '../../../components/Product/ProductCard';
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import SortMenu from '../../../components/SortMenu';
import ProductStatus from '../../../components/ProductStatus';
import { sortOptions, statusesOptions } from '../../options';
import { Product,CategoryData } from "../../../interfaces";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function category({ params }: { params: any }) {
    const dispatch = useDispatch();

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(' ')
    }

    const [sort, setSort] = useState<string>(sortOptions[0].sort);
    const [products, setProducts] = useState<Product[]>([]);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [productStatus, setProductStatus] = useState<string>('0');

    const [categoryData, setCategoryData] = React.useState<CategoryData>({
        categoryId: '',
        name: '',
    });
    const [loading, setLoading] = React.useState(false);

    const getCategory = async () => {
        try {
            setLoading(true);
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/api/categories/${params.categoryId}`
            );
            setCategoryData(response.data.data);
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message || error.message,
            })

        } finally {
            setLoading(false);
        }
    };

    const getProducts = async (sortOption: string, productStatus: string) => {
        try {
            setLoading(true);
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/api/get-products-category/${params.categoryId}?page=${currentPage}&per_page=${rowsPerPage}&sort=${sortOption}&productStatus=${productStatus}`);
            setProducts(response.data.data);
            setTotalPages(response.data.meta.last_page);
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message || error.message,
            })
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        getCategory();
        getProducts(sort, productStatus);
    }, [currentPage, rowsPerPage, sort, productStatus]);

    return (
        <div>
            <div>
                <div className="bg-white">
                <ToastContainer/>
                    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900">New Arrivals</h1>

                            <div className="flex items-center">
                                <Menu as="div" className="relative inline-block text-left">
                                    <div>
                                        <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                            Sort
                                            <ChevronDownIcon
                                                className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                                aria-hidden="true"
                                            />
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

                                        <Transition.Child as="div">
                                            <Menu.Items className="absolute right-2 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">

                                                <div className="py-1">
                                                    {sortOptions.map((option:any) => (
                                                        <SortMenu option={option} setCurrentPage={setCurrentPage} setSort={setSort} sort={sort} classNames={classNames} />
                                                    ))}
                                                </div>
                                            </Menu.Items>
                                        </Transition.Child>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>

                        <section aria-labelledby="products-heading" className="pb-24 pt-6">
                            <h2 id="products-heading" className="sr-only">Products</h2>

                            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">

                                <form className="hidden lg:block">

                                    <div className="border-t border-gray-200 px-4 py-6">
                                        <span className=" py-3  font-medium text-gray-900">Availability</span>

                                        <div className="pt-6" id="filter-section-mobile-1">
                                            <div className="space-y-6">
                                                {statusesOptions.map((status:any, index:number) => (

                                                    <ProductStatus status={status} index={index} setProductStatus={setProductStatus} productStatus={productStatus} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </form>

                                <div className="lg:col-span-3">
                                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 lg:col-span-3">
                                        {products.map((product: any) => (
                                            <ProductCard
                                                key={product.productId}
                                                product={product}
                                            />
                                        ))}

                                    </div>
                                </div>
                            </div>
                        </section>

                    </main>

                    <div className="flex justify-center">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>

                </div>
            </div>

        </div>
    );
}