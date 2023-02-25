import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ImCross } from "react-icons/im"
import { clearError } from "../redux/slices/error"

const Error = () => {
  // const [showError, setIsShowError] = useState(true)
  const { message } = useSelector((state) => state.error)
  const dispatch = useDispatch()
  useEffect(() => {
    if (message) {
      setTimeout(() => {
        // setIsShowError(false)
        dispatch(clearError())
      }, 10000)
    }
  }, [message, dispatch])

  if (message === null) {
    return null
  }
  return (
    <>
      {message ? (
        <div className="errorBox">
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <h3>Error</h3>
            <ImCross
              onClick={() => dispatch(clearError())}
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

export default Error
