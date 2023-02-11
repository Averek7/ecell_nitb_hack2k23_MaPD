import React, { useState, useEffect } from "react";
import Image from "next/image";
import logo from "../assets/logo.png";
import { useIsMounted } from "@/pages/hooks/useIsMounted";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useSigner } from "wagmi";
// import { useRouter } from "next/router";
import { ethers } from "ethers";
import { useDispatch } from "react-redux";
import { addContractAddresses, saveAddressAndSigner } from "@/redux/header";
import abi from "../assets/contract_data/Products.json";
import nftAbi from "../assets/contract_data/nft.json";
import DL_contract_address from "../assets/contract_data/ProductsAddress.json";
import nft_contract_address from "../assets/contract_data/nftAddress.json";

import { FaHome } from "react-icons/fa";
import { BsChat, BsFillPersonFill } from "react-icons/bs";
import { IoIosAddCircleOutline, IoMdSettings } from "react-icons/io";
import a from "next/link";

const tabs = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "About",
    link: "/about",
  },
  {
    title: "Login",
    link: "/auth",
  },
  {
    title: "Transfer",
    link: "/transferOwner",
  },
];

function Header() {
  const mounted = useIsMounted();
  const dispatch = useDispatch();
  const { address } = useAccount();
  const { data: signer } = useSigner();
  const [addressfinal, setAddressfinal] = useState(null);

  const instances = new ethers.Contract(
    DL_contract_address.address,
    abi.abi,
    signer
  );

  const nftInstances = new ethers.Contract(
    nft_contract_address.address,
    nftAbi.abi,
    signer
  );

  useEffect(() => {
    dispatch(
      addContractAddresses({
        DL_contract_address: DL_contract_address.address,
        nft_contract_address: nft_contract_address.address,
      })
    );
    address && signer
      ? dispatch(
          saveAddressAndSigner({ address, signer, instances, nftInstances })
        )
      : null;
  }, [signer]);

  return (
    <div className="header-container">
      <div className="logo-container">
        <Image src={logo} width={80} height={80} />
      </div>
      <div className="Header">
        <ul className="navbar">
          <li className="navItems">
            <a href="/">
              <FaHome />
            </a>
          </li>
          <li className="navItems">
            <a href="#">
              <BsFillPersonFill />
            </a>
          </li>
          <li className="navItems active">
            <a href="/mint">
              <IoIosAddCircleOutline />
            </a>
          </li>
          <li className="navItems">
            <a href="#">
              <BsChat />
            </a>
          </li>
          <li className="navItems">
            <a href="#">
              <IoMdSettings />
            </a>
          </li>
          <div id="marker"></div>
        </ul>
      </div>
      <div className="button-container">
        <ConnectButton />
      </div>
    </div>
  );
}

export default Header;
