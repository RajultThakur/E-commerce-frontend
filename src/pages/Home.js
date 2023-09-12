import React from 'react'
import Banner from '../components/banner/Banner'
import Utils from '../utils/helper'
const Home = () => {
  const [context] = Utils();
  const {} = context
  return (
    <div>
        <Banner/>
    </div>
  )
}

export default Home 