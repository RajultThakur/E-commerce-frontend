import React from 'react'
import { Link } from 'react-router-dom'
import './banner.css'
function Banner () {
    return (
        <div className=''>
            <Link to="/product/64d22bc5511e2c508e5a2b76">
                <div className="content absolute top-[200px] px-10">
                    <h1 className='title text-3xl'>
                        Shop special edition</h1>
                    <p className="description">Special colours available on samsung.com
                    </p>
                </div>

                <div className="div bannerImage">
                    <img src="https://images.samsung.com/in/smartphones/galaxy-z-fold5/buy/kv_exclusive_PC.jpg" alt="" />
                </div>
            </Link>
        </div>
    )
}

export default Banner