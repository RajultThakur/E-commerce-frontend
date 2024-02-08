import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Utils from "../../utils/helper";
import SearchIcon from "@mui/icons-material/Search";
import { AUTH_TOKEN } from "../../constants/constants";
import { Menu, X } from 'lucide-react';
function Navbar () {
  const [context] = Utils()
  const { getUserByToken, getCartItems, cartItemsCount, setLoggedUser } = context;
  const [show, setShow] = useState(false)
  const [path, setPath] = useState('user')

  const handleChange = () => {
    setShow(!show)
  }
  const handleChangeV2 = () => {
    setShow((prev) => {
      if(show){
        setShow(false)
      }
    })
  }

  useEffect(() => {
    async function run () {
      if (AUTH_TOKEN !== null) {
        const data = await getUserByToken();
        // await getCartItems(data.id);
        if (data.role == 'admin') {
          setPath('admin')
        }
      } else {
        setLoggedUser({
          id: '',
          name: "",
          email: ''
        })
      }
    }
    run();
  }, []);

  return (
    <div>
      <div
        className="justify-between items-center px-10 py-5 bg-[#efefef] flex"

      >
        <div className="logo">
          <Link to="/" className="text-2xl font-bold">
            E-Commerce
          </Link>
        </div>
        <ul onClick={handleChangeV2} className={`z-10
         md:flex flex-shrink ${show ? "bg-[#efefef] shadow-xl transition-all absolute right-10 top-[80px] flex-col w-40 gap-2 p-2 flex " : "hidden"}`}>
          <Link
            to="/"
            className="hover:text-gray-400 mx-3 font-medium text-lg list-none"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="hover:text-gray-400 mx-3 font-medium text-lg list-none"
          >
            Products
          </Link>
          <Link
            to="/category"
            className="hover:text-gray-400 mx-3 font-medium text-lg list-none"
          >
            Category
          </Link>
          {
            localStorage.getItem("auth-token") !== null &&
            <Link
              to={`/account/${path}/dashboard`}
              className="hover:text-gray-400 mx-3 font-medium text-lg list-none"
            >Account
            </Link>
          }
          {
            localStorage.getItem("auth-token") == null && <Link to="/auth/login" className="hover:text-gray-400 mx-3 font-medium text-lg list-none">Login</Link>
          }
          <Link
            to="/cart"
            className="hover:text-gray-400 mx-3 font-medium text-lg list-none"
          >
            Cart ({cartItemsCount})
          </Link>
        </ul>

        <div className="search hidden md:block">
          <SearchIcon />
        </div>

        <div onClick={handleChange} className="search cursor-pointer flex md:hidden ">
          {
            show ? <X /> : <Menu />
          }
        </div>

      </div>
    </div >
  );
}

export default Navbar;
