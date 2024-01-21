"use client";
import React from 'react';
import axios from "axios";
import { Menu } from '@headlessui/react'

interface SortMenuProps {
    option: any,
    setCurrentPage:any,
    sort:string,
    setSort:any,
    classNames:any,


}
function SortMenu(
    {
        option,
        setCurrentPage,
        sort,
        setSort,
        classNames
    }: SortMenuProps

) {
    return (
        <div>
            <Menu.Item key={option.sort}>
                {({ active }) => (
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            setSort(option.sort);
                            setCurrentPage(1); // Reset to first page when changing sort option
                        }}
                        className={classNames(
                            option.sort === sort ? 'font-medium text-gray-900' : 'text-gray-500',
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-1 text-sm'
                        )}
                    >
                        {option.label}
                    </a>
                )}
            </Menu.Item>
        </div>


    )

}

export default SortMenu;