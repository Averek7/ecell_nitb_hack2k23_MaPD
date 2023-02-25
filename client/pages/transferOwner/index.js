import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useSelector, useDispatch } from "react-redux";
import nft_contract_address from "../../assets/contract_data/nftAddress.json";
import nftABI from "../../assets/contract_data/nft.json";
import Layout from "@/components/Layout";
import InputBox from "@/components/InputBox";
import Success from "@/components/Success";
import Error from "@/components/Error";
import axios from "axios";
// import { useProvider } from "wagmi";
import { updateProduct } from "@/redux/slices/product";
import { create } from "ipfs-http-client";
import Loader from "@/components/Loader";

const projectId = "2LaElUcAr2SYK3KuPpor7Xlc5hB";
const projectSecret = "0947f1f7854b4631c685a30c20e51d4d";

function Index() {
  const dispatch = useDispatch();
  const { signer } = useSelector((state) => state.header);
  const [localLoading, setLocalLoading] = useState(false);
  const { walletAddress, savedId, instances } = useSelector(
    (state) => state.header
  );

  // let toAddress = "0xab7dc3e852B8AE47B149036e398aC9D46e61409f";
  // let toAddress = "0x7eff959E7D7fB6b9F3cDA78599966870929A7628";
  // let tokenId = "0";
  const [productData, setProductData] = useState(null)
  const [data, setData] = useState({
    toAddress: "",
    tokenId: savedId ? savedId : null,
    status: "Shipped",
  });

  useEffect(() => {
    // const token = localStorage.getItem("token");
    const getLink = async (id) => {
      const res = await axios.get(
        `${process.env.BACKEND_ENDPOINT}/product/fetchIpfs?uuid=${id}`
      );
      //   let link = await instances.getProductDetails(tmpid)
      console.log(res?.data?.response[0].ipfs);
      const resa = res ? await axios.get(res?.data?.response[0].ipfs) : null;
      setProductData(resa.data);
    };

    if (savedId) {
      getLink(savedId);
    }
  }, [savedId]);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    console.log(data);
  };

  const handleClick = async () => {
    console.log("yes clicked");
    // const res = await axios.get(
    //   `${process.env.BACKEND_ENDPOINT}/product/fetchIpfs?uuid=${data.tokenId}`
    // );
    //   let link = await instances.getProductDetails(tmpid)
  
    // console.log(res?.data?.response?.ipfs);
    // const resa = await axios.get(res?.data?.response?.ipfs);
    let editData = productData;

    editData = {
      ...editData,
      owner: data.toAddress,
      status: data.status,
    };

    const auth =
      "Basic " +
      Buffer.from(projectId + ":" + projectSecret).toString("base64");
    const client = create({
      host: "ipfs.infura.io",
      port: 5001,
      protocol: "https",
      apiPath: "/api/v0",
      headers: {
        authorization: auth,
      },
    });
    setLocalLoading(false);
    client
      .add(JSON.stringify(editData))
      .then(async (res) => {
        console.log("result", `https://ipfs.io/ipfs/${res.path}`);
        const dataIpfs = `https://ipfs.io/ipfs/${res.path}`;
        console.log("address", walletAddress);
        console.log("dataIPFS of editedData:", dataIpfs);
        dispatch(updateProduct({ uuid: Number(data.tokenId), ipfs: dataIpfs }));

        await instances.updateProduct(Number(data.tokenId) - 9, dataIpfs);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(nft_contract_address, nftABI, signer);
    setLocalLoading(false);

    const contract = new ethers.Contract(
      nft_contract_address.address,
      nftABI.abi,
      signer
    );
    setLocalLoading(true);
    console.log(contract);

    const currentOwner = await contract.ownerOf(data.tokenId);
    setLocalLoading(true);
    console.log(currentOwner);

    let qrNftTransfer = await contract.transferFrom(
      currentOwner,
      data.toAddress,
      data.tokenId
    );
    setLocalLoading(true);
    console.log(qrNftTransfer);

    await qrNftTransfer.wait();
    setLocalLoading(false);
    console.log(
      `NFT${data.tokenId} Transfered from ${currentOwner} to ${data.toAddress}`,
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
            <label for="status" className="inputLabel">
              Update Status to:
            </label>
            <select
              id="status"
              name="status"
              className="inputBox"
              onChange={(e) => handleChange(e)}
            >
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>

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

export default Index;
