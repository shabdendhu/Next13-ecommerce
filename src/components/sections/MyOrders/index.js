"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { apiGet } from "@/helpers/api";
import ProductCard from "../ProductCard";
import Button from "@mui/material/Button";
import ReviewManagement from "@/components/sections/ReviewManagement"; // Import the new component
import styles from "./MyOrder.module.scss";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSnackbar } from "@/hooks/useSnakBar";

const MyOrders = () => {
  const { data: session } = useSession();
  const [orders, setOrders] = useState([]);
  const { openSnackbar } = useSnackbar();
  const route = useRouter();
  const getAllOrders = async () => {
    try {
      const orderRes = await apiGet(
        "/api/order?user=" + session?.user?.id,
        {},
        openSnackbar
      );
      setOrders(orderRes.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleClickTrackOrder = (o) => {
    // console.log("Track Order clicked");
    route.push(`/trackorder?orderId=${o._id}`);
  };
  useEffect(() => {
    if (session) getAllOrders();
  }, [session]);
  if (!orders.length)
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          flexDirection: "column",
        }}
      >
        <Image height={400} width={400} src={"/empty-order.png"} />
        <h2>No Orders Found</h2>
        <p>You have not placed any orders yet.</p>
        <p>Please check back later.</p>
        <p>Or, you can browse our products.</p>
        <Button variant="contained" color="primary" href="/products">
          Browse Products
        </Button>
      </div>
    );
  return (
    <div className={styles.orderComponent}>
      {orders?.map((order) => (
        <div className={styles.orderContainer} key={order._id}>
          {/* <div className={styles.orderStatus}>OrderStatus: {order.status}</div> */}

          <div className={styles.orders}>
            {order.products.map((item) => (
              <ProductCard
                className={styles.product}
                data={item.product}
                key={item.product._id}
                quantity={item.quantity}
                disableAddButton={true}
              />
            ))}
          </div>
          <div style={{ display: "flex" }}>
            <b>PaymentStatus: </b>
            <p style={{ textTransform: "uppercase" }}> {order.paymentStatus}</p>
          </div>
          <div style={{ display: "flex" }}>
            <b>OrderStatus: </b>
            <p style={{ textTransform: "uppercase" }}> {order.status}</p>
          </div>
          <div style={{ display: "flex" }}>
            <b>Expected Delivery: </b>
            <p style={{ textTransform: "uppercase" }}>
              {formatDate(order.expectedDeliveryDate)}
            </p>
          </div>
          <Button
            size="small"
            style={{ backgroundColor: "blue", color: "white" }}
            onClick={() => handleClickTrackOrder(order)}
          >
            Track Order
          </Button>
          {order.status == "Delivered" && (
            <ReviewManagement orderId={order._id} />
          )}
        </div>
      ))}
    </div>
  );
};

export default MyOrders;

function formatDate(date) {
  const d = new Date(date);
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return d.toLocaleDateString("en-US", options);
}
