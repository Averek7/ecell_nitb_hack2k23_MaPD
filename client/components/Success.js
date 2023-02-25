import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ImCross } from "react-icons/im"
import { clearSuccess } from "../redux/slices/success"

const Success = () => {
  // const [showError, setIsShowError] = useState(true)
  const { message } = useSelector((state) => state.success)
  console.log("in success comp", message)
  const dispatch = useDispatch()
  useEffect(() => {
    if (message) {
      setTimeout(() => {
        // setIsShowError(false)
        dispatch(clearSuccess())
      }, 10000)
    }
  }, [message, dispatch])

  //   console.log("in error comp", message)
  if (message === null) {
    return null
  }
  return (
    <>
      {message ? (
        <div className="successBox">
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <h3>Success</h3>
            <ImCross
              onClick={() => dispatch(clearSuccess())}
              style={{ cursor: "pointer" }}
            />
          </div>
          <p>{message}</p>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export default Success
