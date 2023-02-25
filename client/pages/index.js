// import Head from "next/head";
// import Image from "next/image";
// import { Inter } from "@next/font/google";
// import styles from "@/styles/Home.module.css";
import Layout from "../components/Layout";
// import Support from "@/components/Support"
// import Desc from "@/components/Desc"
import { useState } from "react";
import Scan from "@/components/Scan";
import { useRouter } from "next/router";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const [productId, setProductId] = useState("");

  const handleChange = (e) => {
    setProductId(e.target.value);
  };

  const handleClick = () => {
    router.push(`/product/${productId}`);
  };

  return (
    <Layout>
      <div className="container">
        <div className="card">
          <div className="content">
            <h4>QR</h4>
            <h3>SCAN</h3>
            <Scan />
            <p>
              Scan a Qr to check the validation of the product and previous
              vendors
            </p>
          </div>
        </div>

        <div className="home-textBox">
          <input
            className="home-ProductID"
            type="text"
            name="productID"
            placeholder="Enter Product ID .."
            onChange={(e) => handleChange(e)}
          />
          <button
            className="btn home-Show-Btn"
            type="submit"
            onClick={handleClick}
          >
            SHOW
          </button>
        </div>
      </div>
    </Layout>
  );
}
