import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { setError } from "./error"

import axios from "axios"

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data, thunkAPI) => {
    try {
      console.log("register working", data)
      if (
        data.firstname.length === 0 ||
        data.lastname.length === 0 ||
        data.email.length === 0 ||
        data.password.length === 0
      ) {
        thunkAPI.dispatch(setError("All feilds are required."))
        return
      }
      if (data.password != data.confirmPassword) {
        thunkAPI.dispatch(
          setError("Password and Confirm Password do not match.")
        )
        return
      }
      const response = await axios.post(
        `${process.env.BACKEND_ENDPOINT}/auth/register`,
        { ...data }
      )
      if (response) thunkAPI.dispatch(loginUser(data))
      console.log(response)
      return response.data
    } catch (err) {
      thunkAPI.dispatch(setError(err.response?.data?.message))
      return thunkAPI.rejectWithValue(err.response?.data?.message)
    }
  }
)

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, thunkAPI) => {
    try {
      console.log("login working", data)
      if (data.email.length === 0 || data.password.length === 0) {
        thunkAPI.dispatch(setError("All feilds are required."))
        return
      }
      const response = await axios.post("/login")
      console.log(response)
      return response.data
    } catch (err) {
      thunkAPI.dispatch(setError(err.response?.data?.message))
      return thunkAPI.rejectWithValue(err.response?.data?.message)
    }
  }
)

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    function onPending(state, action) {
      state.loading = true
      state.error = null
    }
    function onRejection(state, action) {
      state.loading = false
      state.error = action.payload
    }
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload
      state.loading = false
    })
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload
      state.loading = false
    })

    builder.addCase(registerUser.pending, onPending)
    builder.addCase(registerUser.rejected, onRejection)
  }
})

// export const { setError, clearError } = errorSlice.actions;
export default authSlice.reducer