import { NextResponse } from "next/server";
import sha256 from "crypto-js/sha256";
import axios from "axios";
import Order from "@/models/orderModel";
export async function POST(req, { params }) {
  try {
    const { id } = params;
    const data = await req.formData();
    console.log(data);
    const status = data.get("code");
    const merchantId = data.get("merchantId");
    const transactionId = data.get("transactionId");
    const paidAmount = data.get("amount");
    const st =
      `/pg/v1/status/${merchantId}/${transactionId}` +
      process.env.NEXT_PUBLIC_SALT_KEY;
    // console.log(st)
    const dataSha256 = sha256(st);

    const checksum = dataSha256 + "###" + process.env.NEXT_PUBLIC_SALT_INDEX;
    console.log(checksum);

    const options = {
      method: "GET",
      url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${transactionId}`,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
        "X-MERCHANT-ID": `${merchantId}`,
      },
    };

    // CHECK PAYMENT STATUS
    const response = await axios.request(options);
    console.log("r===", response.data.code);

    if (response.data.code == "PAYMENT_SUCCESS") {
      const updatedOrder = await Order.findByIdAndUpdate(
        id,
        {
          paymentStatus: "completed",
          transactionId,
          paidAmount,
          status: "payment",
        },
        {
          new: true,
        }
      );
      console.log(updatedOrder, "updatedOrder");
      return NextResponse.redirect(
        process.env.NEXT_BASE_URL + `/trackorder?orderId=${id}`,
        {
          status: 301,
        }
      );
    } else
      return NextResponse.redirect(
        process.env.NEXT_BASE_URL + "/payment/failure",
        {
          // a 301 status is required to redirect from a POST to a GET route
          status: 301,
        }
      );
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      error: "Error",
      success: false,
    });
  }
}
