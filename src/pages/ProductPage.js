import React, {
    useEffect, useState
} from 'react'
import config from '../config/config';
import ReactStars from "react-rating-stars-component";
import { ADDED_TO_CART, DESCRIPTION, POST_METHOD } from '../constants/constants';
import Utils from '../utils/helper';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

export default function ProductPage () {
    const {user} = useSelector(state => state.auth)
    const [product, setProduct] = useState({});
    const [context] = Utils();
    const {
        loggedUser,
        addToCart,
        cartItemsCount,
        setCartItemsCount,
    } = context;

    const checkout = async (products) => {
        try {
            const items = products.map((item) => {
                return {
                    name: item.title,
                    image: item.img,
                    price: item.price,
                    productId: item._id,
                    quantity: 1,
                    userID: user.id,
                    userEmail: ""
                }
            })
            const reqParams = POST_METHOD({ items, shippingInfo: 'indore' })

            const response = await fetch(`${config.backendEndPoint}/create-checkout-session`, reqParams);
            const data = await response.json();
            if (data.success === true) {
                // await removeAllFromCart();
                window.location.href = data.url
            }
        } catch (error) {
            console.log(error.message)
        }
    }

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

    useEffect(() => {
        async function run () {
            let id = window.location.pathname.substring(9);
            let response = await fetch(`${config.backendEndPoint}/product/${id}`);
            let data = await response.json();
            setProduct(data.product)
        }
        run()
    }, [])

    return (
        <div className="flex flex-col md:flex-row p-10 gap-4">
            <div className='md:h-[380px] md:w-[400px]'>
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
                    <button className='bg-gray-200 outline-none rounded-md w-[50%] py-[6px] font-medium px-4 hover:bg-gray-300'
                        onClick={() => { itemAddToCart(loggedUser.id, product._id, ADDED_TO_CART) }}>Add to cart</button>
                    <button className='bg-red-400 outline-none rounded-md w-[50%] py-[6px] font-medium px-4 hover:bg-red-400 text-white'
                        onClick={() => { checkout([product]) }}
                    >Buy now</button>
                </div>
            </div>
        </div>
    )
}
