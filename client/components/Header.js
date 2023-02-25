import React, { useEffect } from "react"
import Image from "next/image"
import logo from "../assets/logo.png"
// import { useIsMounted } from "@/pages/hooks/useIsMounted";
import { YourButton } from "./Header.data"
import { useAccount, useSigner } from "wagmi"
// import { useRouter } from "next/router";
import { ethers } from "ethers"
import { useDispatch } from "react-redux"
import { addContractAddresses, saveAddressAndSigner } from "@/redux/header"
import abi from "../assets/contract_data/Products.json"
import nftAbi from "../assets/contract_data/nft.json"
import DL_contract_address from "../assets/contract_data/ProductsAddress.json"
import nft_contract_address from "../assets/contract_data/nftAddress.json"

import { FaHome } from "react-icons/fa"
import { BsCollectionFill, BsFillPersonFill } from "react-icons/bs"
import { IoIosAddCircleOutline } from "react-icons/io"
import { MdOutlineDashboardCustomize } from "react-icons/md"

import Link from "next/link"
// import { logout } from "../redux/slices/auth";

function Header() {
  // const router = useRouter()
  // const mounted = useIsMounted();
  const dispatch = useDispatch()
  const { address } = useAccount()
  const { data: signer } = useSigner()
  // const [addressfinal, setAddressfinal] = useState(null);
  // const token = mounted ? localStorage.getItem("token") : null;
  // const router = useRouter();

  const instances = new ethers.Contract(
    DL_contract_address.address,
    abi.abi,
    signer
  )

  const nftInstances = new ethers.Contract(
    nft_contract_address.address,
    nftAbi.abi,
    signer
  )

  useEffect(() => {
    dispatch(
      addContractAddresses({
        DL_contract_address: DL_contract_address.address,
        nft_contract_address: nft_contract_address.address
      })
    )
    address && signer
      ? dispatch(
          saveAddressAndSigner({ address, signer, instances, nftInstances })
        )
      : null
  }, [signer, dispatch])

  // const doLogout = () => {
  //   dispatch(logout());
  //   if (!localStorage.getItem("token")) {
  //     router.push("/");
  //   }
  // };

  return (
    <>
      <div className="logo-container">
        <Image alt="image" src={logo} width={60} height={60} />
      </div>
      <div className="Header">
        <ul className="navbar">
          <Link href="/" className="navItems">
            <li className="navItems">
              <span>
                <FaHome />
              </span>
            </li>
          </Link>
          <Link href="/auth" className="navItems">
            <li className="navItems">
              <span>
                <BsFillPersonFill />
              </span>
            </li>
          </Link>
          <Link href="/mint" className="navItems">
            <li className="navItems active">
              <span>
                <IoIosAddCircleOutline />
              </span>
            </li>
          </Link>
          <Link href="/collection" className="navItems">
            <li className="navItems">
              <span>
                <BsCollectionFill />
              </span>
            </li>
          </Link>
          <Link href="/dashboard" className="navItems">
            <li className="navItems">
              <span>
                <MdOutlineDashboardCustomize />
              </span>
            </li>
          </Link>
          <div id="marker"></div>
        </ul>
      </div>
      <div className="bcBtn">
        {/* { ( */}
        <>
          <YourButton />
          {/* <button className="btn btn-sm" onClick={() => doLogout()}>
              Logout
            </button> */}
        </>
        {/* ) : (
          <button className="btn" onClick={() => router.push("/auth")}>
            Login
          </button>
        )} */}
      </div>
    </>
  )
}

export default Header
