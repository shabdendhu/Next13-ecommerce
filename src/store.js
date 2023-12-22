import { configureStore } from "@reduxjs/toolkit";
import addUpdateBasket from "@/redux/basket/addUpdateBasket";
import auth from "@/redux/auth/auth";
export default configureStore({
  reducer: {
    basket: addUpdateBasket,
    auth: auth,
  },
});
