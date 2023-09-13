import React, {useEffect} from 'react'
import AddAdmin from '../../components/adminAccount/AddAdmin'
import AdminList from '../../components/adminAccount/AdminList'
import Sidebar from '../../components/adminAccount/Sidebar'
import Utils from '../../utils/helper'
import { useNavigate } from 'react-router-dom'

export default function Admin () {
    const navigate = useNavigate();
    const [context] = Utils();
    const {authenticate, isAuthenticated } = context

    useEffect(() => {
        authenticate();
        if(!isAuthenticated){
            navigate("/");
            return;
        }
      }, []);

    return (
        <div className='flex'>
            <Sidebar />
            <div className='flex-1 '>
                <div className=' flex gap-3 flex-col p-5'>
                    <AddAdmin />
                </div>
                <div className='flex flex-col gap-3 p-5'>
                    <h1 className='text-2xl font-medium'>Existing admins</h1>
                    <h1 className='px-5 font-medium'>ADMIN GOOGLE EMAIL</h1>
                    <AdminList email="david@gmail.com" date="2023-04-06 15:55:51" />
                </div>
            </div>
        </div>
    )
}
