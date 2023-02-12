import React from "react";
import Layout from "@/components/Layout";
import NftCard from "@/components/NftCard";

function index() {
  return (
    <Layout>
      <div className="collection-container">
        <NftCard />
      </div>
    </Layout>
  );
}

export default index;
