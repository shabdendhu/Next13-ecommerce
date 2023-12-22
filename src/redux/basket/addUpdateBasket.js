import { createSlice } from "@reduxjs/toolkit";

export const basketSlice = createSlice({
  name: "basket",
  initialState: {
    items: [],
  },
  reducers: {
    loadUsersBasket: (state, action) => {
      const { items } = action.payload;
      state.items = items;
      console.log({ basketRes: items });
    },
    addToBasket: (state, action) => {
      const newItem = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.product._id === newItem.product._id
      );

      if (existingItemIndex !== -1) {
        // If item already exists, update quantity
        state.items[existingItemIndex].quantity += newItem.quantity;
      } else {
        // If item doesn't exist, add it to the basket
        state.items.push(newItem);
      }
    },
    removeFromBasket: (state, action) => {
      const itemIdToRemove = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.product._id === itemIdToRemove
      );

      if (existingItemIndex !== -1) {
        // If item exists, decrease the quantity
        if (state.items[existingItemIndex].quantity > 1) {
          state.items[existingItemIndex].quantity -= 1;
        } else {
          // If quantity is 1, remove the item from the basket
          state.items.splice(existingItemIndex, 1);
        }
      }
    },
    deleteItemFromBasket: (state, action) => {
      const itemIdToRemove = action.payload;
      console.log(
        itemIdToRemove,
        state.items.filter((item) => item.product._id !== itemIdToRemove)
      );
      state.items = state.items.filter(
        (item) => item.product._id !== itemIdToRemove
      );
    },
    clearBasket: (state) => {
      state.items = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addToBasket,
  removeFromBasket,
  clearBasket,
  loadUsersBasket,
  deleteItemFromBasket,
} = basketSlice.actions;

export default basketSlice.reducer;
