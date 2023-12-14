"use client"
import Head from 'next/head'
import Link from 'next/link'
import React, { useState } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import Pagination from '../components/Pagination';
import ProductsList from '../components/Product/ProductsList';
import useAuth from './lib/useAuth';
import { useSession, signIn, signOut } from 'next-auth/react';
interface Product {
  id?: number;
  name?: string;
  image?: string;
  price?: number;
}

export default function Home() {

  const { user, logout } = useAuth()

  const [loading, setLoading] = React.useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [userData, setUserData] = useState<{ firstName: string }>({ firstName: '' });

  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/api/products?page=${currentPage}&per_page=${rowsPerPage}`
      );
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
  const getUser = async () => {
    try {
      setLoading(true);
      const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/api/user`
      );
      setUserData(response.data.data);
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
    getProducts();
  }, [currentPage, rowsPerPage]);



  return (
    <div>
      <ProductsList data={products} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />


    </div>
  )
}
