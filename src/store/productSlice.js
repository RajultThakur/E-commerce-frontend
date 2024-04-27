import { createReducer, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import config from '../config/config'

const initialState = {
    products: null,
    isLoading: false,
    isError: false
}

export const fetchProducts = createAsyncThunk("fetchProducts", async (price="") => {
    console.log(price)
    let url = `${config.backendEndPoint}/product/products`
    const response = await fetch(url)
    const data = await response.json();
    // console.log(data)
    return data.data;
})

const productSlice = createSlice({
    name: 'products',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.isLoading = true
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.products = action.payload;
            state.isLoading = false;
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.isError = true
        })
    },
    reducers : {

    }
})

// export const {} = productSlice.actions 

export default productSlice.reducer