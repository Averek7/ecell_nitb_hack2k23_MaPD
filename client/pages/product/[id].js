import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import Image from "next/image"
// import { useIsMounted } from "../hooks/useIsMounted"

const Id = () => {
  const [productData, setProductData] = useState(null)
  const router = useRouter()
  const { id } = router.query
  const { instances } = useSelector((state) => state.header)
  // const token = useIsMounted()

  useEffect(() => {
    const token = localStorage.getItem("token")
    const getLink = async (id) => {
      const res = await axios.get(
        `${process.env.BACKEND_ENDPOINT}/product/fetchIpfs?uuid=${id}`
      )
      //   let link = await instances.getProductDetails(tmpid)
      console.log(res.data.response.ipfs)
      const resa = res ? await axios.get(res.data.response.ipfs) : null;
      setProductData(resa.data)
    }

    if (id) {
      getLink(id)
    }
  }, [id])
  console.log("in state", productData)
  return (
    <div>
      <div className="authcenter txt">
        <h3>Title: </h3>
        <p>{productData?.title}</p>
        <h3>Description: </h3>
        <p>{productData?.description}</p>
        <Image src={productData?.image} width={200} height={200} priority />
      </div>
    </div>
  )
}

export default Id

// description
// : 
// "rfef"
// id
// : 
// 1
// image
// : 
// "https://ipfs.io/ipfs/bafybeihxwad7kyias2ewcafokzvn3brrgq3rrtwyiky6bag6o443w2acem/Screenshot_20221108_091303.png"
// nftLink
// : 
// "https://testnets.opensea.io/assets/mumbai/0xf3E09b01F9678A1562b184Bb4512E163A387B4Cd/1"
// owner
// : 
// "0xab7dc3e852B8AE47B149036e398aC9D46e61409f"
// qrIpfs
// : 
// "https://ipfs.io/ipfs/QmbqUskgHQa4kxaqfXbYr2LZGy1vDmfAyPrrctc8Gt142A"
// status
// : 
// "Not Dispatched"
// title
// : 
// "fvdf"
// tokenId
// : 
// 1