import React from "react";
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
import { useRouter, useSearchParams } from "next/navigation";
import sha256 from "crypto-js/sha256";
import { v4 as uuidv4 } from "uuid";

const OrderDetails = ({ order }) => {
  const router = useRouter();
  const query = useSearchParams();
  const {
    products = [],
    totalAmount,
    status,
    paymentStatus,
    createdAt,
    updatedAt,
    _id,
  } = order;

  const makePayment = async (e) => {
    e.preventDefault();
    const transactionid = "Tr-" + uuidv4().toString(36).slice(-6);

    const payload = {
      merchantId: process.env.NEXT_PUBLIC_MERCHANT_ID,
      merchantTransactionId: transactionid,
      merchantUserId: "MUID-" + uuidv4().toString(36).slice(-6),
      amount: totalAmount * 100,
      redirectUrl: `http://localhost:3000/api/phonepay/${_id}`,
      redirectMode: "POST",
      callbackUrl: `http://localhost:3000/api/phonepay/${_id}`,
      mobileNumber: "9999999999",
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    const dataPayload = JSON.stringify(payload);
    console.log(dataPayload);

    const dataBase64 = Buffer.from(dataPayload).toString("base64");
    console.log(dataBase64);

    const fullURL =
      dataBase64 + "/pg/v1/pay" + process.env.NEXT_PUBLIC_SALT_KEY;
    const dataSha256 = sha256(fullURL);

    const checksum = dataSha256 + "###" + process.env.NEXT_PUBLIC_SALT_INDEX;
    console.log("c====", checksum);

    const UAT_PAY_API_URL =
      "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";

    const response = await axios.post(
      UAT_PAY_API_URL,
      {
        request: dataBase64,
      },
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          "X-VERIFY": checksum,
        },
      }
    );

    const redirect = response.data.data.instrumentResponse.redirectInfo.url;
    router.push(redirect);
  };
  const handleClickTrackOrder = () => {
    router.push(`/track-order/${_id}`);
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
        {paymentStatus == "pending" ? (
          <Button
            onClick={makePayment}
            style={{
              backgroundColor: "blue",
              color: "white",
            }}
          >
            PAY NOW TO FINISH ORDER
          </Button>
        ) : (
          <Button onClick={handleClickTrackOrder}>Track Order</Button>
        )}
      </Paper>
    </Container>
  );
};

export default OrderDetails;
