import React from 'react'
import Utils from '../../utils/helper';
import CartItem from './CartItem';
import Checkout from './Checkout';
import "../admin/admin.css"
export default function Cart () {
    const [context] = Utils();
    const { cartItems, cartPrice } = context;
    return (
        <div className='flex gap-2 customHeight'>
            <div className='flex-1 p-5 overflow-y-scroll '>

                {cartItems.map((ele) => {
                    return (
                        <CartItem key={ele._id} product={ele.product} quantity={ele.quantity} />
                    )
                })}
            </div>
            <div className='customHeight w-[250px] h-[170px] p-1 bg-red-300'>
                <Checkout total={cartPrice} cartItems={cartItems} />
            </div>
        </div>
    )
}
