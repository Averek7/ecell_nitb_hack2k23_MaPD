import React from "react";
import Image from "next/image";
import logo from "../assets/logo.png";
import { FaUser } from "react-icons/fa";
import { useIsMounted } from "@/pages/hooks/useIsMounted";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const tabs = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "About",
    link: "/",
  },
  {
    title: "Login",
    link: "/auth/login",
  },
];

function Header() {
  const mounted = useIsMounted();
  return (
    <div className="header-container">
      <div className="logo-container">
        <Image src={logo} width={80} />
      </div>
      <div className="header-list-content">
        <div className="header-content">
          {tabs.map((tab) => (
            <a href={tab.link}>
              <li>{tab.title}</li>
            </a>
          ))}
        </div>
      </div>
      <div className="prof-btn-container">
        <div className="prof">
          <div>{mounted ? <FaUser size={18} /> : null}</div>
        </div>
        <ConnectButton />
      </div>
    </div>
  );
}

export default Header;
