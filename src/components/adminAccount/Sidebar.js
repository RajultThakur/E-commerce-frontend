import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { adminAccountPath, adminSidebarItems, ADMIN_ACCOUNT_PATH, AUTH_TOKEN, userSidebarItems, USER_ACCOUNT_PATH } from '../../constants/constants'
import Utils from '../../utils/helper';
import { toast } from "react-toastify";
import "./sidebar.css";
import { MoveRight, MoveLeft } from 'lucide-react';

export default function Sidebar () {
  const navigate = useNavigate();
  const [context] = Utils();
  const { getUserByToken, loggedUser, setLoggedUser } = context;
  const [sidebarItems, setSidebarItems] = useState(userSidebarItems)
  const [path, setPath] = useState(USER_ACCOUNT_PATH)
  const [show, setShow] = useState(false)

  const handleChange = () => {
    setShow(!show)
  }

  const handleChangeV2 = () => {
    setShow((prev) => {
      if(prev){
        setShow(false)
      }
    })
  }

  useEffect(() => {
    async function run () {
      if (AUTH_TOKEN !== null) {
        const user = await getUserByToken();
        if (user.role === 'admin') {
          setSidebarItems(adminSidebarItems)
          setPath(ADMIN_ACCOUNT_PATH);
        }
      } else {
        setLoggedUser({
          id: '',
          name: "",
          email: ''
        })
      }
    }
    run();
  }, [])


  const logout = async () => {
    if (AUTH_TOKEN === null) {
      return;
    }
    localStorage.removeItem("auth-token");

    toast.success("Logout successful!", {
      position: toast.POSITION.BOTTOM_LEFT,
      autoClose: 2000,
    });
    navigate("/");
    window.location.reload()
  };
  return (
    <>
    <div onClick={handleChangeV2} className={`${show ? "absolute transition-all w-max flex" : "hidden"} transition-all md:flex flex-col gap-4 px-10 pr-16 bg-[#efefef] w-[190px] customHeight`} >
      <h3 className='text-xl font-bold text-gray-400'>Hii, {loggedUser.name.toUpperCase().split(" ")[0]}</h3>
      {sidebarItems.map((item, idx) => {
        return <div key={idx}>
          <Link to={path + item} className='text-lg font-medium hover:text-gray-400 cursor-pointer'>{item}</Link>
        </div>
      })}
      <div>
        <button className='text-lg font-medium hover:text-gray-400 cursor-pointer' onClick={logout}>Logout</button>
      </div>
    </div>
    
    <div onClick={handleChange} className='md:hidden w-8 flex items-center justify-center cursor-pointer h-8 rounded-full'>
    {!show ? <MoveRight /> : <MoveLeft/>}
    </div>
    
    </>
  )
}
