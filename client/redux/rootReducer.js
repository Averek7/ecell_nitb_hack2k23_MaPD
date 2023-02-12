import error from "./slices/error";
import success from "./slices/success";
import auth from "./slices/auth";
import header from "./header";
import nftQr from "./nftQr";
import product from "./slices/product";

const rootReducer = {
  error,
  success,
  auth,
  header,
  nftQr,
  product
};

export default rootReducer;
