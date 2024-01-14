"use client"
import Head from 'next/head'
import Link from 'next/link'
import React, { useState } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import Pagination from '../components/Pagination';
import HeaderSection from '../components/HeaderSection';
import { Fragment } from 'react'
import ProductCard from '../components/Product/ProductCard';
import { Menu, Transition } from '@headlessui/react'
import { WishlistState } from "../redux/wishlistSlice";
import { getMyWishlist, removeFromWishlist, isWishlisted, addToWishlist } from '../redux/wishlistSlice';
import { useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { useDispatch } from 'react-redux';
import SortMenu from '../components/SortMenu';
import ProductStatus from '../components/ProductStatus';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import FilterCategoryMenu from '../components/FilterCategoryMenu';
import { sortOptions, statusesOptions } from './options';
import { Product, Category } from "../interfaces";



export default function Home() {

  const [sort, setSort] = useState<string>(sortOptions[0].sort);
  const [loading, setLoading] = React.useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState<string>('1');
  const [categories, setCategories] = useState<Category[]>([]);
  const [productStatus, setProductStatus] = useState<string>('0');


  const dispatch = useDispatch();
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/admin/categories-lookups")
      setCategories(response.data.categories)
    } catch (error: any) {
      console.error('Failed to fetch categories', error);
    }
  };


  const handleAddToWishlist = (productId: any) => {
    dispatch(
      addToWishlist(
        productId
      ) as unknown as AnyAction
    );
  };

  const getProducts = async (sortOption: string, category: string, productStatus: string) => {
    try {
      setLoading(true);
      const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/api/products?page=${currentPage}&per_page=${rowsPerPage}&sort=${sortOption}&category=${category}&productStatus=${productStatus}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      setProducts(response.data.data);
      dispatch(getMyWishlist());
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
    getProducts(sort, category, productStatus);
    fetchCategories();
  }, [currentPage, rowsPerPage, category, sort, productStatus]);



  return (
    <div>
      <HeaderSection />
      <div className="bg-white">

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
                        {sortOptions.map((option: any) => (
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
                <h3 className="sr-only">Categories</h3>

                <div className="px-4 py-6">
                  <span className=" py-3  font-medium text-gray-900">Category</span>

                  <div className="pt-6" id="filter-section-mobile-1">
                    <div className="space-y-6">
                      {categories.map((category, index) => (
                        <FilterCategoryMenu
                          index={index}
                          setCategory={setCategory}
                          category={category}
                        />

                      ))}
                    </div>

                  </div>
                </div>
                <div className="border-t border-gray-200 px-4 py-6">
                  <span className=" py-3  font-medium text-gray-900">Availability</span>

                  <div className="pt-6" id="filter-section-mobile-1">
                    <div className="space-y-6">
                      {statusesOptions.map((status: any, index: any) => (
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
  )
}
