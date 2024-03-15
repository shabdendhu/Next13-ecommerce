import React from "react";
import styles from "./TrackOrder.module.scss";
import { apiPost } from "@/helpers/api";
import PageWrapper from "@/components/sections/PageWrapper";
import dayjs from "dayjs";
import Image from "next/image";
import {
  Typography,
  Card,
  CardContent,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import Order from "@/models/orderModel";
import Product from "@/models/productModel";
import { connect } from "@/dbConfig/connection";

const steps = ["ordered", "payment", "shipped", "delivered"];

export default async function TrackOrder({ params, query }) {
  // Destructure orderId from query object (assuming searchParams was renamed)
  const { orderId } = query;

  //connection to database
  await connect();
  await Product();

  let order;
  let error;

  try {
    order = await Order.findById(orderId).populate("products.product").lean();
  } catch (err) {
    error = err;
  }

  if (!order) {
    return <PageWrapper>Order Not Found</PageWrapper>;
  }

  console.log(order, "kkkkk"); // For debugging purposes (remove in production)

  return (
    <PageWrapper>
      <div className={styles.component}>
        <Card className={styles.paymentCardContainer}>
          <Stepper
            activeStep={steps.indexOf(order?.status) + 1}
            alternativeLabel
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel style={{ textTransform: "capitalize" }}>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Card>
        <Card className={styles.paymentCardContainer}>
          <div className={styles.header}>Order Details</div>
          <CardContent>
            <p>CreatedAt : {dayjs(order?.createdAt).format("DD MMM YYYY")}</p>
            <p>Order Time : {dayjs(order?.createdAt).format("h:mm A")}</p>
            {/* <p>Order id : {toString(order?._id)}</p> */}
            <p>Order Status : {order?.status}</p>
          </CardContent>
        </Card>
        <Card className={styles.paymentCardContainer}>
          <div className={styles.header}>Payment Details</div>
          <CardContent>
            <p>Paid At : {order?.paymentMethod}</p>
            <p>Payment Method : {order?.paymentMethod}</p>
            <p>Payment Status: {order?.paymentStatus}</p>
            <p>Total Amount: ₹{order?.totalAmount}</p>
          </CardContent>
        </Card>
        <Card className={styles.paymentCardContainer}>
          <div className={styles.header}>Products</div>
          <CardContent>
            {order?.products.map((e) => (
              <div className={styles.productCard} key={e._id}>
                <div>
                  <Image
                    width={100}
                    height={100}
                    style={{ aspectRatio: 1, borderRadius: "5px" }}
                    alt={e?.product?.name}
                    src={e?.product?.images[0]}
                  />
                </div>
                <div>
                  <div style={{ fontSize: "17px" }}>{e?.product?.name}</div>
                  <div style={{ fontSize: "13px" }}>{e?.product?.price}</div>
                  <div style={{ fontSize: "13px" }}>{e?.product?.brand}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
            width: "100%",
          }}
        >
          <Button
            variant="contained"
            style={{ backgroundColor: "blue", color: "white" }}
          >
            Cencle Order
          </Button>
        </div>
      </div>
    </PageWrapper>
  );
}
