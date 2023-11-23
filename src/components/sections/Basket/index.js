"use client";
import React, { useEffect, useState } from "react";
import styles from "./Basket.module.scss";
import AddButton from "@/components/base/AddButton";
import ProductCard from "@/components/sections/ProductCard";
import PageWrapper from "../PageWrapper";
import { apiGet } from "@/helpers/api";
import { useSession } from "next-auth/react";
import { Grid } from "@mui/material";
function calculateTotalPriceAndDiscount(basketData) {
  let totalItemPrice = 0;
  let totalDiscountPrice = 0;

  // Loop through each item in the basket
  basketData.items.forEach((item) => {
    // Calculate the total price for one item
    totalItemPrice += item.price * item.quantity;

    // Calculate the discounted price for one item
    const discountedPrice =
      item.price - (item.price * item.product.discount) / 100;
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
  const { data: session } = useSession();
  let deliverycharge = 40;
  console.log(session);
  const getBasketByUser = async () => {
    const basketRes = await apiGet("/api/basket?user=" + session?.user?.id);
    setBasketData(basketRes.data);
    console.log(basketRes);
  };
  useEffect(() => {
    if (session) getBasketByUser();
  }, [session]);
  return (
    <PageWrapper>
      <div className={styles.basketcontainer}>
        <div className={styles.basketheading}>
          MY CART ELEMENT
          <span className={styles.basketIcon}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/5738/5738076.png"
              alt=""
            />
          </span>
        </div>

        {/* <div className={styles.basketproduct}>
        <h2
          style={{
            display: "flex",
            justifyContent: "end",
            marginRight: "19px",
            fontSize: "28px",
            fontWeight: "400",
            cursor: "pointer",
          }}
        >
          x
        </h2>
        
        <div className={styles.basketitems}>
          <div className={styles.basketimg}>
            <img
              src="https://m.media-amazon.com/images/I/81W7r1x6GYL.jpg"
              alt=""
              srcset=""
            />
          </div>
          <div>
            <div>
              <h3> Mother&apos;s Recipe Mixed Pickle (Roi) Jar, 1000 g</h3>
              <h1>₹21</h1>
            </div>

            <div>
           <AddButton/>
            </div>

            <div>
              <h1>total price:₹233</h1>
            </div>
          </div>
        </div>
      </div> */}

        <div className={styles.cartItems}>
          <Grid container gap={1}>
            {basketdata.items.map((e, i) => (
              <Grid item key={i}>
                <ProductCard
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
        </div>
        <div className={styles.pricedetails}>
          <h1>Price Details</h1>
          <div className={styles.pricedistribution}>
            <ul>
              <li style={{ marginBottom: "10px" }}>Price(1 item)</li>
              <li style={{ marginBottom: "10px" }}>Discount Price</li>
              <li style={{ marginBottom: "10px" }}>Delivery Charges</li>
              <li
                style={{
                  marginBottom: "10px",
                  fontWeight: "500",
                  fontSize: "20px",
                }}
              >
                Total Amount{" "}
              </li>
            </ul>

            <ul>
              <li style={{ marginBottom: "10px" }}>
                {calculateTotalPriceAndDiscount(basketdata).totalItemPrice}
              </li>
              <li style={{ marginBottom: "10px", color: "blue" }}>
                {calculateTotalPriceAndDiscount(basketdata).totalDiscountPrice}
              </li>
              <li style={{ marginBottom: "10px" }}>{deliverycharge}</li>
              <li
                style={{
                  marginBottom: "10px",
                  fontWeight: "500",
                  fontSize: "20px",
                }}
              >
                {parseInt(
                  calculateTotalPriceAndDiscount(basketdata).totalItemPrice
                ) + deliverycharge}
              </li>
            </ul>
          </div>
        </div>
        <br />

        <button
          style={{
            backgroundColor: "blue",
            width: "20%",
            height: "45px",
            color: "white",
            borderRadius: "7px",
            fontSize: "19px",
          }}
        >
          place order
        </button>
      </div>
    </PageWrapper>
  );
};

export default BasketProduct;
