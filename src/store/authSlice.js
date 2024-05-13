import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from "../config/config";
import { GET_METHOD } from "../constants/constants";

const reqParams = GET_METHOD();
export const fetchLoggedInUser = createAsyncThunk("fetchLoggedInUser", async () => {
  const url = `${config.backendEndPoint}/user`
  const response = await fetch(url, reqParams);
  const data = await response.json();
  return data.data;
})

const initialState = {
  user: null,
  isAuthenticated: false
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers : (builder) => {
    builder.addCase(fetchLoggedInUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(fetchLoggedInUser.rejected, (state, action) => {
      state.isAuthenticated = false;
    })
  },
  reducers: {
    logout (state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  }
})

export const { logout } = authSlice.actions;
export default authSlice.reducer;