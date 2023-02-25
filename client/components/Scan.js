//scan.js
import dynamic from "next/dynamic";
import React, { useState, useRef } from "react";
import { useRouter } from "next/router";

const QrReader = dynamic(() => import(`react-weblineindia-qrcode-scanner`), {
  ssr: false,
});

function Scan() {
  const videoRef = useRef(null);
  const [scannedData, setScannedData] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();

  function handleLoad() {
    setIsReady(true);
  }

  const handleDetected = (data) => {
    setScannedData(data);
    console.log(`Scanned Data: ${data}`);
    if (videoRef.current && isReady) {
      videoRef.current.play().catch((error) => {
        console.error("Error starting scanner:", error);
      });
    }
  };

  const previewStyle = {
    height: 250,
    width: 300,
  };

  const redirect = (data) => {
    router.push(!data ? "/" : data.substring(52, data.length - 1));
  };

  return (
    <>
      <div className="QrMain">
        <div className="QrScannerContainer">
          <div className="QrScanner">
            <div>
              {!scannedData ? (
                <QrReader
                  style={previewStyle}
                  onScan={handleDetected}
                  onLoad={handleLoad}
                  onError={(e) => {
                    console.error(e.message);
                  }}
                />
              ) : (
                <>{redirect(scannedData)}</>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Scan;
