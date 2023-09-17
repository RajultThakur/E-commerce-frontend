import React from 'react'
import { Link,  useNavigate } from 'react-router-dom'
import { adminAccountPath, adminSidebarItems } from '../../constants/constants'
import Utils from '../../utils/helper';
import { toast, ToastContainer } from "react-toastify";
import "./sidebar.css";

export default function Sidebar () {
    const navigate = useNavigate();
    const [context] = Utils();
    const {authenticate} = context;
    const logout = () => {
        if (localStorage.getItem("auth-token") === null) {
          return;
        }
        localStorage.removeItem("auth-token");
        navigate("/");
        authenticate();
        toast.success("Logout successful!", {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 2000,
        });
      };
    return (
        <div className='flex flex-col gap-4 px-10 pr-16 bg-[#efefef] w-[190px] customHeight' >
            <ToastContainer/>
            <h3 className='text-xl font-bold text-gray-400'>Hii, David</h3>
            {adminSidebarItems.map((item, idx) => {
                return <div key={idx}>
                    <Link to={adminAccountPath+item} className='text-lg font-medium hover:text-gray-400 cursor-pointer'>{item}</Link>
                </div>
            })}
            <div>
            <button className='text-lg font-medium hover:text-gray-400 cursor-pointer' onClick={logout}>Logout</button>
            </div>
        </div>
    )
}
