// import Head from "next/head";
// import Image from "next/image";
// import { Inter } from "@next/font/google";
// import styles from "@/styles/Home.module.css";
import Layout from "../components/Layout"
import Support from "@/components/Support"
import Desc from "@/components/Desc"
import { useSelector } from "react-redux"

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { instances } = useSelector((state) => state.header)

  const handleClick = async () => {
    let ipfsLink = await instances.getProductDetails(0)
    console.log(ipfsLink)
    let res = await axios.get(ipfsLink)
    console.log(res)
  }

  return (
    <Layout>
      <input />
      <button className="btn" onClick={handleClick}>
        click
      </button>
    </Layout>
  )
}
