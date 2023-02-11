import React, { useState, useEffect } from "react";
import Image from "next/image";
import logo from "../assets/logo.png";
import { FaUser } from "react-icons/fa";
import { useIsMounted } from "@/pages/hooks/useIsMounted";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useSigner } from "wagmi";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import { useDispatch } from "react-redux";
import { addContractAddresses, saveAddressAndSigner } from "@/redux/header";
import abi from "../assets/contract_data/Products.json";
import nftAbi from "../assets/contract_data/nft.json";
import DL_contract_address from "../assets/contract_data/ProductsAddress.json";
import nft_contract_address from "../assets/contract_data/nftAddress.json";

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
      ? dispatch(saveAddressAndSigner({ address, signer, instances, nftInstances }))
      : null;
  }, [signer]);

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
