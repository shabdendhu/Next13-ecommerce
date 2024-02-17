"use client";
import React, { useEffect, useState } from "react";
import styles from "./TrackOrder.module.scss";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { apiPost } from "@/helpers/api";
import { useSearchParams } from "next/navigation";

const OrderCard = ({ order }) => {
  console.log({ order });
  return (
    <Card style={{ minWidth: 275, marginBottom: 20 }}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Order #{order._id}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Status: {order.status}
        </Typography>
        <Typography variant="body2" component="p">
          Total Amount: ₹{order.totalAmount}
        </Typography>
        <Typography variant="body2" component="p">
          Shipping Address: {order?.shippingAddress?.addressLine1},{" "}
          {order.shippingAddress?.city}, {order.shippingAddress?.state},{" "}
          {order.shippingAddress?.postalCode}, {order.shippingAddress?.country}
        </Typography>
        <Typography variant="body2" component="p">
          Billing Address: {order.billingAddress?.addressLine1},{" "}
          {order.billingAddress?.city}, {order.billingAddress?.state},{" "}
          {order.billingAddress?.postalCode}, {order.billingAddress?.country}
        </Typography>
        <Typography variant="body2" component="p">
          Payment Method: {order.paymentMethod}
        </Typography>
        <Typography variant="body2" component="p">
          Payment Status: {order.paymentStatus}
        </Typography>
        <Typography variant="body2" component="p">
          Created At: {new Date(order.createdAt).toLocaleString()}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Products
        </Typography>
        {order.products &&
          order.products.map((product) => (
            <div
              key={product._id}
              style={{ display: "flex", alignItems: "center" }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{ maxWidth: 100, maxHeight: 100, marginRight: 10 }}
              />
              <div>
                <Typography variant="body2" component="p">
                  Name: {product.name}
                </Typography>
                <Typography variant="body2" component="p">
                  Quantity: {product.quantity}
                </Typography>
                <Typography variant="body2" component="p">
                  Price: ₹{product.price}
                </Typography>
              </div>
            </div>
          ))}
      </CardContent>
    </Card>
  );
};

const TrackOrder = () => {
  const query = useSearchParams();
  const [order, setOrder] = useState({});
  const getProductDetails = async () => {
    const res = await apiPost("/api/order/track-order", {
      orderId: query.get("orderId"),
    });
    setOrder(res.data);
    console.log(res);
  };
  useEffect(() => {
    getProductDetails();
  }, []);

  return (
    <div className={styles.component}>
      <h2>Track Order</h2>

      <OrderCard order={order} />
    </div>
  );
};

export default TrackOrder;
