import Layout from "@/components/Layout"
import Image from "next/image"
import React from "react"
import { useAccount } from "wagmi"
import logo from "@/assets/logo.png"
import TransactionCard from "@/components/TransactionCard"

function Dashboard() {
  const { address } = useAccount()
  // const [tab, setTab] = useState("Listed");
  return (
    <Layout>
      <div className="detailContainer">
        <div className="Dcontainer">
          <div className="cards">
            <div className="contents">
              <div className="img">
                <Image src={logo} alt="" />
              </div>
              <div className="contentBx">
                <>
                  <div className="nameAddress" style={{ fontSize: "15px" }}>
                    {address?.slice(0, 7)}....{address?.slice(32, 37)}
                  </div>
                </>
                <div
                  className="person-detail"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <span style={{ padding: "2px" }}>Email</span>
                  <span style={{ padding: "2px" }}>Name</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="transaction-container">
          <div className="list-card">
            <div className="loanDetailContainer">
              <div className="nftComponent" key="">
                <TransactionCard active={false} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard
