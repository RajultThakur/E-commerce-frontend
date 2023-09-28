import React from 'react'
import { Link } from 'react-router-dom'
import Utils from '../../../utils/helper'
export default function OrderCard ({ idx, order }) {
    const [context] = Utils();
    const { setOrderDetails } = context
    return (
        <div className='flex justify-between items-center px-5 py-2 shadow-lg w-[100%] text-gray-400'>


            <div>
                <h1 className='text-sm font-medium'>#orderID(#d43847uijd348883)</h1>
            </div>
            <div>
                <h1 className='text-sm font-medium text-green-400'>Status</h1>
            </div>
            <div>
                <h1 className='text-green-500 text-sm font-medium'>payment</h1>
            </div>
            <div>
                <h1 className='text-sm font-medium'>price/</h1>
            </div>
            <div>
                <h1 className='text-sm font-medium'>date</h1>
            </div>

            <div className='flex'>
                <h1 className='text-sm font-medium'>details</h1>
            </div>
        </div>
    )
}
