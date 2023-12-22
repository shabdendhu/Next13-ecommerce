"use client";
import React, { useState, useEffect } from "react";
import { Button, TextField, Modal, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeOtpModal, openOtpModal } from "@/redux/auth/auth";
import { signIn } from "next-auth/react";

const OtpLoginModal = () => {
  const [open, setOpen] = useState(true);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(0);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const handleClose = () => {
    dispatch(closeOtpModal());
  };

  const handlePhoneSubmit = () => {
    // Call your backend API to request OTP with the provided phone number
    // For simplicity, we'll assume the API call is successful
    setTimer(60); // Set the timer to 60 seconds
  };

  const handleOtpSubmit = () => {
    // Call your backend API to verify the OTP
    // For simplicity, we'll assume the OTP verification is successful
    console.log("User data:", { phone }); // Log user data on successful verification
    handleClose();
  };
  const handleClickGoogleLogin = (e) => {
    e.preventDefault();
    signIn("google", { callbackUrl: "/" });
  };
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <Modal open={auth.isOtpModalOpen} onClose={handleClose}>
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "5px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          maxWidth: "400px",
          margin: "0 auto",
          marginTop: "100px",
        }}
      >
        <h2 className="text-center text-2xl  mb-4">LOGIN / SIGNUP</h2>

        {timer > 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "200px",
              gap: "10px", // Add a gap between the OTP input and the button
            }}
          >
            <Typography variant="h6">Enter OTP sent to {phone}</Typography>
            <TextField
              label="OTP"
              variant="outlined"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <Button
              style={{
                backgroundColor: "blue",
              }}
              variant="contained"
              color="primary"
              onClick={handleOtpSubmit}
            >
              Verify OTP
            </Button>
            <Typography variant="body2">
              Time remaining: {timer} seconds
            </Typography>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "200px",
              gap: "10px", // Add a gap between the OTP input and the button
            }}
          >
            <Typography variant="h6">Enter your phone number</Typography>
            <TextField
              label="Phone Number"
              variant="outlined"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Button
              style={{
                backgroundColor: "blue",
              }}
              variant="contained"
              color="primary"
              onClick={handlePhoneSubmit}
            >
              Send OTP
            </Button>
          </div>
        )}
        <h1
          style={{
            textAlign: "center",
            padding: 20,
          }}
        >
          OR
        </h1>
        <button
          style={{
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "10px 20px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
            marginTop: "20px",
            marginBottom: "20px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            margin: "0 auto",
            marginLeft: "auto",
            marginRight: "auto",
            width: "100%",
            textAlign: "center",
            outline: "none",
            maxHeight: "80px",
            maxWidth: "80px",
          }}
          onClick={handleClickGoogleLogin}
        >
          <img src="https://static.vecteezy.com/system/resources/thumbnails/011/598/471/small/google-logo-icon-illustration-free-vector.jpg" />
        </button>
      </div>
    </Modal>
  );
};

export default OtpLoginModal;