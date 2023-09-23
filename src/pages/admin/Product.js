import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/adminAccount/Sidebar'
import { AUTH_TOKEN, POST_METHOD } from '../../constants/constants';
import Utils from '../../utils/helper'
import "./admin.css"
import { toast, ToastContainer } from 'react-toastify';
import config from '../../config/config';

export default function Product () {

  const [context] = Utils();
  const { getProducts, products, getProductById } = context;
  const [product, setProduct] = useState({
    _id: "",
    brand: "",
    title: "",
    description: "",
    img: [],
    category: [],
    price: 0,
    stock: 0,
  });
  const [show, setShow] = useState(false);
  const [filteredProduct, setFilteredProducts] = useState([]);
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

  const addProduct = async () => {

    const requestParams = POST_METHOD(product);

    const response = await fetch(`${config.backendEndPoint}/product/addproduct`, requestParams);

    const responseData = await response.json();

    if (!responseData.success) {
      toast.error(responseData.message, {
        position: toast.POSITION.TOP_CENTER
      })
      return;
    }
    toast.success(responseData.message, {
      position: toast.POSITION.TOP_CENTER
    })

    const data = await getProducts();
    setFilteredProducts(data)

    setShow(false);
    clear();
  }

  const fillDetailsInAddProductSection = async (productId) => {
    setShow(true);
    const data = await getProductById(productId, true);
    setProduct(data);
  }

  const deleteProduct = async (id) => {
    if (!window.confirm("are you sure")) {
      return;
    }
    const response = await fetch(`${config.backendEndPoint}/product/delete/${id}`, {
      method: 'DELETE',
      headers: {
        "auth-token": AUTH_TOKEN
      },
    });

    const data = await response.json();

    if (data.success) {
      const newData = products.filter(({ _id }) => {
        return _id !== id;
      })

      setFilteredProducts(newData);
      toast.success(data.message, {
        position: toast.POSITION.TOP_CENTER
      })
    } else {
      toast.success(data.message, {
        position: toast.POSITION.TOP_CENTER
      })
    }

  }

  const clear = () => {
    setProduct({
      brand: "",
      title: "",
      description: "",
      img: [],
      category: [],
      price: 0,
      stock: 0,
    });
  }


  return (

    <div className='flex h-[100vh]'>
      <ToastContainer />
      <Sidebar />
      <div className='flex-1 overflow-y-scroll'>
        <div className='px-5 pt-4 pd-1'>
          <button className={`text-sm bg-gray-300 px-5 py-2 font-medium hover:bg-gray-400 rounded-[4px] ${show && "hidden"}`} onClick={() => { setShow(!show) }}>Add new product</button>
        </div>
        {/* <div className=''> */}
        <div className={`addOrUpdateProduct flex gap-2 justify-between w-[100%] shadow-lg py-3 px-5 ${!show && "hidden"} transition-transform ease-in`}>
          <div className='flex flex-col gap-2'>
            <input type="text" placeholder='title' value={product.title} name="title"
              onChange={(e) => { setProduct({ ...product, [e.target.name]: e.target.value }) }} />
            <input type="text" placeholder='brand' value={product.brand}
              onChange={(e) => { setProduct({ ...product, [e.target.name]: e.target.value }) }} name="brand" />
            <textarea name="description" id="" rows="6" placeholder='description' value={product.description}
              onChange={(e) => { setProduct({ ...product, [e.target.name]: e.target.value }) }}></textarea>
            <div className='flex justify-between gap-2'>
              <input type="number" placeholder='stock' value={product.stock}
                onChange={(e) => { setProduct({ ...product, [e.target.name]: e.target.value }) }} name="stock" />
              <input type="number" placeholder='price' value={product.price}
                onChange={(e) => { setProduct({ ...product, [e.target.name]: e.target.value }) }} name="price" />
            </div>
            <input type="text" placeholder='enter category with space' value={product.category}
              onChange={(e) => { setProduct({ ...product, [e.target.name]: e.target.value }) }} name="category" />
            <div className='flex gap-1'>
              <button className='bg-gray-300 font-medium flex-1 hover:bg-gray-400'
                onClick={addProduct}>Add product</button>

              <button className='bg-red-400 font-medium text-white hover:bg-red-500
                w-max'
                onClick={clear}
              >Clear</button>
              <button className='bg-red-400 font-medium text-white hover:bg-red-500
                w-max'
                onClick={() => { setShow(false) }}
              >Close</button>
            </div>
          </div>
          <div className='flex w-[100%] flex-col gap-2'>
            <input type="text" placeholder='enter image url for multiple enter with space' value={product.img}
              onChange={(e) => { setProduct({ ...product, [e.target.name]: e.target.value }) }} name="img" />

            <div className='h-[332px]'>
              {product.img.length > 0 && <img className='h-[100%] w-[100%] object-contain' src={product.img} alt="" />}
            </div>
          </div>
        </div>
        {/* </div> */}
        <div className='flex flex-col gap-3 p-5 h-[100%]'>
          <input type="text" style={{ border: "1.5px solid rgb(179 179 179)", borderRadius: "6px" }} className='p-2 outline-none shadow-lg' onChange={searchProducts} placeholder="search any product you want" />
          {filteredProduct.length ? filteredProduct.map((product, idx) => {
            return <div key={idx} className='flex justify-between items-center px-5 py-1 shadow-lg '>
              <div>
                <h1 className='text-sm font-medium'>{product.title}</h1>
              </div>
              <div className='flex gap-3'>
                <button className='text-sm bg-gray-300 px-4 py-[3px] font-medium hover:bg-gray-400 rounded-[4px]' value={product._id}
                  onClick={() => { fillDetailsInAddProductSection(product._id) }}>Edit</button>
                <button className='text-sm bg-gray-300 px-4 py-[3px] font-medium hover:bg-gray-400 rounded-[4px]' value={product._id} onClick={() => { deleteProduct(product._id) }}>Delete</button>
              </div>
            </div>
          }) : <div className=' h-[100%] text-center font-bold text-xl text-gray-400'>Not found</div>}
        </div>
      </div>
    </div>
  )
}
