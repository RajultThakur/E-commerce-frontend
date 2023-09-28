import React, { useEffect, useState } from 'react'
import Sidebar from '../../../components/adminAccount/Sidebar'
import Utils from '../../../utils/helper'
import OrderCard from './OrderCard';
import { Link } from 'react-router-dom'
import { AUTH_TOKEN } from '../../../constants/constants';
import NotFound from '../../../components/utils/NotFound';

export default function Order () {
  const [context] = Utils();
  const { setLoggedUser, getAllOrders, allOrders, getUserByToken } = context;
  const [orderId, setOrderId] = useState(0);
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function run () {
      setLoading(true);
      if (AUTH_TOKEN !== null) {
        const user = await getUserByToken();
        await getAllOrders(user.id);
      } else {
        setLoggedUser({
          id: '',
          name: "",
          email: ''
        })
      }
      setLoading(false)
    }
    run();
  }, [])

  const showOrderDetails = (idx) => {
    setOrderId(idx);
    setShow(true)
  }

  return (
    <div className='flex customHeight'>
      <Sidebar />
      <div className='flex-1 overflow-y-scroll'>

        {show && <><h1 className='font-medium text-xl text-gray-500 p-3'>#{allOrders[orderId]._id}</h1> <div className="details_ p-3 flex gap-3 flex-wrap">

          {allOrders[orderId].orderItems.map((order, idx) => {
            return <div key={idx} className="bg-gray-100 border border-gray-400 rounded-lg flex justify-between gap-2 w-[49%] mb-3">
              <div className='w-[100px] h-[100px] rounded-lg bg-white '>
                <img src={order.product.img} className="w-[100%] h-[100%] object-contain" alt="" />
              </div>
              <div className='flex flex-1 flex-col gap-1'>
                <h1 className='text-sm text-black'>{order.name}</h1>
                <h1 className='text-sm text-black'>Price : {order.price}</h1>
                <h1 className='text-sm text-black'>{allOrders[orderId].orderStatus}</h1>
                <h1 className='text-sm text-black'>{allOrders[orderId].paymentInfo.status}</h1>

              </div>
            </div>
          })}
        </div></>
        }

        <OrderCard />
        {loading === true ? <div className='customHeight flex justify-center items-center '>
          <h1 className='w-[100%] text-center text-lg text-gray-400'>Loading...</h1> </div> : allOrders.length == 0 ?
          <NotFound heading="No order found." subHeading="Place your first order today." from="Buy" />
          :
          allOrders.map((order, idx) => {
            return <div key={idx} className='flex justify-between items-center px-5 py-2 shadow-lg w-[100%] text-gray-400'>

              <div className='flex gap-2 justify-between items-center w-max'>
                <h1 className='text-sm font-medium text-black'>{idx + 1}.</h1>
                <h1 className='text-sm font-medium'>#{order._id}</h1>
              </div>
              <div>
                <h1 className='text-sm font-medium text-green-400'>{order.orderStatus}...</h1>
              </div>
              <div>
                <h1 className='text-green-500 text-sm font-medium'>{order.paymentInfo.status}</h1>
              </div>
              <div>
                <h1 className='text-sm font-medium'>{order.paymentInfo.amountPaid}/</h1>
              </div>
              <div>
                <h1 className='text-sm font-medium'>{order.createAt.substring(0, 10)}</h1>
              </div>

              <div className='flex'>
                <button className='text-sm bg-gray-300 px-4 py-[3px] font-medium hover:bg-gray-400 rounded-[4px]' value={idx} onClick={() => { showOrderDetails(idx) }}>Details</button>
              </div>
            </div>
          })
        }
      </div>
    </div >
  )
}
