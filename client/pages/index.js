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

  return <Layout></Layout>;
}
