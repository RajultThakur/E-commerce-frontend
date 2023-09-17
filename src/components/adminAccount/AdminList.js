import React from 'react'

export default function AdminList ({ email, date }) {
    return (
        <>
            <div className='px-5 py-1 shadow-lg'>
                <div className='flex justify-between items-center '>
                    <div>
                        <h1 className='text-lg font-medium'>{email}</h1>
                    </div>
                    <div>
                        <h1 className='text-sm font-medium'>{date}</h1>
                    </div>
                    <div>
                        <button className='text-lg bg-gray-300 px-4 py-[3px] font-medium hover:bg-gray-400 rounded-[4px]'>Delete</button>
                    </div>
                </div>
            </div>
        </>
    )
}
