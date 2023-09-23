import React from 'react'
import './cart.css'
export default function CartItem ({ product, quantity }) {
    const { title, img, brand, price } = product;
    return (

        <div className='flex items-center justify-around'>
            <div className='w-[130px] h-[150px]'>
                <img className='object-cover w-[100%] h-[100%]' src={img} alt="" />
            </div>
            <div className='flex flex-col gap-3'>
                <div>
                    <h1 className='text-xl  font-medium'>{title}</h1>
                </div>
                <div>
                    <div className='flex gap-2 justify-around items-center'>
                        <h1 className='text-md'>Price  <span className='font-medium ml-2'>₹{price}/</span></h1>
                        <div>
                            <h1 className='text-md italic'>powered by  <span className='font-medium italic text-gray-400 underline'>{brand}</span></h1>
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-between'>
                    <div className='flex quantityBtn'>
                        <div className=''>
                            <button className=''>-</button>
                        </div>
                        <div>
                            {quantity}
                        </div>
                        <div>
                            <button>+</button>
                        </div>
                    </div>
                    <div>
                        <button className='bg-red-400 outline-none rounded-md py-[6px] font-medium px-4 hover:bg-red-400 text-white'>Buy now</button>
                    </div>
                </div>

            </div>
        </div>
    )
}
