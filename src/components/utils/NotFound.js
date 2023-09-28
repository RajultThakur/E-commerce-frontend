import React from 'react'
import { Link } from 'react-router-dom'
import "../custom.css"
export default function NotFound ({ heading, subHeading, from }) {
    return (
        <div className='customHeight flex w-[100%] flex-col justify-center items-center '>
            <h1 className='w-[100%] text-center text-lg text-gray-400'>{heading}</h1>
            <h1 className='w-[100%] text-center text-sm text-gray-400'>{subHeading}<Link to='/products' className='underline text-blue-400'>{from}</Link></h1>
        </div>
    )
}
