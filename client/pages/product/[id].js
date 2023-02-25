import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Image from "next/image";
import Layout from "@/components/Layout";
// import TransactionCard from "@/components/TransactionCard"
import { saveId } from "../../redux/header";
// import { useIsMounted } from "../hooks/useIsMounted"
// import { Player } from "@livepeer/react";

const Id = () => {
  const [productData, setProductData] = useState(null);
  const [qrImg, setQrImg] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  const { walletAddress } = useSelector((state) => state.header);
  // const token = useIsMounted()

  const handleClick = () => {
    dispatch(saveId(id));

    router.push("/transferOwner");
  };

  useEffect(() => {
    // const token = localStorage.getItem("token")
    const getLink = async (id) => {
      const res = await axios.get(
        `${process.env.BACKEND_ENDPOINT}/product/fetchIpfs?uuid=${id}`
      );
      //   let link = await instances.getProductDetails(tmpid)
      console.log(res?.data?.response[0].ipfs);
      const resa = await axios.get(res?.data?.response[0].ipfs);
      setProductData(resa.data);
    };

    if (id) {
      getLink(id);
    }
  }, [id]);
  console.log("in state", productData);

  const handleViewClick = async () => {
    const data = await fetch(productData?.qrIpfs);
    const json = await data.json();
    setQrImg(json.code);
  };

  if (productData && !qrImg) {
    handleViewClick();
  }

  const txnHandleClick = async () => {
    // const data = await axios.get(productData?.nftTransaction);
    // console.log(data);
  };
  return (
    <Layout>
      <div className="prodContainer">
        <div className="prodLeft">
          <div className="authcenter internalLeft">
            <Image
              src={productData?.image}
              width={150}
              height={150}
              alt="image"
              style={{ borderRadius: "12px", margin: "20px 0px", padding: "0" }}
            />
            {/* <div className="contentBx"> */}
            <>
              <div className="nameAddress" style={{ fontSize: "15px" }}>
                <strong>{productData?.title}</strong>
              </div>
            </>
            <div
              className="person-detail"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <a
                href={productData?.nftLink}
                style={{ textDecoration: "none" }}
                // target="_blank"
              >
                <button className="btn" style={{ marginTop: "30px" }}>
                  View
                </button>
              </a>
            </div>
            {/* </div> */}
          </div>
        </div>
        <div className="prodRight">
          <div className="authcenter internalRight">
            <div className="prodHead">
              <h2>Details </h2>
              <button
                className="prodStatus"
                style={
                  productData?.status === "Not Dispatched"
                    ? { backgroundColor: "red" }
                    : { backgroundColor: "green" }
                }
              >
                {productData?.status}
              </button>
            </div>
            <div className="prodinDiv">
              <div className="txt prodtxtBox">
                <h4>Title:</h4>
                <p>{productData?.title}</p>
              </div>
              <div className="txt prodtxtBox">
                <h4>Description:</h4>
                <p>{productData?.description}</p>
              </div>
              <div className="txt prodtxtBox">
                <h4>Token ID:</h4>
                <p>{productData?.tokenId}</p>
              </div>
            </div>
            <div className="prodinDiv">
              <div className="txt prodtxtBox">
                <h4>Current Owner Address:</h4>
                <p>
                  {productData?.owner.slice(0, 7)}....
                  {productData?.owner.slice(37, 42)}
                </p>
              </div>
              <div className="txt prodtxtBox">
                <h4>Txn :</h4>
                <p onClick={txnHandleClick}>
                  {productData?.nftTransaction.substring(34).slice(0, 7)}....
                  {productData?.nftTransaction.substring(34).slice(27, 32)}
                </p>
              </div>
              <div className="txt prodtxtBox">
                {/* <h4>QR Data:</h4> */}
                {/* <a
                  href={productData?.qrIpfs}
                  style={{ textDecoration: "none" }}
                  // target="_blank"
                > */}
                <Image src={qrImg} width="80" height="80" alt="qr" />
                {/* <button className="btn" onClick={toggleShow}>
                  View
                </button> */}
                {/* </a> */}
              </div>
            </div>
            {/* <div className="prodinDiv">
              <Player
                title={productData?.video?.name}
                playbackId={productData?.video?.playbackId}
              />
            </div> */}
            <div style={{ width: "100%", float: "right", marginTop: "auto" }}>
              {productData?.owner === walletAddress ? (
                <button className="btn" onClick={handleClick}>
                  Transfer Nft
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Id;
