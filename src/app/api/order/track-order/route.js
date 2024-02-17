// pages/api/orders/trackOrder.js
import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/connection";
import Order from "@/models/orderModel";

connect();

export async function POST(req, res) {
  try {
    const reqBody = await req.json();
    // Step 1: Retrieve the order by ID
    const order = await Order.findById(reqBody.orderId);

    // Step 2: Check if the order exists

    // Step 3: Construct the response object
    const trackOrderData = {
      _id: order._id,
      status: order.status,
      totalAmount: order.totalAmount,
      shippingAddress: order.shippingAddress,
      billingAddress: order.billingAddress,
      paymentMethod: order.paymentMethod,
      paymentStatus: order.paymentStatus,
      createdAt: order.createdAt,
      products: order.products.map((product) => ({
        _id: product.product._id,
        quantity: product.quantity,
        price: product.price,
      })),
    };

    return NextResponse.json({
      data: trackOrderData,
      order,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error(new Error("Internal Server Error"), {
      status: 500,
    });
  }
}
