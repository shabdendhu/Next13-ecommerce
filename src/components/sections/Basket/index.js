"use client";
import React, { useEffect, useState } from "react";
import styles from "./Basket.module.scss";
import AddButton from "@/components/base/AddButton";
import ProductCard from "@/components/sections/ProductCard";
import PageWrapper from "../PageWrapper";
import { apiGet, apiPost } from "@/helpers/api";
import { useSession } from "next-auth/react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { loadUsersBasket } from "@/redux/basket/addUpdateBasket";
import EmptyBasket from "@/components/sections/EmptyBasket";
import { Route } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import calculateTotalPriceAndDiscount from "@/helpers/calculateTotalPriceAndDiscount";
const BasketProduct = ({ basket }) => {
  const [basketdata, setBasketData] = useState({ items: [] });
  const [checkoutItems, setCheckoutItems] = useState(
    basket?.items?.map((e) => e?.product?._id || [])
  );
  const [prices, setPrices] = useState({
    totalItemPrice: 0,
    totalDiscountPrice: 0,
  });
  const dispatch = useDispatch();
  const router = useRouter();

  const { data: session } = useSession();
  let deliverycharge = 40;
  const handleClickConfirmOrder = async () => {
    //minimum 1 product much be selected
    checkoutItems.length === 0
      ? alert("Please select atleast one product")
      : router.push(`/checkout?checkoutItems=${checkoutItems}`);
  };
  const handleSelectItem = (e, item) => {
    console.log(e.target.checked);
    if (!checkoutItems.includes(item.product._id)) {
      setCheckoutItems((e) => [...e, item?.product?._id]);
    } else {
      //remove from checkoutItems from item .product.id
      setCheckoutItems((e) => e.filter((x) => x != item.product._id));
    }
  };
  function getProductsByIds(products, productIds) {
    const selectedArray = products.filter((product) =>
      productIds.includes(product.product._id)
    );
    const data = selectedArray.map((e) => ({
      quantity: e.quantity,
      price: e.product.price,
      discount: e.product.discount,
      mrp: e.product.price / (1 - e.product.discount / 100),
    }));
    return data;
  }
  function calculatePrices(items) {
    let totalMrp = 0;
    let totalDiscountPrice = 0;

    items.forEach((item) => {
      totalMrp += item.quantity * item.mrp;
      totalDiscountPrice +=
        item.quantity * ((item.price * item.discount) / 100);
    });

    const finalPriceAfterDiscount = totalMrp - totalDiscountPrice;

    return {
      totalMrp,
      totalDiscountPrice,
      finalPriceAfterDiscount,
    };
  }
  useEffect(() => {
    const data = getProductsByIds(basket.items, checkoutItems);
    const priceData = calculatePrices(data);
    setPrices(priceData);
  }, [basket, checkoutItems]);
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
          {basket.items.map((item, i) => (
            <Grid item key={i}>
              <div
                style={{
                  borderTop: "1px solid gray",
                  borderLeft: "1px solid gray",
                  borderRight: "1px solid gray",
                  width: "fit-content",
                  borderRadius: "4px 4px 0px 0px",
                  marginLeft: "5px",
                }}
              >
                <Checkbox
                  checked={checkoutItems.includes(item?.product?._id)}
                  onChange={(e) => handleSelectItem(e, item)}
                />
              </div>
              <ProductCard
                key={item?._id}
                quantity={item?.quantity}
                data={item?.product}
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
            Total MRP: <b>{Math.round(prices.totalMrp)}</b>
          </h1>
          <h1>
            Total Discount: <b>{Math.round(prices.totalDiscountPrice)}</b>
          </h1>
          <h1>
            Final Price After Discount:{" "}
            <b>{Math.round(prices.finalPriceAfterDiscount)}</b>
          </h1>
          <h1>
            GST: <b>{Math.round(prices.finalPriceAfterDiscount * 0.18)}</b>
          </h1>
          <h1>
            Delivery Charge: <b>{deliverycharge}</b>
          </h1>
          <h1>
            Total Amount:{" "}
            <b>
              {/* total amount calculation */}
              <b>
                {Math.round(
                  Math.round(prices.finalPriceAfterDiscount) +
                    Math.round(prices.finalPriceAfterDiscount * 0.18) +
                    deliverycharge
                )}
              </b>
            </b>
          </h1>
          {/* create a button for confirm order and checkout */}
          <Button
            onClick={handleClickConfirmOrder}
            style={{
              backgroundColor: "blue",
              width: "100%",
              height: "45px",
              color: "white",
              borderRadius: "7px",
              fontSize: "19px",
            }}
          >
            Proceed To Checkout
          </Button>
        </Grid>
      </Grid>
    </PageWrapper>
  );
};

export default BasketProduct;
