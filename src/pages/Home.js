import React, { useEffect } from 'react'
import Banner from '../components/banner/Banner'
import Utils from '../utils/helper'
const Home = () => {
  const [context] = Utils();
  const { getCartItems, getUserByToken } = context;

  useEffect(() => {
    async function run () {
      const user = await getUserByToken();
      await getCartItems(user.id);
    }
    run();
  }, [])

  return (
    <div>
      <Banner />
    </div>
  )
}

export default Home 