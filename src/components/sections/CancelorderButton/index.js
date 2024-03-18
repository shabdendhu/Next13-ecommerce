"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { apiPut } from "@/helpers/api";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { openOtpModal } from "@/redux/auth/auth";
import { useSnackbar } from "@/hooks/useSnakBar";

const CancelOrderButton = ({ orderId, status }) => {
  const dispatch = useDispatch();
  const [orderStatus, setOrderStatus] = useState(status);
  const { openSnackbar } = useSnackbar();
  const { data: session } = useSession();
  const handleClickCancelOrder = async () => {
    if (!session) return dispatch(openOtpModal());
    const res = await apiPut(`/api/order/${orderId}`, {}, openSnackbar);
    // console.log(res.data.status, res);
    if (res.success && res.data.status === "canceled") {
      openSnackbar("success", "Order cancelled successfully");
      setOrderStatus("canceled");
    }
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
        disabled={orderStatus == "canceled"}
        onClick={handleClickCancelOrder}
        variant="contained"
        style={{
          backgroundColor: orderStatus == "canceled" ? "gray" : "blue",
          color: "white",
        }}
      >
        {!session
          ? "Login"
          : orderStatus == "canceled"
          ? "Cancelled"
          : "Cancle Order"}
      </Button>
    </div>
  );
};

export default CancelOrderButton;
