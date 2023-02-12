import React from "react";
import Layout from "@/components/Layout";
import NftCard from "@/components/NftCard";
import { useDispatch } from "react-redux";
import axios from "axios";

function index() {
  const dispatch = useDispatch();
  const [localLoading, setLocalLoading] = useState(false);

  return (
    <Layout>
      <div className="collection-container">
        <div className="card-container">
          <NftCard />
        </div>
      </div>
    </Layout>
  );
}

export default index;
