import React, { useEffect } from 'react'
import Banner from '../components/banner/Banner'
import { AUTH_TOKEN } from '../constants/constants';
import Utils from '../utils/helper'
import { PulseBubbleLoader } from "react-loaders-kit"
import AllProduct from './AllProduct';
const Home = () => {
  const [context] = Utils();
  const { getCartItems, getUserByToken, getAllOrders, setLoggedUser } = context;

  useEffect(() => {
    async function run () {
      if (AUTH_TOKEN !== null) {
        const user = await getUserByToken();
        await getAllOrders(user.id);
        await getCartItems(user.id);
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

  return (
    <div>
      <Banner />
      <PulseBubbleLoader />
      <AllProduct hide={true}/>
    </div>
  )
}

export default Home 