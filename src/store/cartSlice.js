import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import config from "../config/config";

const initialState = {
    cartProducts: [],
    isLoading : false,
    isError : false
}

export const fetchCartProducts = createAsyncThunk("fetchCartProducts", async (userId) => {
    const response = await fetch(`${config.backendEndPoint}/cart/cart-items/${userId}`);
    const {data} = await response.json();
    return data;
})

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    extraReducers : (builder) => {
        builder.addCase(fetchCartProducts.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchCartProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartProducts = action.payload
        })
        builder.addCase(fetchCartProducts.rejected, (state) => {
            state.isError = true;
        })
    },
    reducers: {

    }
})

// export const {} = cartSlice.actions;
export default cartSlice.reducer