import React, { useState } from 'react'
import Utils from '../../utils/helper';
import './cart.css'
import { toast } from 'react-toastify';
import { AUTH_TOKEN } from '../../constants/constants';

export default function CartItem ({ product, id, quantity }) {
    const { title, img, brand, price } = product;
    const [context] = Utils();
    const { removeFromCart, getCartItems, loggedUser } = context;
    const [loggedIn, setLoggedIn] = useState(true);
    const [selectedOption, setSelectedOption] = useState('option1');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const remove = async (id) => {
        const data = await removeFromCart(id);
        if (data.success) {
            await getCartItems(loggedUser.id);
            toast.success(data.message, {
                position: toast.POSITION.TOP_CENTER
            })
        } else {
            toast.error(data.message, {
                position: toast.POSITION.TOP_CENTER
            })
        }
    }

    // useEffect(() => {
    //     if (AUTH_TOKEN === null) {
    //         setLoggedIn(false)
    //     }
    // }, [])


    return (

        <div className='flex flex-col md:flex-row items-center justify-around'>
            <div className='w-[130px] h-[150px]'>
                <img className='object-contain w-[100%] h-[100%]' src={img} alt="" />
            </div>
            <div className='flex flex-col item gap-3'>
                <div>
                    <h1 className='text-xl  font-medium'>{title.substring(0, 20)}</h1>
                </div>
                <div className='flex gap-2 justify-around items-center'>
                    <div >
                        <h1 className='text-md'>Price  <span className='font-medium ml-2'>₹{price}/</span></h1>
                    </div>
                    <div>
                        <h1 className='text-md italic'>powered by  <span className='font-medium italic text-gray-400 underline'>{brand}</span></h1>
                    </div>
                </div>
                <div className='flex items-center justify-between'>

                    <select className='border border-[#d4cccc] rounded-md px-2 py-1 outline-none' value={selectedOption} onChange={handleOptionChange} >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                    <div>
                        <button className='bg-red-400 outline-none rounded-md py-[6px] font-medium px-4 hover:bg-red-400 text-white'
                            onClick={() => { remove(id) }}>Remove</button>
                    </div>
                </div>

            </div>
        </div>
    )
}
