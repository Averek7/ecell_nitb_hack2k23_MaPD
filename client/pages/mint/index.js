import React, { useState, useRef } from "react";
import Layout from "@/components/Layout";
import { Web3Storage } from "web3.storage";
import { create } from "ipfs-http-client";
import { useDispatch, useSelector } from "react-redux";
import Success from "@/components/Success";
import Error from "@/components/Error";
import { setSuccess } from "@/redux/slices/success";
import { setError } from "@/redux/slices/error";
import InputBox from "@/components/InputBox";
import { QRCodeCanvas } from "qrcode.react";
import axios from "axios";
import { updateProduct } from "@/redux/slices/product";
import { mintNft } from "../../redux/slices/collection";
import Loader from "@/components/Loader";
import Image from "next/image";
import nft_contract_address from "../../assets/contract_data/nftAddress.json";

const projectId = "2LaElUcAr2SYK3KuPpor7Xlc5hB";
const projectSecret = "0947f1f7854b4631c685a30c20e51d4d";

function index() {
  const dispatch = useDispatch();
  const [qrImg, setQrImg] = useState(null);
  const [localLoading, setLocalLoading] = useState(false);
  const qrRef = useRef();
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
  const { instances } = useSelector((state) => state.header);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    console.log(data);
  };

  function downloadPNG(filename) {
    console.log("downloadPNG called");
    const linkSource = qrImg;
    const downloadLink = document.createElement("a");
    const fileName = filename + ".png";
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    console.log("PNG link: ", downloadLink);
    downloadLink.click();
  }

  const addData = async () => {
    let id = await instances.getProductId();
    // console.log(Number(tokenId.toString()))
    let editedData = {
      ...data,
      id: Number(id.toString()) + 9,
    };
    id = Number(id.toString()) + 9;
    
    console.log("ID added", id);
    let qr = null;
    qr = await axios.get(
      `${process.env.BACKEND_ENDPOINT}/product/generateQR?uuid=${id}`
    );
    console.log("qr: qr obtained", qr);
    if (qr) {
      // const pageImage = new Image()
      // pageImage.src = qr?.data?.code
      // pageImage.onload = function () {
      //   const canvas = document.createElement("canvas")
      //   canvas.width = pageImage.naturalWidth
      //   canvas.height = pageImage.naturalHeight

      //   const ctx = canvas.getContext("2d")
      //   ctx.imageSmoothingEnabled = false
      //   ctx.drawImage(pageImage, 0, 0)
      //   console.log(canvas, pageImage)
      //   saveScreenshot(canvas)
      // }
      // setQrImg(qr?.data?.code)

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
        .add(JSON.stringify(qr?.data))
        .then(async (res) => {
          console.log("result", `https://ipfs.io/ipfs/${res.path}`);
          const dataIpfs = `https://ipfs.io/ipfs/${res.path}`;
          console.log("address", walletAddress);
          console.log("dataIPFS of uploaded QR:", dataIpfs);
          setLocalLoading(true);

          let qrNftTx = await nftInstances.safeMint(walletAddress, dataIpfs);
          console.log("Mining...", qrNftTx);
          // Status
          let tx = await qrNftTx.wait();
          console.log("Mined QR Transaction !", tx);
          setLocalLoading(false);
          console.log(
            `Mined, see transaction: https://mumbai.polygonscan.com/tx/${qrNftTx.hash}`
          );

          editedData = {
            ...editedData,
            qrIpfs: dataIpfs,
            tokenId: id,
            owner: walletAddress,
            status: "Not Dispatched",
            nftLink: `https://testnets.opensea.io/assets/mumbai/${nft_contract_address.address}/${id}`,
            nftTransaction: `https://mumbai.polygonscan.com/tx/${qrNftTx.hash}`,
          };
          console.log("final data check krlo: ", editedData);

          getFinalLink(editedData);
          setQrImg(qr?.data?.code);
        })
        .catch((err) => {
          console.log("Error: ", err);
          dispatch(
            setError("Failed to generate IPFS link for Qr code, Please retry")
          );
        });
    }
  };
  console.log("This is QR usestate", qrImg);

  const getFinalLink = (finalData) => {
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
      .add(JSON.stringify(finalData))
      .then(async (res) => {
        console.log("result", `https://ipfs.io/ipfs/${res.path}`);
        const dataIpfs = `https://ipfs.io/ipfs/${res.path}`;
        console.log("address", walletAddress);
        console.log("dataIPFS for Final data: ", dataIpfs);
        dispatch(updateProduct({ uuid: finalData.id, ipfs: dataIpfs }));
        instances
          .addProduct(finalData.id, dataIpfs)
          .then((res) => {
            console.log("final data link pushed on contract: ", res);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log("Error: ", err);
        dispatch(
          setError("Failed to generate IPFS link for Final DAta, Please retry")
        );
      });
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
    setLocalLoading(false);
    client
      .add(JSON.stringify(data))
      .then(async (res) => {
        console.log("result", `https://ipfs.io/ipfs/${res.path}`);
        const dataIpfs = `https://ipfs.io/ipfs/${res.path}`;
        console.log("address", walletAddress);
        console.log("dataIPFS", dataIpfs);
        setLocalLoading(true);

        let qrNftTx = await nftInstances.safeMint(walletAddress, dataIpfs);
        console.log("Mining...", qrNftTx.hash);
        // Status
        let tx = await qrNftTx.wait();
        setLocalLoading(false);

        console.log("Mined !", tx);
        console.log(
          `Mined, see transaction: https://mumbai.polygonscan.com/tx/${qrNftTx.hash}`
        );
        dispatch(setSuccess(`Minted Successfully with ${qrNftTx.hash}`));
      })
      .catch((err) => {
        console.log("Error: ", err);
        setLocalLoading(false);
        dispatch(setError("Failed to generate IPFS link, Please retry"));
      });
  };

  const nftUpload = (e) => {
    e.preventDefault();
    setLocalLoading(true);

    const nFile = e.target.files;
    console.log(nFile);
    storage
      .put(nFile)
      .then((res) => {
        console.log(res);
        setLocalLoading(false);
        setData({
          ...data,
          image: `https://ipfs.io/ipfs/${res}/${nFile[0].name}`,
        });
        dispatch(setSuccess("Uploaded"));
      })
      .catch((err) => {
        setLocalLoading(false);
        dispatch(setError(err.message));
      });
    console.log(data.image);
  };

  const uploadqr = () => {
    let canvas = qrRef.current.querySelector("canvas");
    let image = canvas.toDataURL("image/png");

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
      .add(JSON.stringify(image))
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

        console.log(
          `Mined, see transaction: https://mumbai.polygonscan.com/tx/${qrNftTx.hash}`
        );
      })
      .catch((err) => {
        console.log("Error: ", err);
        dispatch(setError("Failed to generate IPFS link, Please retry"));
      });
  };

  const downloadQRCode = (e) => {
    e.preventDefault();
    let canvas = qrRef.current.querySelector("canvas");
    let image = canvas.toDataURL("image/png");
    let anchor = document.createElement("a");
    anchor.href = image;
    anchor.download = `qr-code.png`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    setUrl("");
  };

  const qrcode = (
    <QRCodeCanvas
      id="qrCode"
      value={`https://voices.uchicago.edu/201702busn3910001/2018/04/23/pitch-blockchain-in-the-supply-chain/`}
      size={300}
      bgColor={"#fff"}
      level={"H"}
    />
  );

  return (
    <div>
      <Layout>
        <div className="authContainer">
          <div className="authcenter">
            {qrImg ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <h2
                  style={{
                    textAlign: "center",
                    color: "white",
                    width: "180px",
                    margin: "8px 0px",
                  }}
                >
                  Minted QR Code for the Product
                </h2>
                <Image
                  src={qrImg}
                  width={150}
                  height={150}
                  alt="QR"
                  style={{
                    margin: "8px 0px",
                  }}
                />
                <button
                  className="btn"
                  onClick={() => downloadPNG("Minted-qr")}
                >
                  Download
                </button>
              </div>
            ) : (
              <>
                <div className="txt">
                  <h1 style={{ margin: "10px 0px" }}>Mint Product Details</h1>
                </div>
                <Error />
                <InputBox
                  name="image"
                  type="file"
                  title="Select Image"
                  value={data.imgInput}
                  handleChange={nftUpload}
                  placeholder="Item Name"
                  disabled={localLoading}
                />

                <InputBox
                  name="title"
                  title="Title"
                  value={data.title}
                  handleChange={handleChange}
                  placeholder="Item Name"
                  disabled={localLoading}
                />

                <label className="inputLabel">
                  Description:
                  <textarea
                    className="inputBox"
                    name="description"
                    value={data.description}
                    onChange={(e) => handleChange(e)}
                    placeholder="Provide detailed description of your item"
                    disabled={localLoading}
                  />
                </label>

                <div className="widthDiv">
                  <button className="btn mintBtn" onClick={addData}>
                    {localLoading ? <Loader height="25" width="25" /> : "Mint"}
                  </button>
                </div>
              </>
            )}
          </div>
          <div className="qrcode" style={{ display: "none" }}>
            <div ref={qrRef}>{qrcode}</div>
          </div>
        </div>
        <Success />
      </Layout>
    </div>
  );
}

export default index;
