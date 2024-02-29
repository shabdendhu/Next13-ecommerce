import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/connection";
import Order from "@/models/orderModel";

connect();

export async function PUT(req) {
  try {
    const reqBody = await req.json();
    const { newDeliveryDate, id } = reqBody;
    // Step 1: Find the order by its ID
    const order = await Order.findById(id);

    // Step 2: Check if the order exists
    if (!order) {
      return NextResponse.json({ error: "Order not found", success: false });
    }

    // Step 3: Update the expected delivery date

    order.expectedDeliveryDate = newDeliveryDate;

    // Step 4: Save the updated order to the database
    await order.save();

    return NextResponse.json({ data: order, success: true });
  } catch (error) {
    return NextResponse.json({
      error: "Error updating the delivery date",
      success: false,
    });
  }
}
