import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setError } from "./error";
import axios from "axios";

export const getMyNfts = createAsyncThunk(
  "collection/getMyNfts",
  async (acc) => {
    try {
      const response = await axios.get(
        `${process.env.BACKEND_ENDPOINT}/mint/fetchHistory?address=${acc}`
      );
      return response.data;
    } catch (error) {
      console.log(err);
    }
  }
);

export const mintNft = createAsyncThunk("/mint", async (data, thunkAPI) => {
  try {
    // const walletAddress = thunkAPI.getState().header.walletAddress;
    const response = await axios.post(
      `${process.env.BACKEND_ENDPOINT}/mint/addMintHistory`,
      data
    );
    console.log("response", response);
    return response.data;
  } catch (err) {
    thunkAPI.dispatch(setError(err.response?.data?.message));
    return thunkAPI.rejectWithValue(err.response?.data?.message);
  }
});

export const collectionSlice = createSlice({
  name: "collection",
  initialState: {
    loading: false,
    mynfts: null,
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
    builder.addCase(mintNft.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getMyNfts.fulfilled, (state, action) => {
      state.mynfts = action.payload;
      state.loading = false;
    });

    builder
      .addCase(mintNft.pending, onPending)
      .addCase(getMyNfts.pending, onPending);
    builder
      .addCase(mintNft.rejected, onRejection)
      .addCase(getMyNfts.rejected, onRejection);
  },
});

export default collectionSlice.reducer;
