import React, { useState, useEffect } from 'react'
import ProductCard from '../components/products.js/ProductCard'
import SponsorProducts from '../components/products.js/SponsorProducts'
import { PRODUCTS, SPONSOR_PRODUCT } from '../constants/constants'
import "../components/adminAccount/sidebar.css"
import "./admin/admin.css"
import Utils from '../utils/helper'
import config from '../config/config'
export default function AllProduct () {
  const [context] = Utils();
  const { getProducts, products } = context;
  const [filteredProduct, setFilteredProducts] = useState([]);
  const [byPrice, setByPrice] = useState("")
  const [byRating, setByRating] = useState("")

  useEffect(() => {
    async function getData () {
      const data = await getProducts();
      setFilteredProducts(data)
    }
    getData();
  }, [])

  const searchProducts = async (e) => {
    let searchValue = e.target.value.toLowerCase();
    if (searchValue === "") {
      const data = await getProducts();
      setFilteredProducts(data)
    }
    let searchProducts = products.filter(({ title }) => {
      return title.toLowerCase().includes(searchValue);
    })
    setFilteredProducts(searchProducts)
  }

  const filterBox = () => {
    console.log('working')
  }

  const applyFilter = async (e) => {
    if (e.target.name === 'byPrice') {
      setByPrice(e.target.value);
    }
    if (e.target.name === 'byRating') {
      if (byRating === "") {
        setByRating(e.target.value);
      } else {
        setByRating("");
      }
    }
    let url = `${config.backendEndPoint}/product/products?${byPrice}&${byRating}`

    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  }

  return (
    <div className="flex">
      <div className='customHeight overflow-y-scroll productPage'>
        <div className='sticky gap-3 top-0 z-10 w-[100%] py-2 px-10 flex justify-center items-center bg-white mb-2'>

          <input type="text" className="searchBox w-[100%]"
            onChange={searchProducts} placeholder="search any product you want"
            name="img" />
          <div className='flex items-center cursor-pointer hover:text-gray-300 text-gray-500'
            onClick={filterBox}>

            <span className="material-icons">
              tune
            </span>

            {/* <div className="filterBox flex flex-col bg-red-300 absolute right-10 top-12 p-4 gap-3">
              <div>
                <input id="filter1" name="byRating" type="checkbox" value="rating=-1" onChange={(e) => { applyFilter(e) }} />
                <label htmlFor="filter1">sort by popularity
                </label>
              </div>
              <div>
                <input type="radio" id="filter2" name="byPrice" value="price=1" onChange={(e) => { applyFilter(e) }} />
                <label for="filter2">sort by low-high</label>
              </div>

              <div>
                <input type="radio" id="filter3" name="byPrice" value="price=-1" onChange={(e) => { applyFilter(e) }} />
                <label for="filter3">sort by high-low</label>
              </div>
              <div>
                <input id="filter4" type="checkbox" />
                <label htmlFor="filter4">clear
                </label>
              </div>
            </div> */}


          </div>
        </div>

        <div className='flex gap-4 flex-wrap justify-evenly items-center'>

          {
            filteredProduct.map(({ _id, img, title, price, rating, brand }) => {
              return <ProductCard key={_id} id={_id} image={img} title={title} price={price} rating={rating} brand={brand} />
            })
          }
        </div>
      </div>
      {/* <div className='customHeight flex flex-col p-1 justify-evenly'>
        <h1 className='text-center text-xl font-bold text-gray-400'>Sponsor Products</h1>
        {
          SPONSOR_PRODUCT.map(({ img, title }) => {
            return <SponsorProducts image={img} title={title} />
          })
        }
      </div> */}
    </div>
  )
}
