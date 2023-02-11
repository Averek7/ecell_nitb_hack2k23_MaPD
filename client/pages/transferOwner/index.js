import React from "react";
import { ethers } from "ethers";
import { useSelector } from "react-redux";
import nft_contract_address from "../../assets/contract_data/nftAddress.json";
import nftABI from "../../assets/contract_data/nft.json";
import Layout from "@/components/Layout";

function index() {
  const { signer } = useSelector((state) => state.header);
  let toAddress = "0xab7dc3e852B8AE47B149036e398aC9D46e61409f";
  let tokenId = "1";
  const handleClick = async () => {
    console.log(nft_contract_address, nftABI, signer);

    const contract = new ethers.Contract(
      nft_contract_address.address,
      nftABI.abi,
      signer
    );
    console.log(contract);

    const currentOwner = await contract.ownerOf(tokenId);
    console.log(currentOwner);

    let qrNftTransfer = await contract.transferFrom(
      currentOwner,
      toAddress,
      tokenId
    );
    console.log(qrNftTransfer);

    await qrNftTransfer.wait();
    console.log(
      `NFT${tokenId} Transfered from ${currentOwner} to ${toAddress}`,
      qrNftTransfer
    );
  };

  return (
    <div>
      <Layout>
        <button type="submit" onClick={handleClick}>
          Transfer
        </button>
      </Layout>
    </div>
  );
}

export default index;
