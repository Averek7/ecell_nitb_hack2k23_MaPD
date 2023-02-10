//scan.js

import React, { useState, useRef, useEffect } from "react";
import { QrReader } from "react-qr-reader";
import styles from "../styles/Home.module.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function Scan() {
    const [data, setData] = useState("No result");


    

    return (

        <>
            {/* <Header /> */}

            <div className="QrMain">

                <div className="QrScannerContainer">

                    <div className="QrScanner">

                        <QrReader
                            onResult={(result, error) => {
                                if (!!result) {
                                    setData(result?.text);
                                }
                                if (!!error) {
                                    console.info(error);
                                }

                            }
                            }
                            constraints={{ facingMode: "environment" }}
                            style={{ width: "40%", height: "40%" }}
                        />


                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default Scan;
