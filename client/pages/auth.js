import React, { useState, useEffect } from "react"
import InputBox from "@/components/InputBox"
import { registerUser, loginUser } from "@/redux/slices/auth"
import { setError } from "../redux/slices/error"
import { setSuccess } from "../redux/slices/success"
import { useDispatch, useSelector } from "react-redux"
import Error from "../components/Error"
import Success from "../components/Success"
import Layout from "../components/Layout"

const auth = () => {
  const [authLogin, setAuthLogin] = useState(true)
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
    console.log(data)
  }

  const handleLogin = () => {
    dispatch(loginUser(data))
  }

  const handleRegister = () => {
    dispatch(registerUser(data))
  }

  return (
    <Layout>
      <div className="authContainer">
        {authLogin ? (
          <div className="authcenter">
            <InputBox
              name="email"
              title="Email"
              type="email"
              handleChange={handleChange}
              placeholder="Email"
            />
            <InputBox
              name="password"
              title="Password"
              type="password"
              handleChange={handleChange}
              placeholder="j39#hnk2"
            />
            <div>
              <button className="btn" onClick={handleLogin}>
                Login
              </button>
            </div>
            <p className="smClickText" onClick={() => setAuthLogin(!authLogin)}>
              {authLogin
                ? "New User? Register Here"
                : "Already a User? Login Here"}
            </p>
          </div>
        ) : (
          <div className="authcenter">
            <InputBox
              name="firstname"
              title="First Name"
              type="text"
              handleChange={handleChange}
              placeholder="Prasang"
            />
            <InputBox
              name="email"
              title="Email"
              type="email"
              handleChange={handleChange}
              placeholder="Email"
            />
            <InputBox
              name="password"
              title="Password"
              type="password"
              handleChange={handleChange}
              placeholder="j39#hnk2"
            />
            <InputBox
              name="confirmPassword"
              title="Confirm Password"
              type="password"
              handleChange={handleChange}
              placeholder="j39#hnk2"
            />
            <div>
              <button className="btn" onClick={handleRegister}>
                Register
              </button>
            </div>
            <p className="smClickText" onClick={() => setAuthLogin(!authLogin)}>
              {authLogin ? "New User?" : "Already a User?"}
            </p>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default auth
