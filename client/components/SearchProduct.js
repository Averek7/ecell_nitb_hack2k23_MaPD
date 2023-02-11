import axios from "axios";
import React, { useState, useEffect } from "react";

function SearchProduct() {
    const [qry, setQry] = useState("");
    const [res, setRes] = useState([]);
    const handleChange = (e) => {
        // console.log(qry);
        setQry(e.target.value);
        callSearch();
    }

    const callSearch = async () => {
        console.log(res);
        const r = await axios.get('http://localhost:5000/product/searchProduct?query=' + qry);
        setRes(r);
    }

    return (
        <div>
        <input type="text" name="qry" value={qry} onChange={(e) => handleChange(e)} />
        </div>
    )
}

export default SearchProduct;