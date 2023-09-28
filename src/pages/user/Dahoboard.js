import React, { useEffect } from 'react'
import Card from '../../components/adminAccount/Card'
import Sidebar from '../../components/adminAccount/Sidebar'
import { useNavigate } from 'react-router-dom';
import Utils from '../../utils/helper';
import { AUTH_TOKEN } from '../../constants/constants';

export default function Admin () {
    const navigate = useNavigate();
    const [context] = Utils();
    const { getUserByToken, setLoggedUser, loggedUser } = context

    useEffect(() => {
        async function run () {
            if (AUTH_TOKEN !== null) {
                const user = await getUserByToken();
            } else {
                setLoggedUser({
                    id: '',
                    name: "",
                    email: ''
                })
                navigate("/")
                return;
            }
        }
        run();
    }, []);
    return (
        <div className='flex customHeight'>
            <Sidebar />
            <div className='flex-1 text-center text-2xl font-medium text-gray-400'>
                {loggedUser.name}
            </div>
        </div>
    )
}
