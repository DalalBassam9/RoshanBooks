"use client";
import React from 'react';

interface CartItemSummaryProps {
    cartItem: any,
    key: any

}
function CartItemSummary(
    {
        cartItem, key
    }: CartItemSummaryProps

) {

    return (
        <div>
            <div className="w-full mx-auto text-gray-800 font-light mb-6 border-b border-gray-200 pb-6">
                <div className="w-full flex items-center">
                    <div className="overflow-hidden rounded-lg w-20 h-30 bg-gray-50 border border-gray-200">

                        <img src={cartItem.image} alt="" />
                    </div>
                    <div className="flex-grow pl-3">
                        <h6 className="font-semibold uppercase text-gray-600">{cartItem.name}</h6>
                        <p className="text-gray-400">x {cartItem.quantity}</p>
                    </div>
                    <div>
                        <span className="font-semibold text-gray-600 text-xl">{cartItem.price * cartItem.quantity}</span><span className="font-semibold text-gray-600 text-sm">JD</span>
                    </div>
                </div>
            </div>

        </div>


    )

}

export default CartItemSummary;