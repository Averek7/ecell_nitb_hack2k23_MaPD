import React, { useState } from "react";
import { ethers } from "ethers";
import { useSelector } from "react-redux";
import nft_contract_address from "../../assets/contract_data/nftAddress.json";
import nftABI from "../../assets/contract_data/nft.json";
import Layout from "@/components/Layout";
import InputBox from "@/components/InputBox";
import Success from "@/components/Success";
import Error from "@/components/Error";
import axios from "axios";
import { useProvider } from "wagmi";

function index() {
  const { signer } = useSelector((state) => state.header);
  const [localLoading, setLocalLoading] = useState(false);

  // let toAddress = "0xab7dc3e852B8AE47B149036e398aC9D46e61409f";
  // let toAddress = "0x7eff959E7D7fB6b9F3cDA78599966870929A7628";
  // let tokenId = "0";

  const [data, setData] = useState({
    toAddress: "",
    tokenId: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    console.log(data);
  };

  const handleClick = async () => {
    console.log(nft_contract_address, nftABI, signer);
    setLocalLoading(false);

    const contract = new ethers.Contract(
      nft_contract_address.address,
      nftABI.abi,
      signer
    );
    setLocalLoading(true);
    console.log(contract);

    const currentOwner = await contract.ownerOf(tokenId);
    setLocalLoading(true);
    console.log(currentOwner);

    let qrNftTransfer = await contract.transferFrom(
      currentOwner,
      toAddress,
      tokenId
    );
    setLocalLoading(true);
    console.log(qrNftTransfer);

    await qrNftTransfer.wait();
    setLocalLoading(false);
    console.log(
      `NFT${tokenId} Transfered from ${currentOwner} to ${toAddress}`,
      qrNftTransfer
    );
  };

  return (
    <div>
      <Layout>
        <div className="authContainer">
          <div className="authcenter">
            <div className="txt">
              <h1 style={{ margin: "10px 0px" }}>Transfer Details</h1>
            </div>
            <Error />
            <InputBox
              name="toAddress"
              title="Transfer to Address"
              value={data.toAddress}
              handleChange={handleChange}
              placeholder="Enter Transfer Address"
              disabled={localLoading}
            />
            <InputBox
              name="tokenId"
              title="NFT Token ID"
              value={data.tokenId}
              handleChange={handleChange}
              placeholder="Enter NFT Token ID"
              disabled={localLoading}
            />

            <div className="widthDiv">
              <button className="btn mintBtn" onClick={handleClick}>
                {localLoading ? <Loader height="25" width="25" /> : "Transfer"}
              </button>
            </div>
          </div>
        </div>
        <Success />
      </Layout>
    </div>
  );
}

export default index;
