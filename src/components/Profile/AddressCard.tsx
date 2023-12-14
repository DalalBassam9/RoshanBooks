"use client"

interface Address {
    productId: number;
    name: string;
    price: number;
    image: string
}

interface AddressCardProps {
    address: Address;
}
function AddressCard({
    address
}: AddressCardProps) {

    return (
        <div className="relative  bg-white shadow-md rounded-3xl p-2 my-3 cursor-pointer">
          
        </div>


    );


}
export default AddressCard;