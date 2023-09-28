import React, { useEffect, useState } from 'react'
import Sidebar from '../../../components/adminAccount/Sidebar'
import Utils from '../../../utils/helper'

export default function OrderDetails () {
    const [context] = Utils();
    const { orderDetails } = context;

    useEffect(() => {
        // const path = window.location.pathname.split("/");
        // const orderId = path[path.length - 1];

        // const data = allOrders.filter((ele) => {
        //     console.log(ele._id)
        //     return ele._id == orderId;
        // })
        console.log(orderDetails)
        // setOrderDetails(data);
    }, [])
    return (
        <div className='flex customHeight'>
            <Sidebar />
            <div className='flex-1'>
                <div>
                    {orderDetails && orderDetails.orderItems.map((order, idx) => {
                        return <div key={idx}>
                            <div>
                                <img src={order.product.img} alt="" />
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}
