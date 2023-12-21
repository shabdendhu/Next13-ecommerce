import { createSlice } from "@reduxjs/toolkit";

export const addUpdateBasket = createSlice({
  name: "basket",
  initialState: {
    items: [],
    // total: 0,
  },
  reducers: {
    loadUsersBasket: (state, action) => {
      const usersBasket = action.payload;
      state.items = usersBasket.items;
    },
    addToBasket: (state, action) => {
      const newItem = action.payload;
      state.items.push(newItem);
      // state.total += newItem.price;
    },
    removeFromBasket: (state, action) => {
      const itemToRemove = action.payload;
      const index = state.items.findIndex(
        (item) => item.id === itemToRemove.id
      );
      if (index !== -1) {
        // state.total -= state.items[index].price;
        state.items.splice(index, 1);
      }
    },
    clearBasket: (state) => {
      state.items = [];
      // state.total = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket, clearBasket, loadUsersBasket } =
  addUpdateBasket.actions;

export default addUpdateBasket.reducer;
