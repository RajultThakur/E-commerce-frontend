import React from 'react'

export default function AddAdmin () {
    return (
        <>
            <h1 className='text-2xl font-medium'>Add new admin</h1>
            <div className='flex gap-2'>
                <input style={{ border: "1.5px solid rgb(179 179 179)", borderRadius: "6px" }} className='p-2 flex-1 outline-none shadow-lg text-lg' type="text" />
                <button className='text-lg bg-gray-300 px-4 font-medium hover:bg-gray-400 rounded-[4px]'>Add admin</button>
            </div>
        </>
    )
}
