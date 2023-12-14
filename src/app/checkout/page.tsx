"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { RadioGroup } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/20/solid'

export default function Checkout() {

    const mailingLists = [
        { id: 1, title: 'Newsletter', description: 'Last message sent an hour ago', users: '621 users' },
        { id: 2, title: 'Existing Customers', description: 'Last message sent 2 weeks ago', users: '1200 users' },
        { id: 3, title: 'Trial Users', description: 'Last message sent 4 days ago', users: '2740 users' },
    ]

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const [selectedMailingLists, setSelectedMailingLists] = useState(mailingLists[0])



    return (
        <div className="mt-4 grid grid-cols-2 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
            <div className="lg:col-span-2 col-span-3 bg-indigo-50 space-y-8 px-12">
                <div className="mt-8 p-4 relative flex flex-col sm:flex-row sm:items-center bg-white shadow rounded-md">
                    <RadioGroup value={selectedMailingLists} onChange={setSelectedMailingLists}>
                        <RadioGroup.Label className="text-base font-semibold leading-6 text-gray-900">
                            Select a mailing list
                        </RadioGroup.Label>

                        <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
                            {mailingLists.map((mailingList) => (
                                <RadioGroup.Option
                                    key={mailingList.id}
                                    value={mailingList}
                                    className={({ active }) =>
                                        classNames(
                                            active ? 'border-indigo-600 ring-2 ring-indigo-600' : 'border-gray-300',
                                            'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
                                        )
                                    }
                                >
                                    {({ checked, active }) => (
                                        <>
                                            <span className="flex flex-1">
                                                <span className="flex flex-col">
                                                    <RadioGroup.Label as="span" className="block text-sm font-medium text-gray-900">
                                                        {mailingList.title}
                                                    </RadioGroup.Label>
                                                    <RadioGroup.Description as="span" className="mt-1 flex items-center text-sm text-gray-500">
                                                        {mailingList.description}
                                                    </RadioGroup.Description>
                                                    <RadioGroup.Description as="span" className="mt-6 text-sm font-medium text-gray-900">
                                                        {mailingList.users}
                                                    </RadioGroup.Description>
                                                </span>
                                            </span>
                                            <CheckCircleIcon
                                                className={classNames(!checked ? 'invisible' : '', 'h-5 w-5 text-indigo-600')}
                                                aria-hidden="true"
                                            />
                                            <span
                                                className={classNames(
                                                    active ? 'border' : 'border-2',
                                                    checked ? 'border-indigo-600' : 'border-transparent',
                                                    'pointer-events-none absolute -inset-px rounded-lg'
                                                )}
                                                aria-hidden="true"
                                            />
                                        </>
                                    )}
                                </RadioGroup.Option>
                            ))}
                        </div>
                        <div>
                            <form action="#" method="POST" className="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48">
                                <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
                                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                                        <div>
                                            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                                First name
                                            </label>
                                            <div className="mt-2.5">
                                                <input
                                                    type="text"
                                                    name="first-name"
                                                    id="first-name"
                                                    autoComplete="given-name"
                                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                                Last name
                                            </label>
                                            <div className="mt-2.5">
                                                <input
                                                    type="text"
                                                    name="last-name"
                                                    id="last-name"
                                                    autoComplete="family-name"
                                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                                                Email
                                            </label>
                                            <div className="mt-2.5">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    autoComplete="email"
                                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-gray-900">
                                                Phone number
                                            </label>
                                            <div className="mt-2.5">
                                                <input
                                                    type="tel"
                                                    name="phone-number"
                                                    id="phone-number"
                                                    autoComplete="tel"
                                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                                                Message
                                            </label>
                                            <div className="mt-2.5">
                                                <textarea
                                                    name="message"
                                                    id="message"
                                                    rows={4}
                                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    defaultValue={''}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-8 flex justify-end">
                                        <button
                                            type="submit"
                                            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Send message
                                        </button>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </RadioGroup>

              

                </div>
                </div>
            <div className="md:col-span-1 col-span-3  bg-indigo-50 space-y-8 px-12">
                <div className="mt-8 p-4 relative flex flex-col sm:flex-row sm:items-center bg-white shadow rounded-md">




                    <div className="">
                        <div className="px-3">
                            <div className="w-full mx-auto text-gray-800 font-light mb-6 border-b border-gray-200 pb-6">
                                <div className="w-full flex items-center">
                                    <div className="overflow-hidden rounded-lg w-16 h-16 bg-gray-50 border border-gray-200">
                                        <img src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80" alt="" />
                                    </div>
                                    <div className="flex-grow pl-3">
                                        <h6 className="font-semibold uppercase text-gray-600">Ray Ban Sunglasses.</h6>
                                        <p className="text-gray-400">x 1</p>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-gray-600 text-xl">$210</span><span class="font-semibold text-gray-600 text-sm">.00</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-6 pb-6 border-b border-gray-200">
                                <div className="-mx-2 flex items-end justify-end">
                                    <div className="flex-grow px-2 lg:max-w-xs">
                                        <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Discount code</label>
                                        <div>
                                            <input className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="XXXXXX" type="text" />
                                        </div>
                                    </div>
                                    <div className="px-2">
                                        <button className="block w-full max-w-xs mx-auto border border-transparent bg-gray-400 hover:bg-gray-500 focus:bg-gray-500 text-white rounded-md px-5 py-2 font-semibold">APPLY</button>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-6 pb-6 border-b border-gray-200 text-gray-800">
                                <div className="w-full flex mb-3 items-center">
                                    <div className="flex-grow">
                                        <span className="text-gray-600">Subtotal</span>
                                    </div>
                                    <div className="pl-3">
                                        <span className="font-semibold">$190.91</span>
                                    </div>
                                </div>
                                <div className="w-full flex items-center">
                                    <div className="flex-grow">
                                        <span className="text-gray-600">Taxes (GST)</span>
                                    </div>
                                    <div className="pl-3">
                                        <span className="font-semibold">$19.09</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-6 pb-6 border-b border-gray-200 md:border-none text-gray-800 text-xl">
                                <div className="w-full flex items-center">
                                    <div className="flex-grow">
                                        <span className="text-gray-600">Total</span>
                                    </div>
                                    <div className="pl-3">
                                        <span className="font-semibold text-gray-400 text-sm">AUD</span> <span class="font-semibold">$210.00</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
