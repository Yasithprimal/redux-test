import { configureStore } from "@reduxjs/toolkit";
// import accountReducer from "./features/accounts/accountsSlice";
// import customerReducer from "./features/customers/customerSlice";
import accountsSlice from "./features/accounts/accountsSlice";
import customerSlice from "./features/customers/customerSlice";

const store = configureStore({
  reducer: {
    account: accountsSlice,
    customer: customerSlice,
  },
});
export default store;
