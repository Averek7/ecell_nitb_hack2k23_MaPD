import React from "react";
import LottieCard from "./LottieCard";

function Desc() {
  return (
    <div className="desc-container">
      <div className="desc-content">
        <div className="left">
          <div className="desc-lottie">
            <LottieCard
              src="https://assets9.lottiefiles.com/packages/lf20_mf5j5kua.json"
              width="400px"
              
            />
          </div>
          <div className="desc-text">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque sunt
            doloremque nostrum, amet, impedit expedita placeat natus vitae
            corporis molestias soluta. Omnis officiis error alias minima quia
            pariatur optio dignissimos nihil culpa quod. Repudiandae.
          </div>
        </div>
        <div className="right">
          <div className="desc-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde fugiat
            delectus eaque nobis rem fugit molestias perspiciatis eius eos iste
            cupiditate consequatur possimus ullam repellat, ipsum facere.
            Excepturi fugiat quos pariatur, deleniti eaque dolorem tempore illum
            quas odit. Dicta labore harum voluptates aspernatur eveniet dolor.
          </div>
          <div className="desc-lottie">
            <LottieCard
              src="https://assets9.lottiefiles.com/packages/lf20_9C2hfh.json"
              width="400px"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Desc;
