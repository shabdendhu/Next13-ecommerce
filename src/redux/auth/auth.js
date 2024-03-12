// authenticationSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const auth = createSlice({
  name: "authentication",
  initialState: {
    isOtpModalOpen: false,
  },
  reducers: {
    openOtpModal: (state) => {
      console.log("open otp modal");

      state.isOtpModalOpen = true;
    },
    closeOtpModal: (state) => {
      state.isOtpModalOpen = false;
    },
  },
});

export const { openOtpModal, closeOtpModal } = auth.actions;
export const selectIsOtpModalOpen = (state) =>
  state.authentication.isOtpModalOpen;
export default auth.reducer;
