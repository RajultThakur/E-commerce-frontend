import React, { useCallback, useEffect } from 'react'
import Banner from '../components/banner/Banner'
import { AUTH_TOKEN, getUserDetailsByTokenAndSetToStore } from '../constants/constants';
import Utils from '../utils/helper'
import { PulseBubbleLoader } from "react-loaders-kit"
import AllProduct from './AllProduct';
import { useSelector } from 'react-redux';
const Home = () => {
  const [context] = Utils();
  const { getCartItems, getAllOrders } = context;
  const user = useSelector((state) => state.auth);

  // useCallback(() => {
  //   ;(async function run () {
  //     await getAllOrders(user?.user.id);
  //     await getCartItems(user?.user.id);
  //   })();
  // },[user])

  useEffect(() => {
    if(user?.user === null) return;
    ;(async function run () {
        await getAllOrders(user?.user.id);
        await getCartItems(user?.user.id);
      })();
  }, [user.user])

  return (
    <div>
      <Banner />
      <PulseBubbleLoader />
      <AllProduct hide={true}/>
    </div>
  )
}
export default Home 