import React, { useState } from "react"
import InputBox from "@/components/InputBox"
import { registerUser, loginUser } from "@/redux/slices/auth"
// import { setError } from "../redux/slices/error"
// import { setSuccess } from "../redux/slices/success"
import { useDispatch } from "react-redux"
// import Error from "../components/Error"
// import Success from "../components/Success"
import Layout from "../components/Layout"
import { useRouter } from "next/router"

const Auth = () => {
  const [authLogin, setAuthLogin] = useState(true)
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "0"
  })
  const dispatch = useDispatch()
  const router = useRouter()

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
    console.log(data)
  }

  const handleLogin = () => {
    dispatch(loginUser(data))
      .unwrap()
      .then(() => {
        router.push("/")
      })
  }

  const calldispatch = (latitude, longitude) => {
    dispatch(
      registerUser({
        ...data,
        coordinateX: latitude,
        coordinateY: longitude
      })
    )
      .unwrap()
      .then(() => {
        router.push("/")
      })
  }

  const handleRegister = () => {
    // let coordinateX
    // let coordinateY
    console.log("btn clicked")
    // console.log(
    navigator.geolocation.getCurrentPosition((position) => {
      calldispatch(position.coords.latitude, position.coords.longitude)
    })
    // )
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
              name="name"
              title="Name"
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
            <label for="role" className="inputLabel">
              Choose your role:
            </label>
            <select
              id="role"
              name="Role"
              className="inputBox"
              onChange={(e) => handleChange(e)}
            >
              <option value="0">Vendor</option>
              <option value="1">Manufacturer</option>
            </select>
            <div>
              <button className="btn" onClick={handleRegister}>
                Register
              </button>
            </div>
            <p className="smClickText" onClick={() => setAuthLogin(!authLogin)}>
              {authLogin ? "New User?" : "Already a User? Login Here"}
            </p>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Auth
