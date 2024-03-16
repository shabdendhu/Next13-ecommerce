"use client";
import { apiGet } from "@/helpers/api";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import styles from "./MyWishList.module.scss";

const MyWishList = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { openSnackbar } = useSnackbar();
  const [wishList, setWishList] = useState([]);
  const getWishLists = async () => {
    const wishListRes = await apiGet(
      "/api/wishlist?user=" + session?.user?.id,
      {},
      openSnackbar
    );
    setWishList(wishListRes?.data?.products || []);
  };
  useEffect(() => {
    if (session) getWishLists();
  }, [session]);
  if (wishList.length === 0)
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
          src="https://cdn-icons-png.flaticon.com/512/825/825586.png"
          alt="Empty Wishlist"
          style={{ maxWidth: "200px", margin: "20px auto" }}
        />
        <Typography variant="h5" gutterBottom textAlign="center">
          Your wishlist is empty. Why not add something?
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

  return (
    <Grid container gap={3} padding={3}>
      {wishList.map((e) => (
        <Grid item key={e._id}>
          <ProductCard
            className={styles.product}
            data={e.product}
            key={e.product._id}
            wishlist={true}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default MyWishList;
