import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"

const Id = () => {
  const [productData, setProductData] = useState(null)
  const router = useRouter()
  const { id } = router.query
  const { instances } = useSelector((state) => state.header)

  useEffect(() => {
    const getLink = async (id) => {
      const link = axios.get(`/getProductLink?uuid=${id}`)
      //   let link = await instances.getProductDetails(tmpid)
      return link
    }

    if (id) {
      setProductData(getLink(id))
    }
  }, [id])
  console.log(productData)
  return <p>{id}</p>
}

export default Id