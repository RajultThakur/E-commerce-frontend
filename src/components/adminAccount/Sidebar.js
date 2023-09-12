import React from 'react'
import { Link,  useNavigate } from 'react-router-dom'
import { adminAccountPath, adminSidebarItems } from '../../constants/constants'
export default function Sidebar () {
    return (
        <div className='flex flex-col gap-4 px-10 pr-16 bg-[#f6f6f6] h-[100vh] w-[190px]'>
            <h3 className='text-xl font-bold text-gray-400'>Hii, David</h3>
            {adminSidebarItems.map((item, idx) => {
                return <div key={idx}>
                    <Link to={adminAccountPath+item} className='text-lg font-medium hover:text-gray-400 cursor-pointer'>{item}</Link>
                </div>
            })}
        </div>
    )
}
