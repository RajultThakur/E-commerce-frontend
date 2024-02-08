import React from 'react'

export default function Prompt ({message=""}) {
    return (
        <div className='h-[100%] w-[100vw] flex justify-center items-center text-xl text-gray-400'>
            <h1>{message}</h1>
        </div>
    )
}
