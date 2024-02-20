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
