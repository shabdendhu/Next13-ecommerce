"use client";
import { closeOtpModal } from "@/redux/auth/auth";
import Dialog from "@mui/material/Dialog";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const LoginContent = ({ dispatch }) => {
  const [open, setOpen] = useState(true);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(0);
  const handlePhoneSubmit = () => {
    // Call your backend API to request OTP with the provided phone number
    // For simplicity, we'll assume the API call is successful
    setTimer(60); // Set the timer to 60 seconds
  };

  const handleOtpSubmit = () => {
    // Call your backend API to verify the OTP
    // For simplicity, we'll assume the OTP verification is successful
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
    <div
      style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "5px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        maxWidth: "400px",
        margin: "0 auto",
        // marginTop: "100px",
      }}
    >
      <h2 className="text-center text-2xl  mb-4">LOGIN / SIGNUP</h2>

      {/* {timer > 0 ? (
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
      </h1> */}
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
  );
};

const OtpLoginModal = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const handleClose = () => {
    dispatch(closeOtpModal());
  };

  return (
    <Dialog open={auth.isOtpModalOpen} onClose={handleClose}>
      <LoginContent dispatch={dispatch} />
    </Dialog>
  );
};

export default OtpLoginModal;
