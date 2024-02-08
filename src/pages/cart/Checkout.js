import React from 'react'
import NotFound from '../../components/utils/NotFound';
import config from '../../config/config'
import { POST_METHOD } from '../../constants/constants'
import Utils from '../../utils/helper';

export default function Checkout ({ total, cartItems }) {

    const tax = parseInt((total * 15) / 100);
    const [context] = Utils();
    const { removeAllFromCart } = context;
    const orderCoutn = 0;
    const checkout = async () => {
        try {
console.log(cartItems)
            const items = cartItems.map((item) => {
                return {
                    name: item.product.title,
                    image: item.product.img,
                    price: item.product.price,
                    productId: item.product._id,
                    quantity: item.quantity,
                    userID: item.author,
                    userEmail: ""
                }
            })
            const reqParams = POST_METHOD({ items, shippingInfo: 'indore' })

            const response = await fetch(`${config.backendEndPoint}/create-checkout-session`, reqParams);
            const data = await response.json();
            if (data.success === true) {
                // await removeAllFromCart();
                // window.location.href = data.url
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <div className='p-3 flex flex-col gap-3' >
            <h1 className='text-gray-400 font-medium text-xl'>Cart details</h1>
            {/* <div className='checkoutDetailsPage flex flex-col gap-1'>
                <input type="text" name="" placeholder='Email' />
                <div className='flex justify-between gap-1'>
                    <input type="text" name="" placeholder='Name' />
                    <input style={{ width: "100px" }} type="text" name="" value="India" />
                </div>
                <input type="text" name="" placeholder='Street' />
                <div className='flex justify-between gap-1'>
                    <input type="text" name="" placeholder='City' />
                    <input type="text" name="" placeholder='State' />
                </div>
                <div className='flex justify-between gap-1'>
                    <input type="text" name="" placeholder='Pin Code' />
                    <input type="text" name="" placeholder='Phone number' />
                </div>
            </div> */}
            <div className="details text-md text-gray-600 flex flex-col justify-between ">
                <div>
                    <p>Items Total : </p>
                    <p>{total - tax}/</p>
                </div>
                <div>
                    <p>Shipping charges : </p>
                    <p>{(total < 500 && total != 0) ? "40/" : "0"}/</p>
                </div>
                <div>
                    <p>Tax amount (included) : </p>
                    <p>{tax}/</p>
                </div>
                <div className='h-[1px] w-[100%] border border-gray-500 bg-gray-500'></div>
                <div>
                    <p>Subtotal : </p>
                    <p>{(total < 500 && total != 0) ? `${total + 40}/` : `${total}`}/</p>
                </div>
            </div>

            <button className='outline-none rounded-md py-[6px] font-medium px-4 hover:bg-red-400 bg-red-400 text-white' disabled={!total} onClick={checkout}>checkout</button>
        </div >

    )
}
