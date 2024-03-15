// pages/api/banners/update.js
import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/connection";
import Order from "@/models/orderModel";

connect();

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const banner = await Order.findById(id);

    if (!banner) {
      return NextResponse.json({
        message: "Order not found",
        success: false,
      });
    }

    return NextResponse.json({
      data: banner,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Error getting banner by ID",
      success: false,
    });
  }
}

export async function PUT(req, { params }) {
  const { id } = params;
  try {
    const canceledOrder = await Order.findByIdAndUpdate(
      id,
      { status: "canceled" },
      { new: true }
    );
    if (!canceledOrder) {
      return NextResponse.json({ error: "Order not found", success: false });
    } else {
      return NextResponse.json({ data: canceledOrder, success: true });
    }
  } catch (error) {
    return NextResponse.json({
      error: "Error canceling the order",
      success: false,
    });
  }
}
