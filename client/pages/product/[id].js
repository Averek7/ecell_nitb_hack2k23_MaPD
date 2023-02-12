import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Id = () => {
  const [productData, setProductData] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const { instances } = useSelector((state) => state.header);

  useEffect(() => {
    const getLink = async (id) => {
      const link = axios.get(`/product/fetchIpfs?uuid=${id}`);
      //   let link = await instances.getProductDetails(tmpid)
      return link.ipfs;
    };

    if (id) {
      setProductData(getLink(id));
    }
    const ipfsLink = getLink(id);

    const getIpfsData = async (datalink) => {
      const response = await axios.get(`${datalink}`);
      return response.data;
    };
    const data = getIpfsData(ipfsLink);
  }, [id]);

  console.log(productData);
  return <p>{id}</p>;
};

export default Id;
