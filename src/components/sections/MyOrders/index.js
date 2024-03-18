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
import { Card, CardContent, CardHeader, Divider } from "@mui/material";
import dayjs from "dayjs";

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
        <Image height={400} width={400} src={"/empty-order.png"} alt="image" />
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
        <button
          onClick={() => handleClickTrackOrder(order)}
          className={styles.orderContainer}
          key={order._id}
        >
          <div data-status={order.status} className={styles.orderStatusBar} />
          <div className={styles.orderHeader} data-status={order.status}>
            <b>{dayjs(order?.createdAt).format("DD MMM YYYY")}</b>
            <p>({order.status})</p>
            <span>₹{order.totalAmount}</span>
          </div>
          <div className={styles.orders}>
            {order.products.map((item) => (
              <Card key={item._id}>
                <CardContent className={styles.orderedProducts}>
                  <Image
                    src={item.product.images[0]}
                    height={100}
                    width={100}
                    alt={item.product.name}
                  />
                  <div className={styles.productDetailsContainer}>
                    <div className={styles.productName}>
                      <b>{item.product.name}</b>
                    </div>
                    <div className={styles.quantity}>
                      Quantity: <b>{item.quantity}</b>
                    </div>
                    <div className={styles.brand}>
                      Brand: <b>{item.product.brand}</b>
                    </div>

                    {/* <p>OrderId: {order._id}</p>
                    <p>OrderDate: {formatDate(order.createdAt)}</p>
                    <p>PaymentMethod: {order.paymentMethod}</p>
                    <p>PaymentStatus: {order.paymentStatus}</p>
                    <p>OrderStatus: {order.status}</p>
                    <p>
                      ExpectedDelivery: {formatDate(order.expectedDeliveryDate)}
                    </p>
                    <p>DeliveryAddress: {order.deliveryAddress}</p>
                    <p>DeliveryCity: {order.deliveryCity}</p>
                    <p>DeliveryState: {order.deliveryState}</p> */}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {/* <div style={{ display: "flex" }}>
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
          )} */}
        </button>
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
