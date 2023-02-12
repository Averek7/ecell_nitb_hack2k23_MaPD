import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setError } from "./error";
import axios from "axios";

export const getMyNfts = createAsyncThunk(
  "collection/getMyNfts",
  async (acc) => {
    try {
      const walletAddress = thunkAPI.getState().header.walletAddress;
      const response = await axios.get(
        `${process.env.BACKEND_ENDPOINT}/mint/fetchHistory?address=${walletAddress}`
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
      `http://43.204.234.140:5000/mint/addMintHistory`,
      data
    );
    console.log("response", response);
    return response.data;
  } catch (err) {
    thunkAPI.dispatch(setError(err.response?.data?.message));
    return thunkAPI.rejectWithValue(err.response?.data?.message);
  }
});
