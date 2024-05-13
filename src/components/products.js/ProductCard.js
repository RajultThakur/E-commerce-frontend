import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from "react-rating-stars-component";
import Utils from '../../utils/helper';
import { ADDED_TO_CART, WISH_LISTED } from '../../constants/constants';
import { toast } from 'react-toastify';
import FavoriteIcon from '@mui/icons-material/Favorite';
export default function ProductCard ({ id, image, title, price, rating, brand }) {
    const [context] = Utils();
    const {
        loggedUser,
        addToCart,
        cartItemsCount,
        setCartItemsCount,
    } = context;

    const itemAddToCart = async (userId, productId, category) => {

        const data = await addToCart(userId, productId, category);
        if (data.success) {
            setCartItemsCount(cartItemsCount + 1);
            toast.success(data.message, {
                position: toast.POSITION.TOP_CENTER,
            })
        } else {
            toast.error(data.message, {
                position: toast.POSITION.BOTTOM_LEFT,
            })
        }
    }

    return (
        <div className='flex items-center gap-2 flex-wrap bg-[#efefef] rounded-lg'>
            <div>
                <Link to={`/product/${id}`}>
                    <div className='w-[300px] h-[170px] flex items-center bg-white'>
                        <img className='object-contain h-[100%] w-[100%]' src={image[0]} alt="not found" />
                    </div>
                    <div className='flex flex-col justify-between items-start p-3'>

                        <div className='text-xl font-medium text-gray-400 mb-2'>
                            {title.length <= 23 ? title : title.substring(0, 23) + "..."}
                        </div>
                        <div>
                            <h1 className='text-md'>Price  <span className='font-medium ml-2'>₹{price}/</span></h1>
                        </div>
                        <div className='flex gap-2 justify-between items-center w-full'>
                            <ReactStars
                                count={5}
                                value={rating}
                                isHalf={true}
                                // onChange={ratingChanged}
                                size={28}
                                activeColor="#ffb700"
                            />
                            <div className='relative left-0'>
                                <h1 className='text-md italic'><span className='font-medium italic text-gray-400 underline'>{brand.substring(0,17)}</span></h1>
                            </div>
                        </div>
                    </div>
                </Link>
                <div className='flex justify-between items-center px-3 pb-3 gap-2'>
                    <button className='bg-gray-200 outline-none rounded-md w-[50%] flex-1 py-[6px] font-medium px-4 hover:bg-gray-300'
                        onClick={() => { itemAddToCart(loggedUser.id, id, ADDED_TO_CART) }}>Add to cart</button>
                    <button className='outline-none rounded-md w-max py-[6px] font-medium px-4 hover:bg-gray-200 text-red-400'
                        onClick={() => { itemAddToCart(loggedUser.id, id, WISH_LISTED) }}><FavoriteIcon /> </button>
                </div>
            </div>
        </div >
    )
}
