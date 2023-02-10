import React from "react";
import LottieCard from "./LottieCard";

function Support() {
  return (
    <div className="support-container">
      <div className="main-content">
        <div className="support-list">
          <div className="help">
            <li>Customer Care</li>
            <li>Google it</li>
            <li>Security issue</li>
            <li>About</li>
          </div>
          <div className="support">
            <li>Contact Us</li>
            <li>Settings</li>
            <li>Profile</li>
          </div>
        </div>
        <div className="support-lottie">
          <div style={{ width: "400px" }}>
            <LottieCard src="https://assets2.lottiefiles.com/packages/lf20_agpu4w06.json" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Support;
