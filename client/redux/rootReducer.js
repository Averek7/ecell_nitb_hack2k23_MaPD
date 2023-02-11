import error from "./slices/error";
import success from "./slices/success";
import auth from "./slices/auth";

const rootReducer = {
  error,
  success,
  auth
};

export default rootReducer;
