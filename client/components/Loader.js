import React from "react"
import { Puff } from "react-loader-spinner"

const Loader = ({ height, width }) => {
  return (
    <div className="loaderContainer">
    <Puff
      height={height ? height : "80"}
      width={width ? width : "80"}
      radisu={1}
      color="#9925ad"
      ariaLabel="puff-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
    </div>
  )
}

export default Loader
