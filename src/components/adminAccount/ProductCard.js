import React from 'react'

export default function ProductCard({productName}) {
  return (
    <div className='flex justify-between items-center px-5 py-1 shadow-lg '>
        <div>
            <h1 className='text-sm font-medium'>{productName}</h1>
        </div>
        <div className='flex gap-3'>
            <button className='text-sm bg-gray-300 px-4 py-[3px] font-medium hover:bg-gray-400 rounded-[4px]'>Edit</button>
            <button className='text-sm bg-gray-300 px-4 py-[3px] font-medium hover:bg-gray-400 rounded-[4px]'>Delete</button>
        </div>
    </div>
  )
}
