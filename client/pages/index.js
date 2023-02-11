// import Head from "next/head";
// import Image from "next/image";
// import { Inter } from "@next/font/google";
// import styles from "@/styles/Home.module.css";
import Layout from "../components/Layout";
import Support from "@/components/Support";
import Desc from "@/components/Desc";
import { useState } from "react";
import Scan from "@/components/Scan";

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
      <div class="container">
        <div class="card">
          <div class="content">
            <h2>01</h2>
            <h3> SCAN QR</h3>
            <Scan />
            <p>Scan a Qr to check the validation of the product and previous vendors</p>
          </div>
        </div>

        <div className="home-textBox">
          <input className="home-ProductID" type="text" name="productID" placeholder="Enter Product ID .." />
        </div>
      </div>
    </Layout>
  );
}
