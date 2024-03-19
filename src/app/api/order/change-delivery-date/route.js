import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/connection";
import Order from "@/models/orderModel";

connect();

export async function PUT(req) {
  try {
    const reqBody = await req.json();
    const { newDeliveryDate, newStatus, id } = reqBody;
    // Step 1: Find the order by its ID
    const order = await Order.findById(id);

    // Step 2: Check if the order exists
    if (!order) {
      return NextResponse.json({ error: "Order not found", success: false });
    }

    // Step 3: Update the order based on the provided parameters
    if (newDeliveryDate) {
      order.expectedDeliveryDate = newDeliveryDate;
    }

    if (newStatus) {
      order.status = newStatus;
    }

    // Step 4: Update the order in the database
    await Order.findByIdAndUpdate(id, order);

    return NextResponse.json({ data: order, success: true });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Error updating the order",
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
