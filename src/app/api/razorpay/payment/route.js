// api/payment.js

import Razorpay from "razorpay";
import { NextResponse } from "next/server";
import Product from "@/models/productModel";
import Order from "@/models/orderModel";
import { connect } from "@/dbConfig/connection";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

connect();

export async function POST(request) {
  try {
    // getorderbyid
    const { orderId } = await request.json();
    const order = await Order.findById(orderId);
    const productIds = order.products.map((e) => e.product);
    //getproductsby productIds
    const products = await Product.find(
      { _id: { $in: productIds } },
      { _id: -1, price: 1 }
    );
    const totalPrice = products.reduce((sum, item) => sum + item.price, 0);
    console.log(products.reduce((sum, item) => sum + item.price, 0));
    const payment_capture = 1;
    const amount = Math.round(totalPrice) * 100; // Amount in paise (100 paise = 1 rupee)
    const currency = "INR";

    const options = {
      amount,
      currency,
      payment_capture,
    };
    const response = await razorpay.orders.create(options);
    return NextResponse.json({ data: response, success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error happen", success: false },
      { status: 500 }
    );
  }
}
