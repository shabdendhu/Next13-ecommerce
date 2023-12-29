// OrderDetails.js
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
} from "@mui/material";

const OrderDetails = ({ order }) => {
  const {
    products = [],
    totalAmount,
    status,
    paymentStatus,
    createdAt,
    updatedAt,
  } = order;
  useEffect(() => {
    console.log(order);
  }, [order]);

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
      </Paper>
    </Container>
  );
};

export default OrderDetails;
