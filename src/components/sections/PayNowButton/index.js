"use client";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import cx from "classnames";
import axios from "axios";
import sha256 from "crypto-js/sha256";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { useSession } from "next-auth/react";

const PayNowButton = ({ order, text, className }) => {
  const router = useRouter();
  const path = usePathname();
  const { data: session } = useSession();
  const { totalAmount, _id } = order;

  const makePayment = async (e) => {
    e.preventDefault();
    const transactionid = "Tr-" + uuidv4().toString(36).slice(-6);

    const payload = {
      merchantId: process.env.NEXT_PUBLIC_MERCHANT_ID,
      merchantTransactionId: transactionid,
      merchantUserId: "MUID-" + uuidv4().toString(36).slice(-6),
      amount: totalAmount * 100,
      redirectUrl: `${window.location.origin}/api/phonepay/${_id}`,
      redirectMode: "POST",
      callbackUrl: `${window.location.origin}/api/phonepay/${_id}`,
      mobileNumber: "9999999999",
      accessToken: session?.accessToken || "",
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    const dataPayload = JSON.stringify(payload);
    // console.log(dataPayload);

    const dataBase64 = Buffer.from(dataPayload).toString("base64");
    // console.log(dataBase64);

    const fullURL =
      dataBase64 + "/pg/v1/pay" + process.env.NEXT_PUBLIC_SALT_KEY;
    const dataSha256 = sha256(fullURL);

    const checksum = dataSha256 + "###" + process.env.NEXT_PUBLIC_SALT_INDEX;
    // console.log("c====", checksum);

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
  return (
    <Button
      className={cx(className)}
      onClick={makePayment}
      style={{
        backgroundColor: "blue",
        color: "white",
      }}
    >
      {text}
    </Button>
  );
};

export default PayNowButton;
