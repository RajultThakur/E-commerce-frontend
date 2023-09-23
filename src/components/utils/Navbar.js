import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Utils from "../../utils/helper";
import SearchIcon from "@mui/icons-material/Search";
function Navbar () {
  const [context] = Utils()
  const { authenticate, isAuthenticated, getUserByToken, getCartItems, cartItemsCount } = context;

  useEffect(() => {
    async function run () {
      const data = await getUserByToken();
      await getCartItems(data.id);
      authenticate();
    }
    run();
    authenticate();
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
          <Link
            to={
              isAuthenticated === true
                ? "/account/admin/dashboard"
                : "/auth/login"
            }
            className="hover:text-gray-400 mx-3 font-medium text-lg list-none"
          >
            {isAuthenticated === true ? "Account" : "Login"}
          </Link>
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
    </div>
  );
}

export default Navbar;
