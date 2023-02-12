import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const mintQR = createAsyncThunk("", async (data, thunkAPI) => {
  try {
    const walletAddress = thunkAPI.getState().header.walletAddress;

    if(window.localStorage.getItem("token")){
      const response = await axios.post(
        `http:/localhost:3000/${walletAddress}/mintQR`,
        data
      );
      console.log(response);
      return response.data;

    }
    else{
      return "NOT Autherized";
    }

  } catch (error) {}
});

export const nftQrSlice = createSlice({
  name: "nftQr",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    function onPending(state, action) {
      state.loading = true;
      state.error = null;
    }
    function onRejection(state, action) {
      state.loading = false;
      state.error = action.payload;
    }
    builder.addCase(mintQR.fulfilled, (state, action) => {
      state.mynfts = action.payload;
      state.loading = false;
    });
    builder.addCase(mintQR.pending, onPending);
    builder.addCase(mintQR.rejected, onRejection);
  },
});

export default nftQrSlice.reducer;
