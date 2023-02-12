import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setError } from "./error";
import axios from "axios";

export const getMyNfts = createAsyncThunk(
  "collection/getTransactDetails",
  async (acc) => {
    try {
      const response = await axios.get(`/${acc}/getTransact`);
      return response.data;
    } catch (error) {}
  }
);
