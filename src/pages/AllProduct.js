import React, { useState, useEffect } from 'react'
import ProductCard from '../components/products.js/ProductCard'
import SponsorProducts from '../components/products.js/SponsorProducts'
import { GET_RANDOM_NUMBER, } from '../constants/constants'
import "../components/adminAccount/sidebar.css"
import "./admin/admin.css"
import Utils from '../utils/helper'
import CloseIcon from '@mui/icons-material/Close';
import Loading from '../components/Loading'
export default function AllProduct () {
  const [context] = Utils();
  const { getProducts, products } = context;
  const [filteredProduct, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState("")
  const [filterType, setFilterType] = useState("Defalut");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData () {
      setLoading(true);
      const data = await getProducts();
      if (data == undefined) {
        setLoading(false);
        return <div>
          <h1>Internal server error!</h1>
        </div>
      }
      setFilteredProducts(data)
      setLoading(false);
    }
    getData();
  }, [])

  let num1 = Math.floor(GET_RANDOM_NUMBER(0, products.length))
  let num2 = Math.floor(GET_RANDOM_NUMBER(0, products.length))

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

  const handleChange = (e) => {
    let value = e.target.value;
    setFilter(value);
    let filter_type = "Default";
    if (value === "price=1") {
      filter_type = "low to high"
    } else if (value === "price=-1") {
      filter_type = "high to low"
    } else if (value === "rating=-1") {
      filter_type = "by popularity"
    }
    setFilterType(filter_type);
    console.log(filter)
    console.log(filterType)
  }

  return (
    <div className="flex">

      <div className='customHeight overflow-y-scroll productPage'>
        {loading == true ?
          <Loading /> :
          <>
            <div className='sticky gap-3 top-0 z-10 w-[100%] py-2 px-10 flex justify-center items-center bg-white mb-2'>

              <input type="text" className="searchBox w-[100%]"
                onChange={searchProducts} placeholder="search any product you want"
                name="img" />

              <select className='border border-[#d4cccc] rounded-md px-2 py-[7px] outline-none' value={filterType} onChange={handleChange} >
                <option value="">Default</option>
                <option value="price=1">low to high</option>
                <option value="price=-1">high to low</option>
                <option value="rating=-1">by popularity</option>
              </select>


              <div className='flex items-center cursor-pointer hover:text-gray-300 text-gray-500'
                onClick={filterBox}>

                <span className="material-icons">
                  tune
                </span>

              </div>
              <div className='flex items-center cursor-pointer hover:text-gray-300 text-gray-500'
                onClick={() => { setShow(!show) }}><CloseIcon /></div>
            </div>

            <div className='flex gap-4 flex-wrap justify-evenly items-center'>

              {filteredProduct.map(({ _id, img, title, price, rating, brand }) => {
                return <ProductCard key={_id} id={_id} image={img} title={title} price={price} rating={rating} brand={brand} />
              })
              }
            </div>
          </>
        }

      </div>
      {show && <div className='customHeight flex flex-col p-1 justify-evenly'>
        <h1 className='text-center text-xl font-bold text-gray-400'>Sponsor Products</h1>

        <SponsorProducts image={products[num1].img} title={products[num1].title} />
        <SponsorProducts image={products[num2].img} title={products[num2].title} />
      </div>
      }
    </div>
  )
}
