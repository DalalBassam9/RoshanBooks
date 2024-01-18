"use client";
import axios from "axios";

interface OrderAddressCardProps {
    order: any,

}
function OrderAddressCard(
    {
        order
    }: OrderAddressCardProps

) {

    return (
        <div>
            <ul>
                <li className="text-sm py-1 font-medium text-gray-900">{order.address.phone}</li>
                <li className="text-sm py-1 font-medium text-gray-900">{order.address.firstName} {order.address.lastName}</li>
                <li className="text-sm py-1 font-medium text-gray-900">{order.address.district}</li>
                <li className="text-sm py-1 font-medium text-gray-900">{order.address.city?.name}</li>
                <li className="text-sm py-1 font-medium text-gray-900">{order.address.address}</li>
            </ul>
        </div>


    )

}

export default OrderAddressCard;