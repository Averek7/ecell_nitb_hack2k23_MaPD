import React from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <li>Privacy Policy</li>
        <li>Terms of use</li>
        <li>Settings</li>
      </div>
      <div className="media-container">
        <div className="media">
          <FaInstagram size={25} />
        </div>
        <div className="media">
          <FaLinkedin size={25} />
        </div>
        <div className="media">
          <FaGithub size={25} />
        </div>
      </div>
    </div>
  );
}

export default Footer;
