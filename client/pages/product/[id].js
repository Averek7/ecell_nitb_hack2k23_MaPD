import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import Image from "next/image"
import Layout from "@/components/Layout"
import TransactionCard from "@/components/TransactionCard"
import { saveId } from "../../redux/header"
// import { useIsMounted } from "../hooks/useIsMounted"

const Id = () => {
  const [productData, setProductData] = useState(null)
  const router = useRouter()
  const dispatch = useDispatch()
  const { id } = router.query
  const { instances, walletAddress } = useSelector((state) => state.header)
  // const token = useIsMounted()

  const handleClick = () => {
    dispatch(saveId(id))

    router.push("/transferOwner")
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    const getLink = async (id) => {
      const res = await axios.get(
        `${process.env.BACKEND_ENDPOINT}/product/fetchIpfs?uuid=${id}`
      )
      //   let link = await instances.getProductDetails(tmpid)
      console.log(res.data.response.ipfs)
      const resa = res ? await axios.get(res.data.response.ipfs) : null
      setProductData(resa.data)
    }

    if (id) {
      getLink(id)
    }
  }, [id])
  console.log("in state", productData)
  return (
    <Layout>
      <div className="prodContainer">
        <div className="prodLeft">
          <div className="authcenter internalLeft">
            <Image
              src={productData?.image}
              width={150}
              height={150}
              alt="image"
              style={{ borderRadius: "12px", margin: "20px 0px", padding: "0" }}
            />
            {/* <div className="contentBx"> */}
            <>
              <div className="nameAddress" style={{ fontSize: "15px" }}>
                <strong>{productData?.title}</strong>
              </div>
            </>
            <div
              className="person-detail"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <a
                href={productData?.nftLink}
                style={{ textDecoration: "none" }}
                target="_blank"
              >
                <button className="btn" style={{ marginTop: "30px" }}>
                  View
                </button>
              </a>
            </div>
            {/* </div> */}
          </div>
        </div>
        <div className="prodRight">
          <div className="authcenter internalRight">
            <div className="prodHead">
              <h2>Details </h2>
              <button
                className="prodStatus"
                style={
                  productData?.status === "Not Dispatched"
                    ? { backgroundColor: "red" }
                    : { backgroundColor: "green" }
                }
              >
                {productData?.status}
              </button>
            </div>
            <div className="prodinDiv">
              <div className="txt prodtxtBox">
                <h4>Title:</h4>
                <p>{productData?.title}</p>
              </div>
              <div className="txt prodtxtBox">
                <h4>Description:</h4>
                <p>{productData?.description}</p>
              </div>
              <div className="txt prodtxtBox">
                <h4>Token ID:</h4>
                <p>{productData?.tokenId}</p>
              </div>
            </div>
            <div className="prodinDiv">
              <div className="txt prodtxtBox">
                <h4>QR Data:</h4>
                <a href={productData?.qrIpfs} style={{ textDecoration: "none" }} target="_blank"><button className="btn">View</button></a>
              </div>
              <div className="txt prodtxtBox">
                <h4>Current Owner Address:</h4>
                <p>{productData?.owner}</p>
              </div>
            </div>
            <div style={{ width: "100%", float: "right", marginTop: "auto" }}>
              {productData?.owner === walletAddress ? (
                <button className="btn" onClick={handleClick}>
                  Transfer Nft
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </Layout>
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
