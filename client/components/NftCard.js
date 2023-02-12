import React from "react";
import Image from "next/image";
import logo from "../assets/logo.png";
import { useAccount } from "wagmi";

function NftCard() {
  const { address } = useAccount();
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
                  {address?.slice(0, 7)}....{address?.slice(32, 37)}
                </div>
              </>
              <div
                className="person-detail"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "5px",
                }}
              >
                <span style={{ padding: "0px", margin: "0px" }}>Email</span>
                <button className="btn mintBtn">Request</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NftCard;
