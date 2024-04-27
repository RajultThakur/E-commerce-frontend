import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import productSlice from "./productSlice"

const rootReducers = combineReducers({
    auth : authSlice,
    products  : productSlice
})

export default rootReducers