import React, { useEffect } from 'react'
import Card from '../../components/adminAccount/Card'
import Sidebar from '../../components/adminAccount/Sidebar'
import { useNavigate } from 'react-router-dom';
import Utils from '../../utils/helper';
import { AUTH_TOKEN } from '../../constants/constants';

export default function Admin () {
  const navigate = useNavigate();
  const [context] = Utils();
  const { getUserByToken, setLoggedUser } = context

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
      <div className='flex-1'>
        <h1 className="font-medium text-2xl ml-7 mt-5">Orders</h1>
        <div className="flex flex-wrap gap-3 justify-evenly py-5">
          <Card day="today" count="4" revenue="" />
          <Card day="this week" count="25" revenue="" />
          <Card day="this month" count="32" revenue="" />
        </div>

        <h1 className="font-medium text-2xl ml-7 mt-5">Revenue</h1>
        <div className="flex flex-wrap gap-3 justify-evenly py-5">
          <Card day="today" count="4" revenue="2043" />
          <Card day="this week" count="25" revenue="20200" />
          <Card day="this month" count="32" revenue="201110" />
        </div>
      </div>
    </div>
  )
}
