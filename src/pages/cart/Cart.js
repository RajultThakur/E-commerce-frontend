import React, { useEffect, useState } from 'react'
import Utils from '../../utils/helper';
import CartItem from './CartItem';
import Checkout from './Checkout';
import "../admin/admin.css"
import "../../components/adminAccount/sidebar.css"
import { AUTH_TOKEN } from '../../constants/constants';
import NotLoggedIn from '../../components/error/NotLoggedIn';
import Loading from '../../components/Loading';
import NotFound from '../../components/utils/NotFound';
export default function Cart () {
    const [context] = Utils();
    const { cartItems, cartPrice, loggedUser, getCartItems, getUserByToken } = context;
    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(true);

    useEffect(() => {
        async function run () {
            setLoading(true)
            const user = await getUserByToken();
            await getCartItems(user.id);
            console.log(cartItems)
            setLoading(false)

        }
        if (AUTH_TOKEN === null) {

            setLoggedIn(false)
        }
        else {
            run();
        }
    }, [])

    return (
        <div className='flex items-center flex-col md:flex-row gap-2 customHeight'>
            {loggedIn == false ? <NotLoggedIn /> : loading == true ? <Loading /> : cartItems.length != 0 ? <>
                <div className='flex-1 p-5 md:overflow-y-scroll productPage  '>

                    {cartItems.map((ele) => {
                        return (
                            <CartItem key={ele._id} product={ele.product} id={ele._id} quantity={ele.quantity} />
                        )
                    })}
                </div>
                <div className='customHeight w-[350px] h-[170px] p-1'>
                    <Checkout total={cartPrice} cartItems={cartItems} />
                </div></> :
                <NotFound heading="Your cart is empty"
                    subHeading="Add more items in you cart form." from="here" />
            }
        </div >
    )
}
