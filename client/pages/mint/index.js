import React from "react";
import Layout from "@/components/Layout";
import { Web3Storage } from "web3.storage";
import { create } from "ipfs-http-client";
import { useDispatch } from "react-redux";

function index() {
  //   const dispatch = useDispatch();
  //   const [data, setData] = useState({
  //     // Data...
  //   });
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDhhQTQzM0RkY2M4QzM5YWJFQzdmNzZDM2REQjlFOTBhMWY3RTk2RjMiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjkxMjcxMDk3NjMsIm5hbWUiOiJsZW5kTmZ0In0.7Zu-wSF34-7GlU5rVIXAvrIczw6MQYT4yV7vOVU9pis`;
  const storage = new Web3Storage({ token: token });
  //   const { walletAddress, nft_contract_address } = useSelector(
  //     (state) => state.navbar
  //   );
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
    client.add(JSON.stringify(data)).then((res) => {
      console.log("result", `https://ipfs.io/ipfs/${res.path}`);
      const dataIpfs = `https://ipfs.io/ipfs/${res.path}`;
    });
  };
  const nftUpload = (e) => {
    const nFile = e.target.files;
    storage.put(nFile).then((res) => {
      console.log(res);
      console.log(`https://ipfs.io/ipfs/${res}/${nFile[0].name}`);
    });
  };
  return (
    <div>
      <Layout>
        <input type="file" name="" id="" onChange={nftUpload} />
      </Layout>
    </div>
  );
}

export default index;
