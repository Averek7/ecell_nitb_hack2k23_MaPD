import React, { useEffect } from "react";
import Layout from "@/components/Layout";
// import NftCard from "@/components/NftCard";
import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
import { getMyNfts } from "@/redux/slices/collection";
import { useAccount } from "wagmi";
import Loader from "@/components/Loader";

function Index() {
  const dispatch = useDispatch();
  // const [localLoading, setLocalLoading] = useState(false);
  const { address } = useAccount();
  const mynfts = useSelector((state) => state.collection);

  useEffect(() => {
    dispatch(getMyNfts(address));
  }, [address, dispatch]);

  return (
    <Layout>
      <div className="collection-container">
        <div className="card-container">
          <>
            {mynfts ? (
              mynfts.map(() => <></>)
            ) : (
              <div>
                <Loader />
              </div>
            )}
          </>
        </div>
      </div>
    </Layout>
  );
}

export default Index;
