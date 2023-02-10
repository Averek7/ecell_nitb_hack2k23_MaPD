import React, { useEffect, useRef } from "react";
function LottieCard({ src, width }) {
  const ref = useRef(null);
  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });
  return (
    <div style={{ width: `${width}` }}>
      <lottie-player
        id="firstLottie"
        ref={ref}
        autoplay
        loop
        mode="normal"
        src={src}
      />
    </div>
  );
}

export default LottieCard;
