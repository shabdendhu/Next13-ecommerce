"use client";
import { Grid } from "@mui/material";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import { apiGet } from "@/helpers/api";
import styles from "./MyWishList.module.scss";

const MyWishList = () => {
  const { data: session } = useSession();
  const [wishList, setWishList] = useState([]);
  const getWishLists = async () => {
    const wishListRes = await apiGet("/api/wishlist?user=" + session?.user?.id);
    console.log({ wishListRes });
    setWishList(wishListRes?.data?.products || []);
  };
  useEffect(() => {
    if (session) getWishLists();
  }, [session]);
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
