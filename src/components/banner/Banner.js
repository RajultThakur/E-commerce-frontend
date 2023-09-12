import React from 'react'
import './banner.css'
function Banner () {
    return (
        <div className=''>
            <div className="content absolute top-[200px] px-10">
                <h1 className='title text-3xl'>
                    Shop special edition</h1>
                <p className="description">Special colours available on samsung.com
                </p>
            </div>

            <div className="div bannerImage">
                <img src="https://images.samsung.com/in/smartphones/galaxy-z-fold5/buy/kv_exclusive_PC.jpg" alt="" />
            </div>
        </div>
    )
}

export default Banner