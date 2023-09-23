import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from "react-rating-stars-component";

export default function ProductCard ({ id, image, title, price, rating, brand }) {
    return (
        <div className='flex items-center gap-2 flex-wrap bg-[#efefef] rounded-lg'>
            <Link to={`/product/${id}`}>
                <div>
                    <div className='w-[300px] h-[170px] flex items-center bg-white'>
                        <img className='object-contain h-[100%] w-[100%]' src={image} alt="not found" />
                    </div>
                    <div className='flex flex-col justify-between items-start p-3'>

                        <div className='text-xl font-medium text-gray-400 mb-2'>
                            {title.length <= 25 ? title : title.substring(0, 22) + "..."}
                        </div>
                        <div>
                            <h1 className='text-md'>Price  <span className='font-medium ml-2'>₹{price}/</span></h1>
                        </div>
                        <div className='flex gap-2 justify-around items-center'>
                            <ReactStars
                                count={5}
                                value={4.5}
                                isHalf={true}
                                // onChange={ratingChanged}
                                size={28}
                                activeColor="#ffb700"
                            />
                            <div>
                                <h1 className='text-md italic'>powered by  <span className='font-medium italic text-gray-400 underline'>{brand}</span></h1>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-between items-center px-3 pb-3 gap-2'>
                        <button className='bg-gray-200 outline-none rounded-md w-[50%] py-[6px] font-medium px-4 hover:bg-gray-300'>Add to cart</button>
                        <button className='bg-red-400 outline-none rounded-md w-[50%] py-[6px] font-medium px-4 hover:bg-red-400 text-white'>Buy now</button>
                    </div>
                </div>
            </Link>
        </div >
    )
}
