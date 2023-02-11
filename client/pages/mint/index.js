import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Web3Storage } from "web3.storage";
import { create } from "ipfs-http-client";
import { useDispatch, useSelector } from "react-redux";
import { mintQR } from "@/redux/nftQr";
import { setSuccess } from "@/redux/slices/success";
import { setError } from "@/redux/slices/error";
import InputBox from "@/components/InputBox";
import axios from "axios";

const projectId = "2Hudfo5sCvhNRgff6cSVH6o7OCJ";
const projectSecret = "ebebdc46b40438ee646c43cba5dbca9e";

function index() {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    title: "",
    description: "",
    image: "",
  });
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDhhQTQzM0RkY2M4QzM5YWJFQzdmNzZDM2REQjlFOTBhMWY3RTk2RjMiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjkxMjcxMDk3NjMsIm5hbWUiOiJsZW5kTmZ0In0.7Zu-wSF34-7GlU5rVIXAvrIczw6MQYT4yV7vOVU9pis`;
  const storage = new Web3Storage({ token: token });
  const { walletAddress, nft_contract_address } = useSelector(
    (state) => state.header
  );

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    console.log(data);
  };

  const handleClick = () => {
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
    client
      .add(JSON.stringify(data))
      .then((res) => {
        console.log("result", `https://ipfs.io/ipfs/${res.path}`);
        const dataIpfs = `https://ipfs.io/ipfs/${res.path}`;
        console.log("address", walletAddress);
        console.log("dataIPFS", dataIpfs);
        axios
          .post(
            `https://api.defender.openzeppelin.com/autotasks/56e64845-fc8f-48d6-9913-cb4b8ea69e85/runs/webhook/88095ac7-42ee-4e07-8ee9-624a30016c9e/TxSNrFSbS2LwNitdGh6ja4`,
            { reciever: walletAddress, tokenUri: dataIpfs }
          )
          .then((response) => {
            console.log("minted on Blockchain", response);
            const checks = parseInt(JSON.parse(response?.data?.result).hex, 16);
            console.log(check);

            dispatch(
              mintQR({
                ...data,
                contract_address: nft_contract_address,
                token_id: check - 1,
              })
            )
              .unwrap()
              .then(() => {
                dispatch(setSuccess("NFT minted Successfully !"));
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log("Error: ", err);
        dispatch(setError("Failed to generate IPFS link, Please retry"));
      });
  };

  const nftUpload = (e) => {
    const nFile = e.target.files;
    storage
      .put(nFile)
      .then((res) => {
        console.log(res);
        setData({
          ...data,
          image: `https://ipfs.io/ipfs${res}/${nFile[0].name}`,
        });
      })
      .catch((err) => {
        dispatch(setError(err.message));
      });
    console.log(data.image);
  };
  return (
    <div>
      <Layout>
        <div className="mintContainer">
          <div className="widthDiv">
            <h1>Mint Product Details</h1>
          </div>
          {/* <Error /> */}
          <div>
            <input
              name="image"
              type="file"
              value={data.imgInput}
              onChange={nftUpload}
              className="fileInput"
            />
          </div>
          <div>
            <InputBox
              name="title"
              title="Title"
              value={data.title}
              handleChange={handleChange}
              placeholder="Item Name"
              // disabled={localLoading}
            />
          </div>
          <div>
            <label className="inputLabel">
              Description:
              <textarea
                className="inputBox"
                name="description"
                value={data.description}
                onChange={(e) => handleChange(e)}
                placeholder="Provide detailed description of your item"
                // disabled={localLoading}
              />
            </label>
          </div>
          <div className="widthDiv">
            <button className="btn mintBtn" onClick={handleClick}>
              {/* {loading || localLoading ? (
                <Loader height="25" width="25" />
              ) : (
                "Mint"
              )} */}
              Mint
            </button>
          </div>
        </div>
        {/* <Success /> */}
      </Layout>
    </div>
  );
}

export default index;
