// EmptyBasket.js

import React from "react";
import { Button, Typography, Container } from "@mui/material";
import { useRouter } from "next/navigation";

const EmptyBasket = () => {
  const router = useRouter();
  return (
    <Container
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/622/622043.png"
        alt="Empty Basket"
        style={{ maxWidth: "200px", margin: "20px auto" }}
      />
      <Typography variant="h5" gutterBottom textAlign={"center"}>
        Your basket is empty. Why not add something?
      </Typography>
      <Button
        onClick={() => router.push("/")}
        to="/home" // Replace with the actual path to your home screen
        variant="contained"
        color="primary"
      >
        Go to Home
      </Button>
    </Container>
  );
};

export default EmptyBasket;
