import React, { useState, useEffect } from "react";

function AddProductForm() {
    const [data, setData] = useState({
        productName: '',
        brand: '',
        measure: '',
        quantity: 0,
        code: ''
    })
    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
        //    console.log(data)
    }


    return (
        <div className="add-product-container">
            <div className="form-container">
                <div className="form-input">
                    <div className="inputBox">
                        <input type="text" name="productName" id="" onChange={(e) => handleChange(e)} value={data.productName} />
                        <span>Product Name</span>
                    </div>
                    <div className="inputBox">
                        <input type="text" name="brand" id="" onChange={(e) => handleChange(e)} />
                        <span>Brand</span>
                    </div>
                    <div className="inputBox">
                        <input type="text" name="measure" id="" onChange={(e) => handleChange(e)} />
                        <span>Measure</span>
                    </div>
                    <div className="inputBox">
                        <input type="text" name="quantity" id="" onChange={(e) => handleChange(e)} />
                        <span>Quantity</span>
                    </div>
                    <div className="inputBox">
                        <input type="text" name="code" id="" onChange={(e) => handleChange(e)} />
                        <span>Code</span>
                    </div>
                </div>
                <div className="form_btn">
                <button type="submit"> Generate QR</button>
                </div>
            </div>
        </div>
    );
}


export default AddProductForm; 