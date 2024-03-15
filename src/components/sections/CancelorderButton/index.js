"use client";
import React from "react";
import Button from "@mui/material/Button";
import { apiPut } from "@/helpers/api";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { openOtpModal } from "@/redux/auth/auth";

const CancelOrderButton = ({ orderId }) => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const handleClickCancelOrder = async () => {
    if (!session) return dispatch(openOtpModal());
    const res = await apiPut(`/api/order/${orderId}`);
    console.log(res);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "10px",
        width: "100%",
      }}
    >
      <Button
        onClick={handleClickCancelOrder}
        variant="contained"
        style={{ backgroundColor: "blue", color: "white" }}
      >
        {!session ? "Login" : "Cancle Order"}
      </Button>
    </div>
  );
};

export default CancelOrderButton;
