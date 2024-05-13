import React, { useState, useEffect } from 'react'
import ProductCard from '../components/products.js/ProductCard'
import "../components/adminAccount/sidebar.css"
import "./admin/admin.css"
import CloseIcon from '@mui/icons-material/Close';
import Prompt from '../components/Loading'
import { useSelector } from "react-redux"
import { useFetchCartProduct } from '../hooks/useFetchCartProducts';
export default function AllProduct ({ hide = false }) {
  const { products, isLoading, isError } = useSelector((state) => state.products)
  // const { cartProducts} = useSelector((state) => state.products)const user = useSelector((state) => state.auth)
  // const {products} = useSelector((state) => state.products)
  const {cartProducts} = useSelector((state) => state.cartProducts)
  const user = useSelector((state) => state.auth)

  const [filteredProduct, setFilteredProducts] = useState([]);
  const [filterType, setFilterType] = useState("Default");
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isError) {
      return <div>
        <h1>Internal server error!</h1>
      </div>
    }
    else if (products === null) return;

    setFilteredProducts(products)
  }, [products])

  const searchProducts = async (e) => {
    let searchValue = e.target.value.toLowerCase();
    if (searchValue === "") {
      setFilteredProducts(products)
    }
    let searchProducts = products.filter((product) => {
      return Object.values(product).
        join(' ').
        toLowerCase().
        includes(searchValue);
    })
    setFilteredProducts(searchProducts)
  }

  const handleChange = async (e) => {
    let value = e.target.value;
    let filteredValue = [...products]
    setFilterType(e.target.value)

    if (value === "price=1") {
      filteredValue = filteredValue.sort((a, b) => parseInt(a.price) - parseInt(b.price));
    } else if (value === "price=-1") {
      filteredValue = filteredValue.sort((a, b) => parseInt(b.price) - parseInt(a.price));
    } else {
      filteredValue = products
    }

    setFilteredProducts(filteredValue);
  }

  if (isLoading === true) {
    return <Prompt message='Loading...' />
  }

  return (
    <div className="flex">

      <div className={`customHeight ${!hide && "overflow-y-scroll productPage"} w-full`}>

        {!hide && <div className='sticky z-10 gap-3 top-0 z-1 w-[100%] py-2 px-10 flex justify-start sm:justify-center items-center flex-col md:flex-row bg-white mb-2'>

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

            <div className='flex items-center cursor-pointer hover:text-gray-300 text-gray-500'>
              <span className="material-icons">
                tune
              </span>

            </div>
            <div className='flex items-center cursor-pointer hover:text-gray-300 text-gray-500'
              onClick={() => { setShow(!show) }}><CloseIcon />
            </div>
          </div>
        </div>}

        <div className='flex gap-4 flex-wrap justify-evenly items-center transition-all w-full'>

          {filteredProduct.length > 0 ? filteredProduct.map(({ _id, img, title, price, rating, brand }) => {
            return <ProductCard key={_id} id={_id} image={img} title={title} price={price} rating={rating} brand={brand} />
          }) :
            <Prompt message='Not Found :(' />
          }
        </div>
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
