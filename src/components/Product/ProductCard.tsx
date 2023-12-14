"use client"
import Link from 'next/link';
import { addToCart, removeFromCart } from '../../redux/cartSlice';
import { AnyAction } from 'redux';
import { Provider, useDispatch } from 'react-redux';
import { WishlistState } from "../../redux/wishlistSlice";
import { getMyWishlist, removeFromWishlist, isWishlisted, addToWishlist } from '../../redux/wishlistSlice';
import { useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
interface Product {
    productId: number;
    name: string;
    price: number;
    image: string
}

interface ProductCardProps {
    product: Product;
    checkIfWishlisted: (productId: number) => boolean;
    handleRemoveFromWishlist: (productId: number) => void;
}
function ProductCard({
    product,
    handleRemoveFromWishlist
}: ProductCardProps) {
    const dispatch = useDispatch();
    useSelector(isWishlisted);

    return (
        <div className="relative  bg-white shadow-md rounded-3xl p-2 my-3 cursor-pointer">
            <div className="overflow-x-hidden rounded-2xl relative aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md  lg:aspect-none group-hover:opacity-75 lg:h-80   ">

                <img className="h-full rounded-2xl w-full object-cover" src={product.image} />
                <p className="absolute right-2 top-2 bg-white rounded-full p-2 cursor-pointer group">
                    {isWishlisted(product.productId) ? (
                        <svg onClick={() => {
                            dispatch(
                                removeFromWishlist({
                                    productId: product.productId
                                }) as unknown as AnyAction
                            );
                        }} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:opacity-70 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    ) : (
                        <button onClick={() => {
                            dispatch(
                                addToWishlist(
                                    product.productId
                                ) as unknown as AnyAction
                            );
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:opacity-70 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </button>
                    )}
                </p>

            </div>
            <div className="mt-4 pl-2 mb-2 flex justify-between ">
                <div>
                    <p className="text-lg font-semibold text-gray-900 mb-0">{product.name}</p>
                    <p className="text-xl  text-Purpl mt-0">${product.price}</p>
                </div>
                <div className="flex flex-col-reverse mb-1 mr-4 group cursor-pointer">
                    <button
                        onClick={() => {
                            dispatch(
                                addToCart({
                                    productId: product.productId,
                                    quantity: 1,
                                }) as unknown as AnyAction
                            );
                        }}

                        className="p-2 rounded-full bg-Purpl   focus:outline-none ">

                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:opacity-50  text-white opacity-70" fill="none" viewBox="0 0 24 24" stroke="black">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>


    );


}
export default ProductCard;