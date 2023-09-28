import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Utils from "../../utils/helper";
import SearchIcon from "@mui/icons-material/Search";
import { AUTH_TOKEN } from "../../constants/constants";
function Navbar () {
  const [context] = Utils()
  const { getUserByToken, getCartItems, cartItemsCount, setLoggedUser } = context;
  const [path, setPath] = useState('user')

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
        className="flex
                        justify-between
                        items-center
                        px-10
                        py-5
                        bg-[#efefef]"
      >
        <div className="logo">
          <Link to="/" className="text-2xl font-bold">
            E-Commerce
          </Link>
        </div>
        <ul className="flex md:max-sm:flex-shrink">
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
            All Products
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

        <div className="search">
          <SearchIcon />
        </div>
      </div>
    </div >
  );
}

export default Navbar;
