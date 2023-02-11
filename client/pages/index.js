// import Head from "next/head";
// import Image from "next/image";
// import { Inter } from "@next/font/google";
// import styles from "@/styles/Home.module.css";
import Layout from "../components/Layout";
import Support from "@/components/Support";
import Desc from "@/components/Desc";
import { useState } from "react";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [productId, setProductId] = useState("");

  const handleChange = (e) => {
    setProductId({
      // ...productId,
      [e.target.name]: e.target.value,
    });
    //    console.log(data)
  };

  return (
    <Layout>
      <div className="home-container">
        <div className="home-card1">
          <div className="home-lottie-card"></div>
          <div className="home-input-id">
            <h2 className="home-h2">
              Enter the product id to search for originality of a product and
              see the supply chain!
            </h2>
            <div className="home-textbox">
              <input
                type="text"
                name="productId"
                id=""
                onChange={(e) => handleChange(e)}
              />
            </div>
            <button className="home-input-button" type="submit">
              Enter
            </button>
          </div>
        </div>

        <div className="home-or">
          -------------------- OR --------------------
        </div>

        <div className="home-card2">
          <div className="home-lottie-card"></div>

          <div className="home-scan-box">
            You can also Scan QR code to get the desired details
          </div>

          <button className="home-scan-button" type="submit">
            SCAN QR
          </button>
        </div>
      </div>
    </Layout>
  );
}
