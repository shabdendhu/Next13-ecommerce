"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { apiGet } from "@/helpers/api";
import ProductCard from "../ProductCard";
import ReviewManagement from "@/components/sections/ReviewManagement"; // Import the new component
import styles from "./MyOrder.module.scss";

const MyOrders = () => {
  const { data: session } = useSession();
  const [orders, setOrders] = useState([]);

  const getAllOrders = async () => {
    try {
      const orderRes = await apiGet("/api/order?user=" + session?.user?.id);
      setOrders(orderRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (session) getAllOrders();
  }, [session]);

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
