import { createSlice } from "@reduxjs/toolkit";

export const successSlice = createSlice({
  name: "success",
  initialState: {
    message: null,
  },
  reducers: {
    setSuccess: (state, action) => {
      state.message = action.payload;
    },
    clearSuccess: (state) => {
      state.message = null;
    },
  },
});

export const { setSuccess, clearSuccess } = successSlice.actions;
export default successSlice.reducer;
