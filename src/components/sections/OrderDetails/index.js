"use client";
import React, { useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  Grid,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
} from "@mui/material";
import axios from "axios";

const OrderDetails = ({ order }) => {
  const {
    products = [],
    totalAmount,
    status,
    paymentStatus,
    createdAt,
    updatedAt,
    _id,
  } = order;
  useEffect(() => {
    console.log(order);
  }, [order]);

  const makePayment = async ({ productId = null }) => {
    // "use server";
    const key = process.env.RAZORPAY_KEY_ID;
    console.log(key);
    // Make API call to the serverless API
    const data = await axios.post("/api/razorpay/payment", {
      orderId: _id,
    });
    const rezOrder = data.data.data;
    // const { order } = await data.json();
    console.log(data.data.data, "........................");
    const options = {
      key: key,
      name: "kishan",
      currency: rezOrder.currency,
      amount: rezOrder.amount,
      order_id: rezOrder.id,
      description: "Understanding RazorPay Integration",
      // image: logoBase64,
      handler: async function (response) {
        // if (response.length==0) return <Loading/>;
        console.log(response);
        const data = await axios.post("/api/razorpay/paymentverify", {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        });

        const res = await data.json();

        console.log("response verify==", res);

        if (res?.message == "success") {
          console.log("redirected.......");
          router.push(
            "/paymentsuccess?paymentid=" + response.razorpay_payment_id
          );
        }

        // Validate payment at server - using webhooks is a better idea.
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
      },
      prefill: {
        name: "mmantratech",
        email: "mmantratech@gmail.com",
        contact: "9354536067",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    paymentObject.on("payment.failed", function (response) {
      console.log(response, "ooooooooooooooooooooooo");
      alert("Payment failed. Please try again. Contact support for help");
    });
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h5" gutterBottom>
          Order Details
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Total Amount: ${totalAmount}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Status: {status}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Payment Status: {paymentStatus}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Created At: {createdAt}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Updated At: {updatedAt}
        </Typography>

        <Typography variant="h6" style={{ marginTop: "20px" }}>
          Products
        </Typography>
        <List>
          {products.map((item) => (
            <ListItem key={item._id}>
              <ListItemAvatar>
                <Avatar alt={item.product.name} src={item.product.images[0]} />
              </ListItemAvatar>
              <ListItemText
                primary={item.product.name}
                secondary={`Quantity: ${item.quantity}, Price: $${item.price}`}
              />
            </ListItem>
          ))}
        </List>
        <Button
          onClick={makePayment}
          style={{
            backgroundColor: "blue",
            color: "white",
          }}
        >
          PAY NOW TO FINISH ORDER
        </Button>
      </Paper>
    </Container>
  );
};

export default OrderDetails;
