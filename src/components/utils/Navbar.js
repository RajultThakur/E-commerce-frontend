import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Utils from "../../utils/helper";
import SearchIcon from "@mui/icons-material/Search";
import { toast, ToastContainer } from "react-toastify";
function Navbar() {
  const [context] = Utils();
  const { authenticate, isAuthenticated } = context;
  const navigate = useNavigate();

  const logout = () => {
    if (localStorage.getItem("auth-token") === null) {
      return;
    }
    localStorage.removeItem("auth-token");
    navigate("/");
    authenticate();
    toast.success("Logout successful!", {
      position: toast.POSITION.BOTTOM_LEFT,
      autoClose: 2000,
    });
  };

  useEffect(() => {
    authenticate();
    console.log(isAuthenticated);
  }, []);

  return (
    <div>
      <ToastContainer />
      <div
        className="flex flex-wrap
                        justify-between
                        items-center
                        px-10
                        py-5
                        bg-[#f6f6f6]"
      >
        <div className="logo">
          <Link to="/" className="text-2xl      font-bold">
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
            Cart (10)
          </Link>
          <button onClick={logout}>Logout</button>
        </ul>

        <div className="search">
          <SearchIcon />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
