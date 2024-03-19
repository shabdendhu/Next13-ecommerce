import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
      <Image height={200} width={200} src={"/emptybasket.png"} />
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
