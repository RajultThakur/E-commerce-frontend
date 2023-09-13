import React from 'react'

export default function ProductCard({productName}) {
  return (
    <div className='px-5 py-1 shadow-lg'>
    <div className='flex justify-between items-center '>
        <div>
            <h1 className='text-lg font-medium'>{productName}</h1>
        </div>
        <div className='flex gap-3'>
            <button className='text-lg bg-gray-300 px-4 py-[3px] font-medium hover:bg-gray-400 rounded-[4px]'>Edit</button>
            <button className='text-lg bg-gray-300 px-4 py-[3px] font-medium hover:bg-gray-400 rounded-[4px]'>Delete</button>
        </div>
    </div>
    </div>
  )
}
