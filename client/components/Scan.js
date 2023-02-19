//scan.js
import React, { useState, useRef, useEffect } from "react";
// import { QrReader } from "react-qr-reader"
import { useRouter } from "next/router";
// import styles from "../styles/Home.module.css";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";

function Scan() {
  const [data, setData] = useState("");
  const router = useRouter();

  // useEffect(() => {
  //   const redirectLink = document.createElement("a")
  //   redirectLink.href = data
  //   redirectLink.click()
  // }, [data])

  const redirectTo = (link) => {
    // console.log(link)
    router.push(link.substring(23, link.length - 1));
    // const redirectLink = document.createElement("a")
    // redirectLink.href = link
    // redirectLink.click()
  };

  return (
    <>
      <div className="QrMain">
        <div className="QrScannerContainer">
          <div className="QrScanner">
            {/* <QrReader
              onResult={(result, error) => {
                // console.log(result);
                if (!!result) {
                  redirectTo(result?.text)
                }
                if (!!error) {
                  console.info(error)
                }
              }}
              constraints={{ facingMode: "environment" }}
              style={{ width: "40%", height: "40%" }}
            />
            <p>
              {data}
            </p> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Scan;
