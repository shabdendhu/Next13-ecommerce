import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import crypto from "crypto";
import Payment from "@/models/orderModel";
import { connect } from "@/dbConfig/connection";

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

connect();

export async function POST(req) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      await req.json();
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    console.log(
      "id==",
      body,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });

      //  return NextResponse.redirect(new URL('/paymentsuccess', req.url));
    } else {
      return NextResponse.json(
        {
          message: "fail",
        },
        {
          success: false,
        }
      );
    }

    return NextResponse.json(
      {
        message: "success",
      },
      {
        success: true,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error,
      },
      {
        success: false,
      }
    );
  }
}
