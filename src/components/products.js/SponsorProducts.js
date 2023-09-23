import React from 'react'

export default function SponsorProducts ({ image, title }) {
    return (
        <div className='w-[250px] h-[170px] p-1 bg-white cursor-pointer rounded-lg transition-all ease-in-out hover:h-[200px]'>
            <img className=" rounded-lg object-contain w-[100%] h-[100%]" src={image} alt="not found" />

        </div>
    )
}
