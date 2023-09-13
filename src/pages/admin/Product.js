import React, {useEffect, useState} from 'react'
import ProductCard from '../../components/adminAccount/ProductCard';
import Sidebar from '../../components/adminAccount/Sidebar'
import Utils from '../../utils/helper'

export default function Product() {

  const [context] = Utils();
  const {getProducts,  products} = context;
  useEffect(() => {
    getProducts()
  }, [])
  

  return (
    <div className='flex'>
        <Sidebar/>
        <div className='flex-1 '>
        <div className='flex flex-col gap-3 p-5 overflow-y-scroll bg-red-300 h-[600px]'>
        {products.products && products.products.map((product) => {
          return <ProductCard productName = {product.title}/>
        })}
        </div>
        </div>
    </div>
  )
}
