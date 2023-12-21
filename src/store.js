import { configureStore } from "@reduxjs/toolkit";
import addUpdateBasket from "@/redux/basket/addUpdateBasket";
export default configureStore({
  reducer: {
    basket: addUpdateBasket,
  },
});
