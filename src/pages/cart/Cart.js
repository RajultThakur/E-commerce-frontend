import React, { useEffect, useMemo, useState } from 'react'
import Utils from '../../utils/helper';
import CartItem from './CartItem';
import Checkout from './Checkout';
import "../admin/admin.css"
import "../../components/adminAccount/sidebar.css"
import { AUTH_TOKEN } from '../../constants/constants';
import NotLoggedIn from '../../components/error/NotLoggedIn';
import Loading from '../../components/Loading';
import NotFound from '../../components/utils/NotFound';
import { useSelector } from 'react-redux';
export default function Cart () {
    const [context] = Utils();
    const { cartPrice, loggedUser, getCartItems, getUserByToken } = context;
    const [loggedIn, setLoggedIn] = useState(true);
    const { cartProducts, isLoading, isError } = useSelector((state) => state.cartProducts)

    useEffect(() => {
        async function run () {
            // setLoading(true)
            const user = await getUserByToken();
            await getCartItems(user.id);
            // setLoading(false)
        }
        if (AUTH_TOKEN === null) {

            setLoggedIn(false)
        }
        else {
            run();
        }
    }, [])

    return (
        <div className='flex items-center flex-col md:flex-row gap-2'>
            {loggedIn == false ? <NotLoggedIn /> : isLoading == true ? <Loading /> : cartProducts.length != 0 ? <>
                <div className='flex-1 p-5 md:overflow-y-scroll productPage  '>

                    {cartProducts.map((ele) => {
                        return (
                            <CartItem key={ele._id} product={ele.product} id={ele._id} quantity={ele.quantity} />
                        )
                    })}
                </div>
                <div className='customHeight w-[350px] h-[170px] p-1'>
                    <Checkout total={cartPrice} cartItems={cartProducts} />
                </div></> :
                <NotFound heading="Your cart is empty"
                    subHeading="Add more items in you cart form." from="here" />
            }
        </div >
    )
}
