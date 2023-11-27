import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
             <nav className=" flex justify-center">
                <button
                    className={`${currentPage === 1 ? 'bg-gray-300 text-gray-700 cursor-not-allowed' : 'bg-blue-500 text-white'
                        } px-4 py-2 rounded mr-2`}
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <ul className="flex justify-center space-x-2">
                    {pages.map((page) => (
                        <li key={page}>
                            <button
                                className={`${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
                                    } px-4 py-2 rounded`}
                                onClick={() => onPageChange(page)}
                            >
                                {page}
                            </button>
                        </li>
                    ))}
                </ul>
                <button
                    className={`${currentPage === totalPages ? 'bg-gray-300 text-gray-700 cursor-not-allowed' : 'bg-blue-500 text-white'
                        } px-4 py-2 rounded ml-2`}
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </nav>
         
    );
};

export default Pagination;