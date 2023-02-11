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
        // console.log(res);
        const config = {
            headers: {
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsInJvbGUiOjEsImlhdCI6MTY3NjA1Njc1NSwiZXhwIjoxNjc4NjQ4NzU1fQ.VjXSFUAnpFg6oIf4XAx-r3IEc7bOyHoh4w-_CY-R3ZA"
            }
        }
        const r = await axios.get('http://localhost:5000/product/searchProcduct?query=mn', config);
        console.log(r.data?.respose);
        setRes(r.data?.respose);
    }

    return (
        <div>
            <input type="text" name="qry" onChange={(e) => handleChange(e)} />
            <div className="searchRes">
                {res.map((r, i) => {
                    return <div key={i}>{r.productId}</div>
                })}
            </div>
        </div>
    )
}

export default SearchProduct;