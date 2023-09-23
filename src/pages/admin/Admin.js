import React, { useEffect, useState } from 'react'
import AddAdmin from '../../components/adminAccount/AddAdmin'
import AdminList from '../../components/adminAccount/AdminList'
import Sidebar from '../../components/adminAccount/Sidebar'
import Utils from '../../utils/helper'
import "../../components/adminAccount/sidebar.css"
import { useNavigate } from 'react-router-dom'
import config from '../../config/config'
import { toast, ToastContainer } from 'react-toastify';
import { AUTH_TOKEN, POST_METHOD } from '../../constants/constants'

export default function Admin () {
    const navigate = useNavigate();
    const [context] = Utils();
    const { authenticate, isAuthenticated } = context;

    const [adminAccounts, setAdminAccounts] = useState([]);
    const [email, setEmail] = useState(" ");

    const getAllAdminsAccount = async () => {
        try {
            const response = await fetch(`${config.backendEndPoint}/admin/all`, {
                headers: {
                    "auth-token": AUTH_TOKEN
                }
            });
            const { data } = await response.json();
            setAdminAccounts(data);
        } catch (error) {
            toast.error(error.message, {
                position: toast.POSITION.TOP_CENTER
            })
        }
    }

    const removeFormAdmin = async (email, adminQuery) => {
        const requestParams = POST_METHOD({ email: email, adminQuery: adminQuery });
        setEmail("")
        try {
            const response = await fetch(`${config.backendEndPoint}/admin/update`, requestParams)

            const data = await response.json();

            if (data.success) {
                if (adminQuery === 'admin') {
                    setAdminAccounts([...adminAccounts, data.data]);
                } else {
                    const newAccounts = adminAccounts.filter((account) => {
                        return account.email !== email
                    })
                    setAdminAccounts(newAccounts)
                }
                await getAllAdminsAccount()
                toast.success(data.message, {
                    position: toast.POSITION.TOP_CENTER
                })

            } else {
                toast.error(data.message, {
                    position: toast.POSITION.TOP_CENTER
                })
            }

        } catch (error) {
            toast.error(error.message, {
                position: toast.POSITION.TOP_CENTER
            })
        }
    }

    // const 

    useEffect(() => {
        async function run () {
            authenticate();
            if (AUTH_TOKEN === null) {
                navigate("/");
                return;
            }
            await getAllAdminsAccount();
        }
        run();
    }, []);

    return (
        <div className='flex customHeight'>
            <ToastContainer />
            <Sidebar />
            <div className='flex-1 '>
                <div className=' flex gap-3 flex-col p-5'>
                    <h1 className='text-2xl font-medium'>Add new admin</h1>
                    <div className='flex gap-2'>
                        <input style={{ border: "1.5px solid rgb(179 179 179)", borderRadius: "6px" }} className='p-2 flex-1 outline-none shadow-lg text-lg' type="text" value={email} onChange={(e) => { setEmail(e.target.value); console.log(email) }} />
                        <button className='text-lg bg-gray-300 px-4 font-medium hover:bg-gray-400 rounded-[4px]'
                            onClick={() => { removeFormAdmin(email, 'admin') }}>Add admin</button>
                    </div>
                </div>
                <div className='flex flex-col gap-3 p-5'>
                    <h1 className='text-2xl font-medium'>Existing admins</h1>
                    <h1 className='px-5 font-medium'>ADMIN GOOGLE EMAIL</h1>
                    {
                        adminAccounts.map(({ email, createdAt }) => {
                            return <div key={email} className='px-5 py-1 shadow-lg'>
                                <div className='flex justify-between items-center '>
                                    <div>
                                        <h1 className='text-lg font-medium'>{email}</h1>
                                    </div>
                                    <div>
                                        <h1 className='text-sm font-medium'>{createdAt}</h1>
                                    </div>
                                    <div>
                                        <button className='text-lg bg-gray-300 px-4 py-[3px] font-medium hover:bg-gray-400 rounded-[4px]' onClick={() => { removeFormAdmin(email, 'user') }}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}
