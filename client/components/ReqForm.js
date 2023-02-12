import React from "react";
import InputBox from "./InputBox";
import Layout from "./Layout";

function ReqForm() {
  return (
    <div>
      <Layout>
        <div className="authContainer">
          <div className="authcenter">
            <Error />
            <InputBox
              name="image"
              type="file"
              title="Select Image"
              value={data.imgInput}
              handleChange={nftUpload}
              placeholder="Item Name"
              disabled={localLoading}
            />

            <InputBox
              name="title"
              title="Title"
              value={data.title}
              handleChange={handleChange}
              placeholder="Item Name"
              disabled={localLoading}
            />

            <label className="inputLabel">
              Description:
              <textarea
                className="inputBox"
                name="description"
                value={data.description}
                onChange={(e) => handleChange(e)}
                placeholder="Provide detailed description of your item"
                disabled={localLoading}
              />
            </label>

            <div className="widthDiv">
              <button className="btn mintBtn" onClick={addData}>
                {localLoading ? <Loader height="25" width="25" /> : "Mint"}
              </button>
            </div>
          </div>
        </div>
        <Success />
      </Layout>
    </div>
  );
}

export default ReqForm;
