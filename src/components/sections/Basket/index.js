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
import Card from "@mui/material/Card";
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
  const [prices, setPrices] = useState([]);
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
    // console.log(e.target.checked);
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
    return selectedArray;
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
    // const priceData = calculatePrices(data);
    setPrices(data);
    // console.log(data);
  }, [basket, checkoutItems]);
  if (basket.items.length === 0) return <EmptyBasket />;
  return (
    <PageWrapper>
      <Card
        style={{
          display: "flex",
          width: "fit-content",
          gap: "10px",
          marginInline: "auto",
          padding: "10px",
          alignItems: "center",
          backgroundColor: "whitesmoke",
          marginTop: "10px",
          position: "sticky",
          top: "50px",
          zIndex: 999,
        }}
      >
        <div>
          Price: ₹
          {prices.reduce(
            (total, item) =>
              total +
              item.product.price *
                (1 - item.product.discount / 100) *
                item.quantity,
            0
          )}
        </div>
        <div>
          Discount: ₹
          {prices.reduce(
            (total, item) =>
              total +
              item.quantity * item.price * (item.product.discount / 100),
            0
          )}
        </div>
        <Button
          size="small"
          onClick={handleClickConfirmOrder}
          style={{
            backgroundColor: "blue",
            color: "white",
          }}
        >
          Checkout
        </Button>
      </Card>
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
        {/* <Grid
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
          <h1>
            Total MRP: <b>{prices.totalMrp.toFixed(2)}</b>
          </h1>
          <h1>
            Total Discount: <b>{prices.totalDiscountPrice.toFixed(2)}</b>
          </h1>
          <h1>
            Final Price After Discount:{" "}
            <b>{prices.finalPriceAfterDiscount.toFixed(2)}</b>
          </h1>
          <h1>
            GST: <b>{(prices.finalPriceAfterDiscount * 0.18).toFixed(2)}</b>
          </h1>
          <h1>
            Delivery Charge: <b>{deliverycharge}</b>
          </h1>
          <h1>
            Total Amount:{" "}
            <b>
              <b>
                {(
                  prices.finalPriceAfterDiscount +
                  prices.finalPriceAfterDiscount * 0.18 +
                  deliverycharge
                ).toFixed(2)}
              </b>
            </b>
          </h1>
          <Button
            size="small"
            onClick={handleClickConfirmOrder}
            style={{
              backgroundColor: "blue",
              color: "white",
            }}
          >
            Proceed To Checkout
          </Button>
        </Grid> */}
      </Grid>
    </PageWrapper>
  );
};

export default BasketProduct;
