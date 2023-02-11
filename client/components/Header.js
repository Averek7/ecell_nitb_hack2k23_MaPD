import React from "react";
import Image from "next/image";
import logo from "../assets/logo.png";
import { FaHome } from "react-icons/fa";
import { BsChat, BsFillPersonFill } from "react-icons/bs";
import { IoIosAddCircleOutline, IoMdSettings } from "react-icons/io"
import { useIsMounted } from "@/pages/hooks/useIsMounted";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useSigner } from "wagmi";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import { useDispatch } from "react-redux";
import { addContractAddresses, saveAddressAndSigner } from "@/redux/header";

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

// function Header() {
//   const mounted = useIsMounted();
//   const { address } = useAccount();
//   const { data: signer } = useSigner();

//   // const instances = new ethers.Contract(address, abi, signer);

//   // useEffect(() => {
//   //   useDispatch(
//   //     addContractAddresses({
//   //       DL_contract_address: "DL_contract_address.address",
//   //       nft_contract_address: "nft_contrat_address.address",
//   //     })
//   //   );
//   //   address && signer
//   //     ? dispatchEvent(saveAddressAndSigner({ address, signer, instances }))
//   //     : null;
//   // }, [signer]);

//   return (
//     <div className="header-container">
//       <div className="logo-container">
//         <Image src={logo} width={80} />
//       </div>
//       <div className="header-list-content">
//         <div className="header-content">
//           {tabs.map((tab) => (
//             <a href={tab.link}>
//               <li>{tab.title}</li>
//             </a>
//           ))}
//         </div>
//       </div>
//       <div className="prof-btn-container">
//         <div className="prof">
//           <div>{mounted ? <FaUser size={18} /> : null}</div>
//         </div>
//         <ConnectButton />
//       </div>
//     </div>
//   );
// }

const Header = () => {
  return (
    <div className="Header">
      <ul className="navbar">
        <li className="navItems"><a href="#"><FaHome /></a></li>
        <li className="navItems"><a href="#"><BsFillPersonFill /></a></li>
        <li className="navItems active"><a href="#"><IoIosAddCircleOutline /></a></li>
        <li className="navItems"><a href="#"><IoMdSettings /></a></li>
        <li className="navItems"><a href="#"><BsChat /></a></li>
        <div id="marker"></div>
      </ul>
    </div>
  )
}

export default Header;