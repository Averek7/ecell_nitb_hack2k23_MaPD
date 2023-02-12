import React, { useEffect } from "react";
import Link from "next/link";
import { ethers } from "ethers";
import { useSelector } from "react-redux";
import { useAccount } from "wagmi";
import axios from "axios";
import { useIsMounted } from "@/pages/hooks/useIsMounted";

const TransactionCard = ({ item, active }) => {
  // const mounted = useIsMounted()

  const API_KEY = "MIAEXYAS736K5A1FCH2HIU5X8KVVI4IW2A";
  const getTransact = async () => {
    const txHash =
      "0xe53753cfde58d6cb63bacdf6cc822ed7704fba0b4118b1504507b1a9b87f401b";
    const response = await axios.get(
      `https://api.polygonscan.com/api?module=transaction&action=gettxreceiptstatus&txhash=${txHash}&apikey=${API_KEY}`
    );
    console.log(response.data);
  };
  //   getTransact();

  const getNft = async () => {
    const response = await axios.get(
      `https://testnets.opensea.io/assets/mumbai/0xf3E09b01F9678A1562b184Bb4512E163A387B4Cd/3`
    );
    console.log(response.data);
  };
  //   getNft();
  const { address } = useAccount();
  return (
    <div className="nftcard" style={{ margin: "5px" }}>
      <div className="nftcardHead">
        <div style={{ padding: "2px" }}>
          <h3>TransactID #</h3>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span>From: {address}</span>
            <span>To: toAddress</span>
          </div>
        </div>
      </div>

      <div className="nftpricesRow">
        <div className="nftpricesele">{txHash}</div>
      </div>

      <div className="nftpricesRow">
        <Link
          href="https://testnets.opensea.io/assets/mumbai/0xf3E09b01F9678A1562b184Bb4512E163A387B4Cd/3"
          target="_blank"
        >
          <button className="btn btnSqr nftpricesele">View NFT</button>
        </Link>
      </div>
    </div>
  );
};

export default TransactionCard;
