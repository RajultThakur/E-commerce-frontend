import React from 'react'
import { Link } from 'react-router-dom'
import './error.css'

export default function NotLoggedIn () {
    return (
        <div className='gap-0 customHeight w-[100vw] flex flex-col justify-center items-center'>
            <h1 className='text-lg font-medium mb-[-3px] text-gray-500'>You are not logged in</h1>
            <h1 className='text-sm'>please login first <Link to="/auth/login" className='underline  text-blue-600'> Login</Link></h1>
        </div >
    )
}
