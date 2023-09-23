import React, {
    useEffect, useState
} from 'react'
import config from '../config/config';
import ReactStars from "react-rating-stars-component";
import { DESCRIPTION } from '../constants/constants';

export default function ProductPage () {
    const [product, setProduct] = useState({})
    useEffect(() => {
        console.log()
        async function run () {
            let id = window.location.pathname.substring(9);
            let response = await fetch(`${config.backendEndPoint}/product/${id}`);
            let data = await response.json();
            console.log(data);
            setProduct(data.product)
        }
        run()
    }, [])

    return (
        <div className="flex p-10 gap-4">
            <div className='h-[380px] w-[400px]'>
                <img className=' w-[100%] h-[100%]' src={product.img} alt="" />
            </div>
            <div className="details flex-1">
                <div>
                    <h1 className='text-2xl'>{product.title}</h1>
                </div>
                <div className="description">
                    <p>{DESCRIPTION}</p>
                </div>
                <div className='mt-2'>
                    <h1 className='text-xl'>Price  <span className='font-medium ml-2'>₹{product.price}/</span></h1>
                </div>
                <div className='flex gap-2 justify-between items-center'>
                    <ReactStars
                        count={5}
                        value={4.5}
                        isHalf={true}
                        // onChange={ratingChanged}
                        size={28}
                        activeColor="#ffb700"
                    />
                    <div>
                        <h1 className='text-md italic'>powered by  <span className='font-medium italic text-gray-400 underline'>{product.brand}</span></h1>
                    </div>
                </div>
                <div className='flex justify-between items-center  pb-3 gap-2'>
                    <button className='bg-gray-200 outline-none rounded-md w-[50%] py-[6px] font-medium px-4 hover:bg-gray-300'>Add to cart</button>
                    <button className='bg-red-400 outline-none rounded-md w-[50%] py-[6px] font-medium px-4 hover:bg-red-400 text-white'>Buy now</button>
                </div>
            </div>
        </div>
    )
}
