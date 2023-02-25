import React from "react"
import Image from "next/image"
import logo from "../assets/logo.png"
// import { useAccount } from "wagmi";
// import { useRouter } from "next/router"
import Link from "next/link"

function NftCard({ item }) {
  // const { address } = useAccount();
  // const router = useRouter()
  // const handleClick = (e) => {
  //   e.preventDefault();
  //   router.push;
  // };
  return (
    <div>
      <div className="Ncontainer">
        <div className="Ncard">
          <div className="Ncontent">
            <div className="img">
              <Image src={logo} alt="" />
            </div>
            <div className="contentBx">
              <>
                <div
                  className="nameAddress"
                  style={{ fontSize: "15px", textAlign: "center" }}
                >
                  {item.address?.slice(0, 7)}....{item.address?.slice(32, 37)}
                </div>
              </>
              <div
                className="person-detail"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "5px"
                }}
              >
                <span style={{ padding: "0px", margin: "0px" }}>
                  {item.email}
                </span>
                <Link href="/transferOwner" className="btn mintBtn">
                  View NFT
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NftCard
