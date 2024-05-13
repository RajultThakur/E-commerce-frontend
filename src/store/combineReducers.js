import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import productSlice from "./productSlice"
import cartSlice from "./cartSlice";

const rootReducers = combineReducers({
    auth : authSlice,
    products  : productSlice,
    cartProducts : cartSlice
})

export default rootReducers