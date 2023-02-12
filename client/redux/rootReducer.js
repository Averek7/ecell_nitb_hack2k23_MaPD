import error from "./slices/error";
import success from "./slices/success";
import auth from "./slices/auth";
import header from "./header";
import nftQr from "./nftQr";
import product from "./slices/product";
import collection from "./slices/collection";

const rootReducer = {
  error,
  success,
  auth,
  header,
  nftQr,
  product,
  collection,
};

export default rootReducer;
