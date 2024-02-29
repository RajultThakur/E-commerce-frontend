import React, { useState, useEffect } from 'react'
import ProductCard from '../components/products.js/ProductCard'
import SponsorProducts from '../components/products.js/SponsorProducts'
import { GET_RANDOM_NUMBER, } from '../constants/constants'
import "../components/adminAccount/sidebar.css"
import "./admin/admin.css"
import Utils from '../utils/helper'
import CloseIcon from '@mui/icons-material/Close';
import Prompt from '../components/Loading'

export default function AllProduct ({hide=false}) {
  const [context] = Utils();
  const { getProducts, products } = context;
  const [filteredProduct, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState("")
  const [filterType, setFilterType] = useState("Default");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);

  const options = [
    { value: 'price=1', label: 'Low to high' },
    { value: 'price=-1', label: 'High to low' },
    { value: 'rating=-1', label: 'By popularity' }
  ]

  useEffect(() => {
    // async function getData () {
      setLoading(true);
      // const data = await getProducts();
      if (products == undefined) {
        setLoading(false);
        return <div>
          <h1>Internal server error!</h1>
        </div>
      }
      setFilteredProducts(products)
      setLoading(false);
    // }
    // getData();
  }, [products])

  let num1 = Math.floor(GET_RANDOM_NUMBER(0, products.length))
  let num2 = Math.floor(GET_RANDOM_NUMBER(0, products.length))

  const searchProducts = async (e) => {
    let searchValue = e.target.value.toLowerCase();
    if (searchValue === "") {
      setFilteredProducts(products)
    }
    let searchProducts = products.filter(({ title }) => {
      return title.toLowerCase().includes(searchValue);
    })
    setFilteredProducts(searchProducts)
  }

  const handleChange = async(e) => {
    let value = e.target.value;
    setLoading(true);
    setFilterType(e.target.value)
    await getProducts(value)
      let filteredValue;
      if (value === "price=1") {
        filteredValue = products.sort((a,b) => parseInt(a.price) - parseInt(b.price));
      } else if (value === "price=-1") {
        filteredValue = products.sort((a,b) => parseInt(b.price) - parseInt(a.price));
      } else {
        filteredValue = products
      }
      setLoading(false)
      setFilteredProducts(filteredValue);
  }

  return (
    <div className="flex">

      <div className={`customHeight ${!hide&&"overflow-y-scroll productPage"} w-full`}>

            {!hide && <div className='sticky gap-3 top-0 z-1 w-[100%] py-2 px-10 flex justify-start sm:justify-center items-center flex-col md:flex-row bg-white mb-2'>

              <input type="text" className="searchBox w-[100%]"
                onChange={searchProducts} placeholder="search any product you want"
                name="img" />

              <div className='flex gap-2 justify-start md:w-max w-full '>
              <select className='border border-[#d4cccc] rounded-md px-2 py-[7px] outline-none' onChange={handleChange} value={filterType}>
                <option value="">Default</option>
                <option value="price=1">Low to high</option>
                <option value="price=-1">High to low</option>
                <option value="rating=-1">By popularity</option>
              </select>

              <div className='flex items-center cursor-pointer hover:text-gray-300 text-gray-500'
                onClick={filterBox}>

                <span className="material-icons">
                  tune
                </span>

              </div>
              <div className='flex items-center cursor-pointer hover:text-gray-300 text-gray-500'
                onClick={() => { setShow(!show) }}><CloseIcon />
                </div>
              </div>
            </div>}

            {loading == true ?
              <Prompt message='Loading...'/> :
            <div className='flex gap-4 flex-wrap justify-evenly items-center transition-all w-full'>

              {filteredProduct.length>0 ? filteredProduct.map(({ _id, img, title, price, rating, brand }) => {
                return <ProductCard key={_id} id={_id} image={img} title={title} price={price} rating={rating} brand={brand} />
              }):
              <Prompt message='Not Found :('/>
              }
            </div>
            }
        
      </div>
      {/* {show && <div className='customHeight flex flex-col p-1 justify-evenly'>
        <h1 className='text-center text-xl font-bold text-gray-400'>Sponsor Products</h1>

        <SponsorProducts image={products[num1].img} title={products[num1].title} />
        <SponsorProducts image={products[num2].img} title={products[num2].title} />
      </div> */}
      {/* } */}
    </div>
  )
}
