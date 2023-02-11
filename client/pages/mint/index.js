import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Web3Storage } from "web3.storage";
import { create } from "ipfs-http-client";
import { useDispatch, useSelector } from "react-redux";
import { mintQR } from "@/redux/nftQr";
import { setSuccess } from "@/redux/slices/success";
import { setError } from "@/redux/slices/error";
import InputBox from "@/components/InputBox";

const projectId = "2LaElUcAr2SYK3KuPpor7Xlc5hB";
const projectSecret = "0947f1f7854b4631c685a30c20e51d4d";

function index() {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    title: "",
    description: "",
    image: "",
  });
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDhhQTQzM0RkY2M4QzM5YWJFQzdmNzZDM2REQjlFOTBhMWY3RTk2RjMiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjkxMjcxMDk3NjMsIm5hbWUiOiJsZW5kTmZ0In0.7Zu-wSF34-7GlU5rVIXAvrIczw6MQYT4yV7vOVU9pis`;
  const storage = new Web3Storage({ token: token });
  const { walletAddress, signer, nftInstances } = useSelector(
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
      .then(async (res) => {
        console.log("result", `https://ipfs.io/ipfs/${res.path}`);
        const dataIpfs = `https://ipfs.io/ipfs/${res.path}`;
        console.log("address", walletAddress);
        console.log("dataIPFS", dataIpfs);

        let qrNftTx = await nftInstances.safeMint(walletAddress, dataIpfs);
        console.log("Mining...", qrNftTx.hash);
        // Status
        let tx = await qrNftTx.wait();
        // Loader
        console.log("Mined !", tx);

        // let event = tx.event[0];
        // let value = event.args[2];
        // let tokenId = value.toNumber();

        console.log(
          `Mined, see transaction: https://mumbai.polygonscan.com/tx/${qrNftTx.hash}`
        );
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
