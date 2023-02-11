import error from "./slices/error";
import success from "./slices/success";
import auth from "./slices/auth";
import header from "./header";
import nftQr from "./nftQr";

const rootReducer = {
  error,
  success,
  auth,
  header,
  nftQr
};

export default rootReducer;
