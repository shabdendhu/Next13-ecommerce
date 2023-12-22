"use client";
import React, { useEffect, useState } from "react";
import styles from "./Basket.module.scss";
import AddButton from "@/components/base/AddButton";
import ProductCard from "@/components/sections/ProductCard";
import PageWrapper from "../PageWrapper";
import { apiGet } from "@/helpers/api";
import { useSession } from "next-auth/react";
import { Button, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loadUsersBasket } from "@/redux/basket/addUpdateBasket";
import EmptyBasket from "@/components/sections/EmptyBasket";
function calculateTotalPriceAndDiscount(basketData) {
  let totalItemPrice = 0;
  let totalDiscountPrice = 0;
  console.log({ basketData });
  // Loop through each item in the basket
  basketData.items.forEach((item) => {
    // Calculate the total price for one item
    totalItemPrice += item.product.price * item.quantity;

    // Calculate the discounted price for one item
    const discountedPrice =
      item.product.price - (item.product.price * item.product.discount) / 100;
    totalDiscountPrice += discountedPrice * item.quantity;
  });

  // Return the calculated values
  return {
    totalItemPrice: totalItemPrice.toFixed(2),
    totalDiscountPrice: totalDiscountPrice.toFixed(2),
  };
}
const BasketProduct = () => {
  const [basketdata, setBasketData] = useState({ items: [] });
  const dispatch = useDispatch();
  const basket = useSelector((state) => state.basket);
  const { data: session } = useSession();
  let deliverycharge = 40;
  console.log(session);

  useEffect(() => {
    console.log(basket);
  }, [basket]);
  if (basket.items.length === 0) return <EmptyBasket />;
  return (
    <PageWrapper>
      <Grid
        container
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Grid
          item
          style={{
            width: "100%",
            border: "1px solid #3f0d0d7a",
            borderRadius: "10px",
            padding: "10px",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "10px",
            marginTop: "20px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* create an product map bellow from basketdata */}
          {basket.items.map((e, i) => (
            <Grid item key={i}>
              <ProductCard
                key={e?._id}
                quantity={e?.quantity}
                data={e?.product}
                style={{
                  border: "1px solid #3f0d0d7a",
                }}
                className={styles.productCard}
              />
            </Grid>
          ))}
        </Grid>
        <Grid
          item
          style={{
            border: "1px solid #3f0d0d7a",
            borderRadius: "10px",
            padding: "10px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            width: window.innerWidth > 900 ? "fit-content" : "100%",
            fontSize: "20px",
            display: "flex",
            gap: "5px",
            flexDirection: "column",
          }}
        >
          {/* calculate total price witout discount and show then discounted amount,then total price then gst then a button to confirm order and checkout */}
          <h1>
            Total Price:{" "}
            <b>{calculateTotalPriceAndDiscount(basket).totalItemPrice}</b>
          </h1>
          <h1>
            Total Discount:{" "}
            <b>{calculateTotalPriceAndDiscount(basket).totalDiscountPrice}</b>
          </h1>
          <h1>
            Delivery Charge: <b>{deliverycharge}</b>
          </h1>
          <h1>
            Total Amount:{" "}
            <b>
              {parseInt(
                calculateTotalPriceAndDiscount(basket).totalDiscountPrice
              ) + deliverycharge}
            </b>
          </h1>
          {/* create a button for confirm order and checkout */}
          <Button
            style={{
              backgroundColor: "blue",
              width: "100%",
              height: "45px",
              color: "white",
              borderRadius: "7px",
              fontSize: "19px",
            }}
          >
            Confirm
          </Button>
        </Grid>
      </Grid>
    </PageWrapper>
  );
};

export default BasketProduct;
