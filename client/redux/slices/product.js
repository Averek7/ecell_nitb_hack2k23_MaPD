import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setError } from "./error";

import axios from "axios";

export const updateProduct = createAsyncThunk(
  "auth/updateProduct",
  async (data, thunkAPI) => {
    try {
      //   if (
      //     data.name.length === 0 ||
      //     data.email.length === 0 ||
      //     data.password.length === 0
      //   ) {
      //     thunkAPI.dispatch(setError("All feilds are required."))
      //     return
      //   }
      //   if (data.password != data.confirmPassword) {
      //     thunkAPI.dispatch(
      //       setError("Password and Confirm Password do not match.")
      //     )
      //     return
      //   }

      const response = await axios.post(
        `${process.env.BACKEND_ENDPOINT}/product/updateipfs`,
        data
      );

      console.log("Final Data link added on backend", response);

      return response.data;
    } catch (err) {
      thunkAPI.dispatch(setError(err.response?.data?.message));
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    productLink: null,
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
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.productLink = action.payload;
      state.loading = false;
    });
    builder.addCase(updateProduct.pending, onPending);
    builder.addCase(updateProduct.rejected, onRejection);
  },
});

// export const { setError, clearError } = errorSlice.actions;
export default productSlice.reducer;
