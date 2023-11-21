
"use client"
export default function ProductCard() {
    const products = [
        {
            id: 1,
            name: 'Basic Tee',
            href: '#',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
            imageAlt: "Front of men's Basic Tee in black.",
            price: '$35',
            color: 'Black',
        },
        // More products...
    ]
    return (



            <div>
                <div className="mx-auto  rounded-md  max-w-2xl px-4 py-4 sm:px-6  lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">



                        <div className="relative  bg-white shadow-md rounded-3xl p-2 my-3 cursor-pointer">
                            <div className="overflow-x-hidden rounded-2xl relative aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md  lg:aspect-none group-hover:opacity-75 lg:h-80   ">
                                <img className="h-full rounded-2xl w-full object-cover" src="https://unibookjo.com/images/Books/57/314024857_5720033618019582_2189778941416293364_n.jpg" />
                                <p className="absolute right-2 top-2 bg-white rounded-full p-2 cursor-pointer group">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:opacity-70" fill="none" viewBox="0 0 24 24" stroke="gray">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </p>
                            </div>
                            <div className="mt-4 pl-2 mb-2 flex justify-between ">
                                <div>
                                    <p className="text-lg font-semibold text-gray-900 mb-0">Product Name</p>
                                    <p className="text-xl  text-Purpl mt-0">$340</p>
                                </div>
                                <div className="flex flex-col-reverse mb-1 mr-4 group cursor-pointer">
                                    <button className="p-2 rounded-full bg-Purpl   focus:outline-none ">

                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:opacity-50  text-white opacity-70" fill="none" viewBox="0 0 24 24" stroke="black">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                    </div>
                    

                    <div className="relative  bg-white shadow-md rounded-3xl p-2 my-3 cursor-pointer">
                        <div className="overflow-x-hidden rounded-2xl relative aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md  lg:aspect-none group-hover:opacity-75 lg:h-80   ">
                            <img className="h-full rounded-2xl w-full object-cover" src="https://unibookjo.com/images/Books/57/358702636_6501156629907273_5546707968839705789_n.jpg" />
                            <p className="absolute right-2 top-2 bg-white rounded-full p-2 cursor-pointer group">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:opacity-70" fill="none" viewBox="0 0 24 24" stroke="gray">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </p>
                        </div>
                        <div className="mt-4 pl-2 mb-2 flex justify-between ">
                            <div>
                       
                                   

                                <p className="text-lg font-semibold text-gray-900 mb-0">Product Name</p>

                                <span className="flex items-center">
                                    <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4   text-beige" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4   text-beige" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4   text-beige" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4   text-beige" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4   text-beige" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                </span>

                                <p className="text-lg  text-purpl mt-0">$340</p>
                            </div>
                            <div className="flex flex-col-reverse mb-1 mr-4 group cursor-pointer">
                                <button className="p-2 rounded-full bg-Purple   focus:outline-none ">

                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:opacity-50  text-white opacity-70" fill="none" viewBox="0 0 24 24" stroke="black">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="relative  bg-white shadow-md rounded-3xl p-2 my-3 cursor-pointer">
                        <div className="overflow-x-hidden rounded-2xl relative aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md  lg:aspect-none group-hover:opacity-75 lg:h-80   ">
                            <img className="h-full rounded-2xl w-full object-cover" src="https://unibookjo.com/images/Books/62/322713526_5871792012898625_5979494756764273526_n.jpg" />
                            <p className="absolute right-2 top-2 bg-white rounded-full p-2 cursor-pointer group">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:opacity-70" fill="none" viewBox="0 0 24 24" stroke="gray">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </p>
                        </div>
                        <div className="mt-4 pl-2 mb-2 flex justify-between ">
                            <div>
                                <p className="text-lg font-semibold text-gray-900 mb-0">Product Name</p>
                                <p className="text-lg  text-purpl mt-0">$340</p>
                            </div>
                            <div className="flex flex-col-reverse mb-1 mr-4 group cursor-pointer">
                                <button className="p-2 rounded-full bg-Purple   focus:outline-none ">

                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:opacity-50  text-white opacity-70" fill="none" viewBox="0 0 24 24" stroke="black">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>



                    <div className="relative  bg-white shadow-md rounded-3xl p-2 my-3 cursor-pointer">
                        <div className="overflow-x-hidden rounded-2xl relative aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md  lg:aspect-none group-hover:opacity-75 lg:h-80   ">
                            <img className="h-full rounded-2xl w-full object-cover" src="https://unibookjo.com/images/Books/58/358362588_6501157333240536_2453742449784912702_n.jpg" />
                            <p className="absolute right-2 top-2 bg-white rounded-full p-2 cursor-pointer group">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:opacity-70" fill="none" viewBox="0 0 24 24" stroke="gray">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </p>
                        </div>
                        <div className="mt-4 pl-2 mb-2 flex justify-between ">
                            <div>
                                <p className="text-lg font-semibold text-gray-900 mb-0">Product Name</p>
                                <p className="text-lg  text-Purple mt-0">$340</p>
                            </div>
                            <div className="flex flex-col-reverse mb-1 mr-4 group cursor-pointer">
                                <button className="p-2 rounded-full bg-Purpl   focus:outline-none ">

                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:opacity-50  text-white opacity-70" fill="none" viewBox="0 0 24 24" stroke="black">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    </div>





                </div>
            </div>
  




    )
}
