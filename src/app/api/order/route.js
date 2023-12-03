// pages/api/orders/index.js
import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/connection";
import Order from "@/models/orderModel";

connect();

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const newOrder = new Order(reqBody);
    const savedOrder = await newOrder.save();
    return NextResponse.json({
      data: savedOrder,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get("user");
    // const products = await Product.findOne({}); // Populate the reviews
    const orders = await Order.find({ user: userId }).populate(
      "products.product"
    );
    return NextResponse.json({
      data: orders,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const { id } = params;

  const reqBody = await req.json();
  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, reqBody, {
      new: true,
    });
    if (!updatedOrder) {
      return NextResponse.json({ error: "Order not found", success: false });
    } else {
      return NextResponse.json({ data: updatedOrder, success: true });
    }
  } catch (error) {
    return NextResponse.json({
      error: "Error updating the order",
      success: false,
    });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    if (!id) {
      return NextResponse.json({
        message: "Please provide order id",
        success: false,
      });
    }
    const deletedOrder = await Order.findByIdAndRemove(id);
    if (deletedOrder) {
      return NextResponse.json({
        message: "Order deleted successfully",
        success: true,
      });
    } else {
      return NextResponse.json({
        message: "Failed to delete order",
        success: false,
      });
    }
  } catch (error) {
    return NextResponse.json({
      message: "Error deleting order",
      success: false,
    });
  }
}
