"use client";
import EmptyBasket from "@/components/sections/EmptyBasket";
import ProductCard from "@/components/sections/ProductCard";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PageWrapper from "../PageWrapper";
import styles from "./Basket.module.scss";
const BasketProduct = ({ basket }) => {
  const [checkoutItems, setCheckoutItems] = useState(
    basket?.items?.map((e) => e?.product?._id || [])
  );
  const [prices, setPrices] = useState([]);
  const router = useRouter();

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

    return selectedArray;
  }

  useEffect(() => {
    const data = getProductsByIds(basket.items, checkoutItems);
    setPrices(data);
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
            <Grid item key={item?._id}>
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
      </Grid>
    </PageWrapper>
  );
};

export default BasketProduct;
